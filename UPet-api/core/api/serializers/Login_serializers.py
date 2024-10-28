from rest_framework import serializers
from ...models import Login

class Login_model_serializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        # fields = ('id', 'user', 'institution', 'email', 'password')
        fields = ('id', 'user', 'email', 'password')