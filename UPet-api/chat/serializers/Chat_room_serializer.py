from rest_framework import serializers
from ..models import Chat_room

class Chat_room_serializer(serializers.ModelSerializer):
    class Meta:
        model = Chat_room
        fields = '__all__'