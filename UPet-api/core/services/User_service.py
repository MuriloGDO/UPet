from django.contrib.auth.hashers import make_password
from ..api.serializers import Users_model_serializer, Login_model_serializer

class User_register_service:
    @staticmethod
    def create_user(user_data):
        """
        Cria um usuário com dados fornecidos e retorna o serializer do usuário.
        """
        user_data['password'] = make_password(user_data.get('password'))
        user_serializer = Users_model_serializer(data=user_data)
        
        if user_serializer.is_valid():
            user = user_serializer.save()
            return user, user_serializer
        return None, user_serializer

    @staticmethod
    def create_login(user, email, password):
        """
        Cria o login para o usuário com base no ID, e-mail e senha fornecidos.
        """
        login_data = {
            'user': user.id,
            'email': email,
            'password': password
        }
        login_serializer = Login_model_serializer(data=login_data)
        
        if login_serializer.is_valid():
            login_serializer.save()
            return login_serializer, None
        return None, login_serializer.errors

    @staticmethod
    def rollback_user(user):
        """
        Exclui o usuário em caso de erro ao criar o login.
        """
        user.delete()