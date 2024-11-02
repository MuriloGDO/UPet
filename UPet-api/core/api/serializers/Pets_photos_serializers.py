from rest_framework import serializers
from ...models import Pets_photos

class Pets_photos_model_serializer(serializers.ModelSerializer):
    class Meta:
        model = Pets_photos
        fields = ['id', 'photo', 'uploaded_at']