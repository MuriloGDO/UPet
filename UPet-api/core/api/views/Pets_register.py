from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Pets, Pets_photos, Register_pets
from ..serializers import Pets_model_serializer, Pets_photos_model_serializer, Register_pets_serializer

class Pets_register(APIView):
    def post(self, request):
        pet_data = request.data.get('pet')
        if not pet_data:
            return Response({"error": "Pet data is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        pet_serializer = Pets_model_serializer(data=pet_data)
        if pet_serializer.is_valid():
            pet = pet_serializer.save()
        else:
            return Response(pet_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        photos_data = request.data.get('photos', [])
        for photo_data in photos_data:
            photo_serializer = Pets_photos_model_serializer(data=photo_data)
            if photo_serializer.is_valid():
                photo_serializer.save(pet=pet) 
            else:
                return Response(photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
        register_data = request.data.get('register')
        if not register_data:
            return Response({"error": "Register data is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        register_serializer = Register_pets_serializer(data={**register_data, "pet": pet.id})
        if register_serializer.is_valid():
            register_serializer.save()
        else:
            return Response(register_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "Pet successfully added."}, status=status.HTTP_201_CREATED)
