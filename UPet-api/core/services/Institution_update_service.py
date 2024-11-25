from rest_framework.exceptions import ValidationError
from ..models import Institution
from ..api.serializers import Institution_model_serializer

class Institution_update_service:
    @staticmethod
    def update_institution(institution, data):
        email = data.get("email")
        name = data.get("name")

        if email and not email.endswith("@example.com"):
            raise ValidationError({"error": "Email deve terminar com '@example.com'."})

        institution_serializer = Institution_model_serializer(institution, data=data, partial=True)
        if institution_serializer.is_valid():
            institution_serializer.save()
            return institution_serializer.data
        else:
            raise ValidationError(institution_serializer.errors)
