from django.contrib.auth.hashers import check_password
from rest_framework.exceptions import AuthenticationFailed
from ..models import Login, Users, Institution
import jwt, datetime
from django.core.exceptions import ObjectDoesNotExist

class Login_service:
    @staticmethod
    def authenticate(email, password):
        login = Login.objects.filter(email = email).first()
        if login is None:
            raise AuthenticationFailed('Login não foi encontrado.')

        if not check_password(password, login.password):
            raise AuthenticationFailed('Senha inválida')

        if login.user is not None:
            login_id = login.user.id
            user_type = {"user": 1, "institution": 0}
        else:
            login_id = login.institution.id
            user_type = {"user": 0, "institution": 1}

        return login_id, user_type

    @staticmethod
    def generate_token(login_id, user_type):
        payload = {
            "id": login_id,
            "institution": user_type["institution"],
            "user": user_type["user"],
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.now(datetime.timezone.utc)
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        return token
    
    @staticmethod
    def get_user_info(login_id):
        if Users.objects.filter(id = login_id).exists():
            user = Users.objects.get(id = login_id)
            return {
                "id": user.id,
                "name": user.name,
                "telephone": user.telephone,
                "email": user.email,
                "date_of_birth": user.date_of_birth,
                "address": user.address,
                "cpf": user.cpf,
                "photo": user.photo,
                "description": user.description,
                "cluster": user.cluster.id if user.cluster else None
            }
        else:
            raise ObjectDoesNotExist("Usuário com o ID especificado não foi encontrado.")
    
    def get_institution_info(login_id):
        if Institution.objects.filter(id = login_id).exists():
            institution = Institution.objects.filter(id = login_id)
            return {
                "id": institution.id,
                "cnpj": institution.cnpj,
                "name": institution.name,
                "telephone": institution.telephone,
                "address": institution.address,
                "email": institution.email
            }
        else:
            raise ObjectDoesNotExist("Instituição com o ID especificado não foi encontrada.")