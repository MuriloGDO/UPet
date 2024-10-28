from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import check_password
from rest_framework import status
from ...models import Login
import jwt, datetime

class Login_view(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        # institution = 0
        user = 0
        
        login = Login.objects.filter(email=email).first()

        if login is None:
            raise AuthenticationFailed('login não foi encontrado.')
        
        if not check_password(password, login.password):
            raise AuthenticationFailed('Senha inválida')      

        if login.user is not None:
            login_id = login.user_id
            user = 1
        # else:
        #     login_id = login.institution
        #     institution = 1

        payload = {
            "id": login_id,
            # "institution": institution,
            "user": user,
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


