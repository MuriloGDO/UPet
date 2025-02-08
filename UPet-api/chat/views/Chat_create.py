from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.models import Users, Register_pets
from ..serializers import Chat_room_serializer_create
from django.core.exceptions import ObjectDoesNotExist

class Chat_create(APIView):
    def post(self, request):
        chat_data = request.data
        user_id = chat_data.get("user_id")
        pet_id = chat_data.get("pet_id")
        try:
            Users.objects.get(id=user_id)
            register_pet = Register_pets.objects.get(pet=pet_id)
            institution_id = register_pet.institution.id
        except ObjectDoesNotExist:
            return Response({"error": "Usuário, instituição ou pet não encontrados."}, status=status.HTTP_400_BAD_REQUEST)
        
        chat_name = '' + str(user_id) + '_' + str(pet_id)
        data = {"name": chat_name, "user": user_id, "pet": pet_id, "institution": institution_id}
        serializer = Chat_room_serializer_create(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
