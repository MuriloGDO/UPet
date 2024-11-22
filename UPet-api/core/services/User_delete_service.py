from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError
from ..models import Users, Login
from ..exceptions import Rollback_exception

class User_delete_service:
    @staticmethod
    @transaction.atomic 
    def delete_user_and_login(user_id):
        try:
            user = Users.objects.get(id=user_id)
            login = Login.objects.get(user=user)
            login.delete()
            user.delete()
            
        except ObjectDoesNotExist as e:
            raise Rollback_exception(f"Erro ao deletar: {str(e)}")
        
        except Exception as e:
            raise Rollback_exception(f"Erro inesperado: {str(e)}")
