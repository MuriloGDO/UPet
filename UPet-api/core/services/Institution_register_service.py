from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import ValidationError
from ..api.serializers import Institution_model_serializer, Login_model_serializer
from ..exceptions import Rollback_exception, User_creation_exception

class Institution_register_service:
    @staticmethod
    def create_institution(institution_data):
        if not institution_data.get('password') or institution_data.get('password').strip() == "":
            raise User_creation_exception("A senha não pode ser vazia.")

        institution_data['password'] = make_password(institution_data.get('password'))
        institution_serializer = Institution_model_serializer(data=institution_data)

        if not institution_serializer.is_valid():
            raise User_creation_exception(institution_serializer.errors)

        institution = institution_serializer.save()
        return institution, institution_serializer

    @staticmethod
    def create_login(institution, email, password):
        try:
            login_data = {
                "institution": institution.id,
                "user": None,  # Para diferenciar de login de usuários
                "email": email,
                "password": password,
            }

            login_serializer = Login_model_serializer(data=login_data)

            if login_serializer.is_valid():
                login_serializer.save()
            else:
                raise Rollback_exception(str(login_serializer.errors))
        except Exception as e:
            raise Rollback_exception(str(e))

    @staticmethod
    def rollback_institution(institution):
        institution.delete()