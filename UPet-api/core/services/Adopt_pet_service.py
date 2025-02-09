from rest_framework.exceptions import ValidationError
from ..api.serializers import Adoption_model_serializer
from ..exceptions import Adopt_pet_exception
from ..models import Users, Register_pets, Pets
from datetime import datetime

class Adopt_pet_service:
    @classmethod
    def adopt(cls, data):
        if not data.get('user_id') or not data.get('pet_id'):
            raise Adopt_pet_exception("Usuário ou pet não existem.")

        user = Users.objects.get(id=data.get('user_id'))
        pet = Pets.objects.get(id=data.get('pet_id'))
        institution = Register_pets.objects.get(pet=pet.id)

        adoption_serializer = Adopt_pet_service.create_adoption(user, pet, institution)
        return adoption_serializer


    @staticmethod
    def create_adoption(user, pet, institution):
        try:
            adoption_data = {
                'user': user.id,
                'pet': pet.id,
                'institution': institution.id,
                'date_of_adoption': datetime.today().date()
            }
            adoption_serializer = Adoption_model_serializer(data=adoption_data)
            
            if adoption_serializer.is_valid():
                adoption_serializer.save()
            
            pet.status = 'Unavailable'
            pet.save()
            
            return adoption_serializer
        except Exception as e:
            raise Adopt_pet_exception(str(e))