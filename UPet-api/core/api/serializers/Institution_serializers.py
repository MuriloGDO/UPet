from rest_framework import serializers
from ...models import Institution

class Institution_model_serializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['id', 'cnpj', 'name', 'telephone', 'address', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }