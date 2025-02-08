from rest_framework import serializers
from ..models import Chat_room
from core.api.serializers import Users_model_serializer, Institution_model_serializer, Pets_model_serializer

class Chat_room_serializer(serializers.ModelSerializer):
    user = Users_model_serializer()  # Retorna o objeto completo do usuário
    pet = Pets_model_serializer()  # Retorna o objeto completo do pet
    institution = Institution_model_serializer()  # Retorna o objeto completo da instituição

    class Meta:
        model = Chat_room
        fields = '__all__'