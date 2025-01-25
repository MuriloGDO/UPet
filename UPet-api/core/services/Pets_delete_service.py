from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
from ..models import Pets
from ..exceptions import Rollback_exception

class Pets_delete_service:
    @staticmethod
    @transaction.atomic
    def delete_pet(pet_id):
        try:
            pet = Pets.objects.get(id=pet_id)
            pet.delete()
        except ObjectDoesNotExist as e:
            raise Rollback_exception(f"Erro ao deletar: {str(e)}")
        except Exception as e:
            raise Rollback_exception(f"Erro inesperado: {str(e)}")
