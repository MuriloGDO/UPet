from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ...models import Users, Login, Clusters
from django.contrib.auth.hashers import check_password

class test_User_register(APITestCase):
    def setUp(self):
        self.cluster = Clusters.objects.create(name='Cluster Teste')
        self.user_data = {
            'name': 'Test User',
            'telephone': '(11) 987654321',
            'email': 'testuser@example.com',
            'date_of_birth': '2002-06-21',
            'address': 'Rua Unifesp, 400 - Faculdade',
            'cpf': '987.654.321-09',
            'photo': None,
            'description': 'Teste',
            'cluster': self.cluster.id,
            'password': 'TestPassword123'
        }
        self.url = reverse('user-register') 

    def test_create_user_successfully(self):
        response = self.client.post(self.url, self.user_data, format='json')
        
        # Verificações de resposta e criação de usuário e login
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Users.objects.count(), 1)
        self.assertEqual(Login.objects.count(), 1)
        
        # Verificar se o usuário foi criado com o e-mail correto e senha hashada
        user = Users.objects.get(name=self.user_data['name'])
        self.assertEqual(user.email, self.user_data['email'])
        self.assertTrue(check_password(self.user_data['password'], user.password))

    def test_create_user_with_invalid_data(self):
        # Teste de criação com dados inválidos (email incorreto)
        invalid_data = self.user_data.copy()
        invalid_data['email'] = 'invalid'
        response = self.client.post(self.url, invalid_data, format='json')

        # Verifica erro 400 e ausência de criação de usuário/login
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Users.objects.count(), 0)
        self.assertEqual(Login.objects.count(), 0)

    def test_login_creation_failure_rolls_back_user_creation(self):
        # Teste de falha na criação do login com senha inválida
        invalid_password_data = self.user_data.copy()
        invalid_password_data['email'] = 'invalid'
        response = self.client.post(self.url, invalid_password_data, format='json')

        # Verifica rollback do usuário em caso de falha de login
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Users.objects.count(), 0)
        self.assertEqual(Login.objects.count(), 0)