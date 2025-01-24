from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Institution
from ...classes.Institutions import Institutions
from django.core.exceptions import ObjectDoesNotExist

class Institution_information(APIView):
    def post(self, request):
        institution_id = request.data.get('id')
        if not institution_id:
            return Response({"error": "O ID da Instituição é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            institution = Institution.find_by_id(institution_id)
            return Response(institution.to_json(), status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({"error": "Instituição não encontrada."}, status=status.HTTP_404_NOT_FOUND)
