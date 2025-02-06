from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Users, Institution
from ..serializers import Chat_room_serializer
from django.core.exceptions import ObjectDoesNotExist

class Chat_create(APIView):
    def post(self, request):
        chat_data = request.data
        user_id = chat_data.get("user_id")
        institution_id = chat_data.get("institution_id")

        try:
            Users.objects.get(id=user_id)
            Institution.objects.get(id=institution_id)
        except ObjectDoesNotExist:
            return Response({"error": "Usuário ou instituição não encontrados."}, status=status.HTTP_400_BAD_REQUEST)
        
        chat_name = '' + str(user_id) + '_' + str(institution_id)
        data = {"name": chat_name, "user": user_id, "institution": institution_id}
        serializer = Chat_room_serializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
