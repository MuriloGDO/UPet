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
            total_user_clusters = user_clusters.count()  # Número total de clusters do usuário

            if total_user_clusters == 0:
                return Response(
                    {"error": "Usuário não tem clusters associados."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Obtém todos os pets no banco de dados
            all_pets = Pets.objects.all()

            # Filtra os pets que possuem clusters iguais aos do usuário e calcula a porcentagem
            pets_with_percentage = []

            for pet in all_pets:
                # Calcula a quantidade de clusters do pet que são iguais aos do usuário
                common_clusters = pet.cluster.filter(id__in=user_clusters.values_list('id', flat=True))
                common_clusters_count = common_clusters.count()

                # Calcula a porcentagem de clusters compartilhados
                percentage = (common_clusters_count / total_user_clusters) * 100

                # Adiciona o pet com a porcentagem calculada
                pets_with_percentage.append({
                    "pet": pet,
                    "percentage": percentage
                })

            # Ordena os pets pela porcentagem em ordem decrescente
            sorted_pets = sorted(pets_with_percentage, key=lambda x: x["percentage"], reverse=True)

            # Prepara os dados dos pets para resposta
            pets_data = [
                {
                    "id": pet_data["pet"].id,
                    "name": pet_data["pet"].name,
                    "date_of_birth": pet_data["pet"].date_of_birth,
                    "species": pet_data["pet"].species,
                    "description": pet_data["pet"].description,
                    "status": pet_data["pet"].status,
                    "clusters": list(pet_data["pet"].cluster.values('id', 'name')),  # Retorna os clusters do pet
                    "percentage": round(pet_data["percentage"], 2)  # Mostra a porcentagem arredondada
                }
                for pet_data in sorted_pets
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
