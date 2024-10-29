from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import ValidationError
from ..api.serializers import Users_model_serializer, Login_model_serializer
from ..exceptions import Rollback_exception, User_creation_exception

class User_register_service:
    @staticmethod
    def create_user(user_data):
        """
        Cria um usuário com dados fornecidos e retorna o serializer do usuário.
        Levanta uma ValidationError em caso de falha.
        """

        if not user_data.get('password') or user_data.get('password').strip() == "":
            raise User_creation_exception("A senha não pode ser vazia.")
        
        user_data['password'] = make_password(user_data.get('password'))
        user_serializer = Users_model_serializer(data=user_data)

        if not user_serializer.is_valid():
            raise User_creation_exception(user_serializer.errors)

        user = user_serializer.save()
        return user, user_serializer

    @staticmethod
    def create_login(user, email, password):
        """
        Cria o login para o usuário com base no ID, e-mail e senha fornecidos.
        Levanta uma Rollback_exception em caso de falha.
        """
        login_data = {
            'user': user.id,
            'email': email,
            'password': password
        }
        login_serializer = Login_model_serializer(data=login_data)
        
        if login_serializer.is_valid():
            login_serializer.save()
        else:
            raise Rollback_exception(login_serializer.errors)

    @staticmethod
    def rollback_user(user):
        """
        Exclui o usuário em caso de erro ao criar o login.
        """
        user.delete()