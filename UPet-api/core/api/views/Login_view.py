from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from ...models import Users
import jwt, datetime

class Login_view(APIView):
    def post(self, request):
        email = request.data["email"]
        # password = request.data["password"]           //lembrar de descomentar quando já estiver implementado
        
        user = Users.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User não foi encontrado.')
        
        # if not user.check_password(password):
        #     raise AuthenticationFailed('Senha inválida')          //Fazer quando a logica da senha ja estiver implementada

        payload = {
            "id": user.id,
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.now(datetime.timezone.utc)
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token
        }
        return response


