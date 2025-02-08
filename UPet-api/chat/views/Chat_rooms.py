from rest_framework.generics import ListAPIView
from ..models import Chat_room
from ..serializers import Chat_room_serializer
from rest_framework.filters import SearchFilter
from rest_framework.response import Response

class Chat_rooms(ListAPIView):
    serializer_class = Chat_room_serializer

    def get_queryset(self):
        """
        Filtra os chats por usuário ou instituição com base nos parâmetros da URL.
        """
        queryset = Chat_room.objects.select_related("user", "pet", "institution").all()
        user_id = self.request.query_params.get("user_id")
        pet_id = self.request.query_params.get("pet_id")
        institution_id = self.request.query_params.get("institution_id")

        if user_id != None:
            user_id = int(user_id)  # Converte para inteiro
            queryset = queryset.filter(user_id=user_id)
            return queryset

        if pet_id != None:
            pet_id = int(pet_id)  # Converte para inteiro
            queryset = queryset.filter(pet_id=pet_id)
            return queryset
        
        if institution_id !=None:
            institution_id = int(institution_id)
            queryset = queryset.filter(institution_id=institution_id)
            return queryset

        return Chat_room.objects.none()