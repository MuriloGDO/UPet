from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Pets, Institution
from ..serializers import Pets_model_serializer
from ...services import Pets_update_service

class Pets_update(APIView):
    def patch(self, request):
        pet_id = request.data.get('pet_id')
        institution_id = request.data.get('institution_id')
        
        if not pet_id or not institution_id:
            return Response({"error": "Os IDs do pet e da instituição são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            institution = Institution.objects.get(id=institution_id)
        except Institution.DoesNotExist:
            return Response({"error": "Instituição não encontrada."}, status=status.HTTP_404_NOT_FOUND)

        try:
            pet = Pets.objects.get(id=pet_id, institution=institution)
        except Pets.DoesNotExist:
            return Response({"error": "Pet não encontrado ou não pertence à instituição."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data

        try:
            updated_pet_data = Pets_update_service.update_pet(pet, data)
            return Response(updated_pet_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
