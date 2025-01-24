from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Institution
from ...classes.Institutions import Institutions
from django.core.exceptions import ObjectDoesNotExist

class Institution_search_by_filters(APIView):
    def post(self, request):
        filters = request.data
        search_params = {
            key: value for key, value in filters.items() if key in ['cnpj', 'name', 'email', 'address']
        }

        if not search_params:
            return Response({"error": "Nenhum filtro foi fornecido para a pesquisa."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            institutions = Institution.search(**filters)

            results = [Institutions(institution.id, institution.cnpj, institution.name, institution.telephone, institution.address, institution.email, institution.password).to_json() for institution in institutions]
            return Response(results, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({"error": "Não foi encontrada nenhuma instatuição"}, status=status.HTTP_404_NOT_FOUND)
