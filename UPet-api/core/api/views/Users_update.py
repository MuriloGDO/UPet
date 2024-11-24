from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Users, Login
from ..serializers import Users_model_serializer, Login_model_serializer
from ...services import User_update_service
from django.contrib.auth.hashers import make_password

class Users_update(APIView):
    def patch(self, request):
        user_id = request.data.get('id')
        
        if not user_id:
            return Response({"error": "O ID do usuário é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            return Response({"error": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data

        try:
            updated_user_data = User_update_service.update_user(user, data)
            return Response(updated_user_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
