import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Chat_room, Message
from core.models import Users
from asgiref.sync import sync_to_async
from django.shortcuts import get_object_or_404
from channels.db import database_sync_to_async
import logging

logger = logging.getLogger(__name__)

class Chat_consumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        room = await sync_to_async(Chat_room.objects.get_or_create)(name=self.room_name)

        # Adicionando o cliente a sala
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        try:
            # Remove o cliente da sala
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
            logger.info(f"Cliente desconectado da sala {self.room_name}")
        except Exception as e:
            logger.error(f"Erro ao remover cliente da sala {self.room_name}: {str(e)}")
    
    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data['message']
        user_id = data['user_id']

        # Salvando a mensagem no banco de dados
        room = await sync_to_async(get_object_or_404)(Chat_room, name=self.room_name)
        user_instance = await database_sync_to_async(Users.objects.filter(id=user_id).first)()
        await sync_to_async(Message.objects.create)(room=room, user=user_instance, content=message)

        # Enviar a mensagem para todos os clientes conectados na sala
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'user': user_instance.name,
            }
        )
    
    async def chat_message(self, event):
        # Enviar a mensagem para o WebSocket do cliente
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'user': event['user'],
        }))