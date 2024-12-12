from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from ...services import User_register_service
from ...exceptions import Rollback_exception, User_creation_exception
from datetime import datetime

class Users_register(APIView):
    def post(self, request):
        if type(request.data) == dict:
            user_data = request.data.copy()
        else:
            user_data = request.data.dict()
        print(user_data)
        user_data['date_of_birth'] = datetime.strptime(user_data['date_of_birth'], "%d/%m/%Y").date()

        try:
            user, user_serializer = User_register_service.create_user(user_data)
            User_register_service.create_login(
                user, user_serializer.validated_data.get('email'), user_data['password']
            )
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)

        except User_creation_exception as e:
            return Response(
                {"errors": e.errors}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except ValidationError as e:
            return Response(
                {"errors": e.detail},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Rollback_exception as e:
            User_register_service.rollback_user(user)
            return Response(
                {"errors": e.args[0]}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred.", "details": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )