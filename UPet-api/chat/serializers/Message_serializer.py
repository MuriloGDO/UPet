from rest_framework import serializers
from ..models import Message

class Message_serializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.name')

    class Meta:
        model = Message
        fields = ['id', 'user', 'content', 'timestamp']