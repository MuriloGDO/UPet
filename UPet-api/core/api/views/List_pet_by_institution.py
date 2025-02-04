from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Register_pets, Pets  # Certifique-se de importar o modelo correto
from ..serializers.Pets_serializers import Pets_model_serializer  # Você precisa ter um serializer para Pets

class List_pets_by_institution(APIView):
    def get(self, request):
        institution_id = request.GET.get('id')

        if not institution_id:
            return Response(
                {"error": "O ID da instituição é obrigatório."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Obtendo os IDs dos pets vinculados à instituição
            pet_ids = Register_pets.objects.filter(institution=institution_id).values_list("pet_id", flat=True)

            # Buscando os pets completos
            filtered_pets = Pets.objects.filter(id__in=pet_ids)

            # Serializando os dados
            serializer = Pets_model_serializer(filtered_pets, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
