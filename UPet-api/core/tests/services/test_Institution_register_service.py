from django.test import TestCase
from core.services import Institution_register_service
from core.models import Institution, Login
from core.exceptions import Rollback_exception, User_creation_exception


class test_Institution_register_service(TestCase):
    def setUp(self):
        self.valid_institution_data = {
            "name": "Test Institution",
            "email": "test@example.com",
            "password": "password123",
            "cnpj": "12345678000190",  
            "telephone": "(11) 98765-4321",  
            "address": "Rua Teste, 123",  
        }

    def test_create_institution_success(self):
        institution, serializer = Institution_register_service.create_institution(self.valid_institution_data)
        self.assertIsNotNone(institution)
        self.assertEqual(institution.email, self.valid_institution_data["email"])

    def test_create_institution_invalid_data(self):
        invalid_data = self.valid_institution_data.copy()
        invalid_data["email"] = "invalid_email"

        with self.assertRaises(User_creation_exception):
            Institution_register_service.create_institution(invalid_data)

    def test_create_login_success(self):
        institution, _ = Institution_register_service.create_institution(self.valid_institution_data)
        Institution_register_service.create_login(
            institution,
            self.valid_institution_data["email"],
            self.valid_institution_data["password"]
        )
        login = Login.objects.get(email=self.valid_institution_data["email"])
        self.assertEqual(login.institution, institution)

    def test_create_login_failure(self):
        institution, _ = Institution_register_service.create_institution(self.valid_institution_data)

        with self.assertRaises(Rollback_exception):
            Institution_register_service.create_login(institution, "invalid_email", "password123")

    def test_rollback_institution(self):
        institution, _ = Institution_register_service.create_institution(self.valid_institution_data)
        Institution_register_service.rollback_institution(institution)
        self.assertFalse(Institution.objects.filter(id=institution.id).exists())
