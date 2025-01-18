from rest_framework.test import APITestCase
from rest_framework import status
from unittest.mock import patch, MagicMock
from ...exceptions import Rollback_exception, User_creation_exception

class TestInstitutionRegisterAPIView(APITestCase):
    def setUp(self):
        self.url = "/api/institution_register/"  
        self.valid_payload = {
            "name": "Test Institution",
            "email": "test@example.com",
            "password": "password123"
        }
        self.invalid_payload = {
            "name": "",
            "email": "invalid_email",
            "password": ""
        }

    @patch("..services.Institution_register_service.create_institution")
    @patch("..services.Institution_register_service.create_login")
    def test_post_success(self, mock_create_login, mock_create_institution):
        mock_create_institution.return_value = (MagicMock(id=1), MagicMock(validated_data=self.valid_payload))

        response = self.client.post(self.url, self.valid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("email", response.data)

    @patch("..services.Institution_register_service.create_institution")
    def test_post_invalid_institution_data(self, mock_create_institution):
        mock_create_institution.side_effect = User_creation_exception("Invalid data")

        response = self.client.post(self.url, self.invalid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("errors", response.data)

    @patch("..services.Institution_register_service.create_institution")
    @patch("..services.Institution_register_service.rollback_institution")
    def test_post_rollback_on_failure(self, mock_rollback, mock_create_institution):
        mock_create_institution.return_value = (MagicMock(id=1), MagicMock(validated_data=self.valid_payload))

        with patch("..services.Institution_register_service.create_login", side_effect=Rollback_exception("Error")):
            response = self.client.post(self.url, self.valid_payload, format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            mock_rollback.assert_called_once()
