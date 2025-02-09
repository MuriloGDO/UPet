from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...services.Adoption_service import Adoption_service

class Adopted_pets(APIView):
    def post(self, request):
        """Recebe um JSON com user_id ou institution_id e retorna os pets adotados."""
        request_data = request.data
        user_id = request_data.get("user_id")
        institution_id = request_data.get("institution_id")

        if user_id:
            result = Adoption_service.get_adopted_pets_by_user(user_id)
        elif institution_id:
            result = Adoption_service.get_adopted_pets_by_institution(institution_id)
        else:
            return Response({"error": "Informe 'user_id' ou 'institution_id' no JSON."}, status=status.HTTP_400_BAD_REQUEST)

        return Response(result, status=status.HTTP_200_OK)
