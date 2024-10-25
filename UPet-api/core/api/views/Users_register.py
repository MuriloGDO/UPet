from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers import Users_model_serializer

class Users_register(APIView):
    def post(self, request):
        serializer = Users_model_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)