from rest_framework import serializers
from ...models import Pets
from ..serializers import Pets_photos_model_serializer

class Pets_model_serializer(serializers.ModelSerializer):
    photos = Pets_photos_model_serializer(many=True, read_only=True)

    class Meta:
        model = Pets
        fields = ['id', 'name', 'date_of_birth', 'species', 'description', 'status', 'cluster', 'photos']