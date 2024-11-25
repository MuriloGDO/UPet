from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError
from ..models import Institution, Login
from ..exceptions import Rollback_exception

class Institution_delete_service:
    @staticmethod
    @transaction.atomic 
    def delete_institution_and_login(institution_id):
        try:
            institution = institution.objects.get(id=institution_id)
            login = Login.objects.get(user=institution)
            login.delete()
            institution.delete()
            
        except ObjectDoesNotExist as e:
            raise Rollback_exception(f"Erro ao deletar: {str(e)}")
        
        except Exception as e:
            raise Rollback_exception(f"Erro inesperado: {str(e)}")
