from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from ...models import Users, Login
from ...services import User_delete_service
from ...exceptions import Rollback_exception

class test_Users_delete(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = Users.objects.create(
            name="Test User",
            telephone="123456789",
            email="test@example.com",
            date_of_birth="1990-01-01",
            address="123 Main St",
            cpf="12345678900",
            description="A test user",
            password="testpassword"
        )
        self.login = Login.objects.create(
            user=self.user,
            email=self.user.email,
            password=self.user.password
        )
        self.url = '/api/user_delete/'  

    def test_delete_user_and_login_success(self):
        data = {'id': self.user.id}
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Usuário e login deletados com sucesso.")

        with self.assertRaises(Users.DoesNotExist):
            Users.objects.get(id=self.user.id)
        with self.assertRaises(Login.DoesNotExist):
            Login.objects.get(user=self.user)

    def test_delete_user_with_no_id(self):
        data = {}
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "O ID do usuário é obrigatório.")

    def test_delete_user_not_found(self):
        data = {'id': 9999} 
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Falha ao deletar", response.data['error'])

    def test_delete_user_with_no_login(self):
        self.login.delete()
        
        data = {'id': self.user.id}
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Falha ao deletar", response.data['error'])

    def test_unexpected_error(self):
        data = {'id': self.user.id}
        with self.assertRaises(Exception):
            with self.client.post(self.url, data, format='json'):
                raise Exception("Erro inesperado.")

    def tearDown(self):
        Users.objects.all().delete()
        Login.objects.all().delete()
