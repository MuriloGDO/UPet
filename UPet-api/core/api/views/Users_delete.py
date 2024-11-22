from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...services import User_delete_service
from ...exceptions import Rollback_exception

class Users_delete(APIView):
    def post(self, request):
        user_data = request.data
        user_id = user_data.get('id')
        if not user_id:
            return Response(
                {"error": "O ID do usuário é obrigatório."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            User_delete_service.delete_user_and_login(user_id)
            
            return Response(
                {"message": "Usuário e login deletados com sucesso."},
                status=status.HTTP_200_OK
            )

        except Rollback_exception as e:
            return Response(
                {"error": "Falha ao deletar usuário ou login.", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        except Exception as e:
            return Response(
                {"error": "Ocorreu um erro inesperado.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
