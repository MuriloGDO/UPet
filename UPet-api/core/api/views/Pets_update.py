from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Pets, Institution
from ..serializers import Pets_model_serializer
from ...services import Pets_update_service

class Pets_update(APIView):
    def patch(self, request):
        pet_id = request.data.get('pet_id')
        
        if not pet_id:
            return Response({"error": "O ID do pet é obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            pet = Pets.objects.get(id=pet_id)
        except Pets.DoesNotExist:
            return Response({"error": "Pet não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data

        try:
            updated_pet_data = Pets_update_service.update_pet(pet, data)
            return Response(updated_pet_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
