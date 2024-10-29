from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...services import User_register_service

class Users_register(APIView):
    def post(self, request):
        user_data = request.data.copy()
        user, user_serializer = User_register_service.create_user(user_data)
        
        if user:
            login_serializer, login_errors = User_register_service.create_login(
                user, user_serializer.validated_data.get('email'), user_data['password']
            )
            if login_serializer:
                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
            else:
                User_register_service.rollback_user(user)
                return Response(login_errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)