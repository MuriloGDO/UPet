from rest_framework import serializers
from ..models import Message

class Message_serializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField() 

    class Meta:
        model = Message
        fields = ['id', 'user', 'pet', 'content', 'timestamp', 'time']

    def get_time(self, obj):
        return obj.timestamp.strftime("%H:%M") 