from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Users
from ...classes import User
from django.core.exceptions import ObjectDoesNotExist

class Users_information(APIView):
    def post(self, request):
        user_id = request.data.get('id')
        if not user_id:
            return Response({"error": "O ID do usuário é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = Users.find_by_id(user_id)
            return Response(user.to_json(), status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({"error": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)



