from rest_framework import viewsets
from ...models import Login
from ..serializers import Login_model_serializer

class Login_view_set(viewsets.ModelViewSet):
    queryset = Login.objects.all()
    serializer_class = Login_model_serializer