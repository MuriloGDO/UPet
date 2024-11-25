from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import ValidationError
from ..models import Login
from ..api.serializers import Users_model_serializer, Login_model_serializer

class User_update_service:
    @staticmethod
    def update_user(user, data):
        email = data.get("email")
        password = data.get("password")

        if email or password:
            if password and password.strip() == "":
                raise ValidationError({"error": "A senha não deve ser vazia."})
          
            if password:
                hashed_password = make_password(password)

            try:
                login = Login.objects.get(user=user)
                login_data = {}
                if email:
                    login_data["email"] = email
                if password:
                    login_data["password"] = hashed_password

                login_serializer = Login_model_serializer(login, data=login_data, partial=True)
                if login_serializer.is_valid():
                    login_serializer.save()
                else:
                    raise ValidationError(login_serializer.errors)
            except Login.DoesNotExist:
                raise ValidationError({"error": "Login associado ao usuário não encontrado."})

        if password:
            data["password"] = hashed_password 

        user_serializer = Users_model_serializer(user, data=data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
            return user_serializer.data
        else:
            raise ValidationError(user_serializer.errors)
