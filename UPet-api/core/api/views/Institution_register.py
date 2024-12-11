from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from ...services import Institution_register_service
from ...exceptions import Rollback_exception, User_creation_exception

class Institution_register(APIView):
    def post(self, request):
        institution_data = request.data.copy()
        
        try:
            # Criação da Instituição
            institution, institution_serializer = Institution_register_service.create_institution(institution_data)
            
            # Criação do Login
            Institution_register_service.create_login(
                institution,
                institution_serializer.validated_data.get("email"),
                institution_data["password"]
            )
            
            return Response(institution_serializer.data, status=status.HTTP_201_CREATED)

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
            Institution_register_service.rollback_institution(institution)
            return Response(
                {"errors": e.args[0]},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )