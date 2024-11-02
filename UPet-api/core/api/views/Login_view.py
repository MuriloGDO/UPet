from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import check_password
from rest_framework import status
from ...services import Login_service
from django.core.exceptions import ObjectDoesNotExist

class Login_view(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        
        try:
            login_id, user_type = Login_service.authenticate(email, password)
            token = Login_service.generate_token(login_id, user_type)
            if user_type["user"] == 1:
                data = Login_service.get_user_info(login_id)
            else:
                data = Login_service.get_institution_info(login_id)
            response = Response()
            response.set_cookie(key='jwt', value=token, httponly=True)
            response.data = {
                'jwt': token,
                'user': user_type["user"],
                'institution': user_type["institution"],
                'data': data
            }
            return response
        except AuthenticationFailed as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except ObjectDoesNotExist as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": f"Ocorreu um erro inesperado: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            



