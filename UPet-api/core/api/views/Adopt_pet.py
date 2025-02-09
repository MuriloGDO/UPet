from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from ...services import Adopt_pet_service
from ...exceptions import Adopt_pet_exception


class Adopt_pet(APIView):
    def post(self, request):
        if type(request.data) == dict:
            adoption_data = request.data.copy()
        else:
            adoption_data = request.data.dict()
        
        try:
            adoption_serializer = Adopt_pet_service.adopt(adoption_data)
            return Response(adoption_serializer.data, status=status.HTTP_201_CREATED)
        except Adopt_pet_exception as e:
            return Response(
                {"errors": e.errors}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"errors": str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )