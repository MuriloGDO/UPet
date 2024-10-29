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

        # Verificar se o usuário foi criado com as informações certas
        user = Users.objects.get(email=self.user_data['email'])
        self.assertEqual(user.name, self.user_data['name'])
        self.assertTrue(check_password(self.user_data['password'], user.password))
        self.assertEqual(user.telephone, self.user_data['telephone'])
        self.assertEqual(user.cpf, self.user_data['cpf'])
        self.assertEqual(user.description, self.user_data['description'])
        self.assertEqual(user.cluster.id, self.cluster.id)

    def test_create_user_with_invalid_email(self):
        invalid_data = self.user_data.copy()
        invalid_data['email'] = 'invalid'
        response = self.client.post(self.url, invalid_data, format='json')

        # Verifica erro 400 e ausência de criação de usuário/login
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Users.objects.count(), 0)
        self.assertEqual(Login.objects.count(), 0)

    def test_create_user_with_empty_password(self):
        invalid_data = self.user_data.copy()
        invalid_data['password'] = ''
        response = self.client.post(self.url, invalid_data, format='json')

        # Verifica erro 400 e ausência de criação de usuário/login
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Users.objects.count(), 0)
        self.assertEqual(Login.objects.count(), 0)

    def test_create_user_without_cluster(self):
        invalid_data = self.user_data.copy()
        invalid_data['cluster'] = None
        response = self.client.post(self.url, invalid_data, format='json')

        # Verifica erro 400 e ausência de criação de usuário/login
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Users.objects.count(), 1)
        self.assertEqual(Login.objects.count(), 1)