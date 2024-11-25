from rest_framework.exceptions import ValidationError
from ..models import Pets
from ..api.serializers import Pets_model_serializer

class Pets_update_service:
    @staticmethod
    def update_pet(pet, data):
        name = data.get("name")
        age = data.get("age")
        description = data.get("description")

        # Você pode adicionar validações específicas aqui
        if name and name.strip() == "":
            raise ValidationError({"error": "O nome do pet não pode ser vazio."})

        if age and (not isinstance(age, int) or age < 0):
            raise ValidationError({"error": "A idade do pet deve ser um número inteiro positivo."})

        pet_serializer = Pets_model_serializer(pet, data=data, partial=True)
        if pet_serializer.is_valid():
            pet_serializer.save()
            return pet_serializer.data
        else:
            raise ValidationError(pet_serializer.errors)
