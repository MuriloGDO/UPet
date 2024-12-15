from rest_framework.views import APIView
from ...services import Pets_register_service

class Pets_register(APIView):
    def post(self, request):
        return Pets_register_service.register_pet(request.data)