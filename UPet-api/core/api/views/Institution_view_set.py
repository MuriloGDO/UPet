from rest_framework.viewsets import ModelViewSet
from ...models import Institution
from ..serializers import Institution_model_serializer

class Intitution_view_set(ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = Institution_model_serializer
