from rest_framework import serializers
from ...models import Register_pets

class Register_pets_serializer(serializers.ModelSerializer):
    class Meta:
        model = Register_pets
        fields = ['id', 'institution', 'pet', 'date_of_registration']
