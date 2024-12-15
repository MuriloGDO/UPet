from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from ...models import Users, Pets, Pets_photos, Register_pets

class Users_search_pets(APIView):
    def post(self, request):
        user_id = request.data.get('id')

        try:
            user = Users.objects.get(id=user_id)

            user_clusters = user.cluster.all()  
            total_user_clusters = user_clusters.count() 

            if total_user_clusters == 0:
                return Response(
                    {"error": "Usuário não tem clusters associados."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            all_pets = Pets.objects.all()

            pets_with_percentage = []

            for pet in all_pets:
                common_clusters = pet.cluster.filter(id__in=user_clusters.values_list('id', flat=True))
                common_clusters_count = common_clusters.count()

                percentage = (common_clusters_count / total_user_clusters) * 100

                pets_with_percentage.append({
                    "pet": pet,
                    "percentage": percentage
                })

            sorted_pets = sorted(pets_with_percentage, key=lambda x: x["percentage"], reverse=True)

            pets_data = []
            for pet_data in sorted_pets:
                pet = pet_data["pet"]
                register_pet = Register_pets.objects.filter(pet=pet).first()
                institution_data = {
                    "id": register_pet.institution.id,
                    "name": register_pet.institution.name,
                    "telephone": register_pet.institution.telephone,
                    "address": register_pet.institution.address,
                    "email": register_pet.institution.email
                } if register_pet else None

                pets_data.append({
                    "id": pet.id,
                    "name": pet.name,
                    "date_of_birth": pet.date_of_birth,
                    "species": pet.species,
                    "description": pet.description,
                    "status": pet.status,
                    "clusters": list(pet.cluster.values('id', 'name')),  # Retorna os clusters do pet
                    "institution": institution_data,
                    "photos": list(Pets_photos.objects.filter(pet=pet).values('id', 'photo', 'uploaded_at')),
                    "percentage": round(pet_data["percentage"], 2)  # Mostra a porcentagem arredondada
                })

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
