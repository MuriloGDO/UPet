from rest_framework import serializers
from ...models import Clusters

class Clusters_model_serializer(serializers.ModelSerializer):
    class Meta:
        model = Clusters
        fields = ('id', 'nome', 'descricao')

