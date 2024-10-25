from rest_framework import viewsets
from ...models import Clusters
from ..serializers import Clusters_model_serializer

class Clusters_view_set(viewsets.ModelViewSet):
    queryset = Clusters.objects.all()
    serializer_class = Clusters_model_serializer