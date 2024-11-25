from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Institution
from ..serializers import Institution_model_serializer
from ...services import Institution_update_service

class Institution_update(APIView):
    def patch(self, request):
        institution_id = request.data.get('id')
        
        if not institution_id:
            return Response({"error": "O ID da instituição é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            institution = Institution.objects.get(id=institution_id)
        except Institution.DoesNotExist:
            return Response({"error": "Instituição não encontrada."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data

        try:
            updated_institution_data = Institution_update_service.update_institution(institution, data)
            return Response(updated_institution_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
