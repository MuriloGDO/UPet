from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...services import Pets_delete_service
from ...exceptions import Rollback_exception

class Pets_delete(APIView):
    def post(self, request):
        pet_data = request.data
        pet_id = pet_data.get('id')
        
        if not pet_id:
            return Response(
                {"error": "O ID do pet é obrigatório."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            Pets_delete_service.delete_pet(pet_id)
            return Response(
                {"message": "Pet deletado com sucesso."},
                status=status.HTTP_200_OK
            )
        except Rollback_exception as e:
            return Response(
                {"error": "Falha ao deletar o pet.", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": "Ocorreu um erro inesperado.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
