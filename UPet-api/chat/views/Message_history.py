from rest_framework.generics import ListAPIView
from ..models import Message, Chat_room
from ..serializers import Message_serializer

class Message_history(ListAPIView):
    serializer_class = Message_serializer

    def get_queryset(self):
        room_name = self.kwargs['room_name']
        room_id = Chat_room.objects.filter(name=room_name).first()
        return Message.objects.filter(room_id=room_id).order_by('-timestamp')