from rest_framework import serializers
from ...models import Adoption
from ..serializers import Users_model_serializer, Pets_model_serializer

class Adoption_model_serializer(serializers.ModelSerializer):
    user_id = Users_model_serializer(read_only=True)
    pet_id = Pets_model_serializer(read_only=True)

    class Meta:
        model = Adoption
        fields = ['id', 'user', 'pet', 'date_of_adoption']