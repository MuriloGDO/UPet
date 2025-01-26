from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Institution
from ...classes import Institution
from django.core.exceptions import ObjectDoesNotExist
from ..serializers import Institution_serializers

class Institution_search_by_filters(APIView):
    def get(self, request):
        filters = {
            'cnpj': request.query_params.get('cnpj'),
            'name': request.query_params.get('name'),
            'email': request.query_params.get('email'),
            'address': request.query_params.get('address'),
        }

        filters = {key: value for key, value in filters.items() if value}

        if not filters:
            return Response({"error": "Nenhum filtro foi fornecido para a pesquisa."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            results = Institution.search(**filters)

            if not results.exists():
                raise ObjectDoesNotExist

            serializer = Institution_serializers(results, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({"error": "Não foi encontrada nenhuma instituição"}, status=status.HTTP_404_NOT_FOUND)
