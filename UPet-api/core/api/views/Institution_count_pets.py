from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Register_pets

class Institution_count_pets(APIView):
    def post(self, request):
        institution_id = request.data.get('id')

        if not institution_id:
            return Response(
                {"error": "O ID da instituição é obrigatório."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Filtrar os registros de pets pela instituição
            register_pets = Register_pets.objects.filter(institution=institution_id)
            
            # Contar o número de registros
            pet_counter = register_pets.count()

            return Response({"pet_counter": pet_counter}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
