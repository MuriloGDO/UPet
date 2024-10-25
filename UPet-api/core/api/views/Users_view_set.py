from rest_framework import viewsets
from ...models import Users
from ..serializers import Users_model_serializer

class Users_view_set(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = Users_model_serializer