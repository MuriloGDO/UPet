from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from ...models import Users, Pets

class Users_search_pets(APIView):
    def post(self, request):
        user_id = request.data.get('id')

        try:
            # Obtém o usuário pelo ID
            user = Users.objects.get(id=user_id)

            # Obtém os clusters do usuário
            user_clusters = user.cluster.all()  # Lista de clusters associados ao usuário

            # Obtém todos os pets no banco de dados
            all_pets = Pets.objects.all()

            # Filtra os pets que possuem clusters iguais aos do usuário
            matching_pets = [
                pet for pet in all_pets if pet.cluster.filter(id__in=user_clusters.values_list('id', flat=True)).exists()
            ]

            # Retorna os pets encontrados
            pets_data = [
                {
                    "id": pet.id,
                    "name": pet.name,
                    "date_of_birth": pet.date_of_birth,
                    "species": pet.species,
                    "description": pet.description,
                    "status": pet.status,
                    "clusters": list(pet.cluster.values('id', 'name')),  # Retorna os clusters do pet
                }
                for pet in matching_pets
            ]

            return Response({"matching_pets": pets_data}, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response(
                {"error": "Usuário não encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
