from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import ValidationError
from ..models import Institution, Login
from ..api.serializers import Institution_model_serializer, Login_model_serializer

class Institution_update_service:
    @staticmethod
    def update_institution(institution, data):
        email = data.get("email")
        password = data.get("password")

        if email or password:
            if password and password.strip() == "":
                raise ValidationError({"error": "A senha não deve ser vazia."})
          
            if password:
                hashed_password = make_password(password)

            try:
                login = Login.objects.get(institution=institution)
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

        institution_serializer = Institution_model_serializer(institution, data=data, partial=True)
        if institution_serializer.is_valid():
            institution_serializer.save()
            return institution_serializer.data
        else:
            raise ValidationError(institution_serializer.errors)