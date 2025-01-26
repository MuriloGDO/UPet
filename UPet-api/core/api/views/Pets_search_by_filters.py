from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Pets
from ...classes.Pets import Pets
from django.core.exceptions import ObjectDoesNotExist

class Institution_search_by_filters(APIView):
    def post(self, request):
        filters = request.data
        search_params = {
            key: value for key, value in filters.items() if key in ['id', 'name', 'date_of_birth', 'species']
        }

        if not search_params:
            return Response({"error": "Nenhum filtro foi fornecido para a pesquisa."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            pet_search = Pets.search(**filters)

            results = [Pets(pet.id, pet.name, pet.date_of_birth, pet.species, pet.description, pet.status).to_json() for pet in pet_search]
            return Response(results, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({"error": "Não foi encontrada nenhum pet"}, status=status.HTTP_404_NOT_FOUND)
