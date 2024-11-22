from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from ...services import Login_service
from django.core.exceptions import ObjectDoesNotExist
from ...models import Users

class Login_view(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        
        try:
            login_id, user_type = Login_service.authenticate(email, password)
            token = Login_service.generate_token(login_id, user_type)
            if user_type["user"] == 1:
                user = Users.find_by_id(login_id)
                data = user.to_json()
            else:
                data = Login_service.get_institution_info(login_id)
            response = Login_service.get_response(token, user_type, data)
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
            



