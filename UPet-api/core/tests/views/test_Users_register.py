from unittest.mock import patch, MagicMock
from core.models import Clusters
from core.exceptions import Rollback_exception, User_creation_exception
from rest_framework.test import APITestCase
from rest_framework import status

class test_User_register(APITestCase):
    def setUp(self):
        self.url = '/api/user_register/'
        self.valid_payload = {
            "name": "Test User",
            "telephone": "(11) 987654321",
            "email": "testuser@example.com",
            "date_of_birth": "15/08/1990",  
            "address": "Rua Unifesp, 400 - Faculdade",
            "cpf": "987.654.321-09",
            "photo": None,
            "description": "Teste",
            "password": "TestPassword123"
        }
        self.invalid_date_payload = {
            "name": "Test User",
            "telephone": "(11) 987654321",
            "email": "testuser@example.com",
            "date_of_birth": "invalid-date",  
            "address": "Rua Unifesp, 400 - Faculdade",
            "cpf": "987.654.321-09",
            "photo": None,
            "description": "Teste",
            "password": "TestPassword123"
        }

    @patch('core.services.User_register_service.User_register_service.create_user')
    @patch('core.services.User_register_service.User_register_service.create_login')
    @patch('core.services.User_register_service.User_register_service.rollback_user')
    def test_post_success(self, mock_rollback, mock_create_login, mock_create_user):
        # Mocks para simular o comportamento dos serviços
        mock_create_user.return_value = ('user', 'user_serializer')
        mock_create_login.return_value = None
        mock_rollback.return_value = None

        # Enviar dados válidos
        response = self.client.post(self.url, self.valid_payload, format="json")

        # Verifique se a resposta está correta
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        mock_create_user.assert_called_once()
        mock_create_login.assert_called_once()

    @patch('core.services.User_register_service.User_register_service.create_user')
    def test_post_invalid_date_format(self, mock_create_user):
        # Simulando falha na criação do usuário devido a erro na data
        response = self.client.post(self.url, self.invalid_date_payload, format="json")

        # A resposta deve ser um erro 400 com mensagem de erro de data inválida
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("errors", response.data)
        self.assertEqual(response.data["errors"][0], "Data de nascimento inválida. Use o formato DD/MM/AAAA.")

    @patch('core.services.User_register_service.User_register_service.create_user')
    @patch('core.services.User_register_service.User_register_service.create_login')
    def test_post_user_creation_failure(self, mock_create_login, mock_create_user):
        # Simulando falha na criação do usuário
        mock_create_user.side_effect = User_creation_exception("Erro ao criar o usuário")
        
        response = self.client.post(self.url, self.valid_payload, format="json")
        
        # A resposta deve ser um erro 400 com mensagem de erro
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("errors", response.data)
        self.assertEqual(response.data["errors"], "Erro ao criar o usuário")
        
    @patch('core.services.User_register_service.User_register_service.create_user')
    @patch('core.services.User_register_service.User_register_service.create_login')
    @patch('core.services.User_register_service.User_register_service.rollback_user')
    def test_post_rollback_on_failure(self, mock_rollback, mock_create_login, mock_create_user):
        # Simulando falha após criação de login e rolback no usuário
        mock_create_user.return_value = ('user', 'user_serializer')
        mock_create_login.side_effect = Exception("Erro na criação do login")
        
        # Enviar dados válidos
        response = self.client.post(self.url, self.valid_payload, format="json")

        # A resposta deve ser um erro 400 com mensagem de rollback
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("errors", response.data)
        self.assertEqual(response.data["errors"], "Erro na criação do login")
        mock_rollback.assert_called_once()

    @patch('core.services.User_register_service.User_register_service.create_user')
    def test_post_missing_data(self, mock_create_user):
        # Testando falha por dados faltando
        invalid_payload = self.valid_payload.copy()
        del invalid_payload['email']  # Remover email

        response = self.client.post(self.url, invalid_payload, format="json")

        # A resposta deve ser um erro 400 devido a dados faltando
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("errors", response.data)
        self.assertEqual(response.data["errors"], ['Este campo é obrigatório.'])

    @patch('core.services.User_register_service.User_register_service.create_user')
    def test_post_invalid_email(self, mock_create_user):
        # Testando falha por email inválido
        invalid_payload = self.valid_payload.copy()
        invalid_payload['email'] = 'invalid-email'

        response = self.client.post(self.url, invalid_payload, format="json")

        # A resposta deve ser um erro 400 devido ao formato inválido de email
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("errors", response.data)
        self.assertIn("Enter a valid email address.", response.data["errors"])