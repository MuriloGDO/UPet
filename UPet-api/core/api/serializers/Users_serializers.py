from rest_framework import serializers
from ...models import Users

class Users_model_serializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'name', 'telephone', 'email', 'date_of_birth', 'address', 'cpf', 'photo', 'description', 'cluster', 'password')