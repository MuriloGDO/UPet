from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from ..serializers import Users_model_serializer
from ..serializers import Login_model_serializer

class Users_register(APIView):
    def post(self, request):
        hashed_password = make_password(request.data.get('password'))
        user_data = request.data.copy()
        user_data['password'] = hashed_password
        
        user_serializer = Users_model_serializer(data=user_data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            login_data = {
                'user': user.id,
                'email': user_serializer.validated_data.get('email'),
                'password': hashed_password 
            }
            login_serializer = Login_model_serializer(data=login_data)
            
            if login_serializer.is_valid():
                login_serializer.save()
                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
            else:
                user.delete()
                return Response(login_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)