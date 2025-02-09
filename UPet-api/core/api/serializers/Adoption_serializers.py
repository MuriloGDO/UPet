from rest_framework import serializers
from ...models import Adoption
from ..serializers import Users_model_serializer, Pets_model_serializer, Institution_model_serializer

class Adoption_model_serializer(serializers.ModelSerializer):
    class Meta:
        model = Adoption
        fields = ['id', 'user', 'pet', 'institution', 'date_of_adoption']