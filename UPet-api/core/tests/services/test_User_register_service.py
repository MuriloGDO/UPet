from django.test import TestCase
from unittest.mock import patch, MagicMock
from core.services import User_register_service
from core.models import Users, Login, Clusters
from core.exceptions import Rollback_exception, User_creation_exception

class Test_user_register_service(TestCase):
    def setUp(self):
        self.cluster1 = Clusters.objects.create(id=1, name='Cluster 1')
        self.cluster2 = Clusters.objects.create(id=2, name='Cluster 2')
        self.user_data = {
            'name': 'Test User',
            'telephone': '(11) 987654321',
            'email': 'testuser@example.com',
            'date_of_birth': '2001-04-01',
            'address': 'Rua Unifesp, 400 - Faculdade',
            'cpf': '987.654.321-09',
            'photo': None,
            'description': 'Sou alegre',
            'password': 'TestPassword123'
        }

    @patch("core.maritalkapi.Maritalk.Maritalk.get_response", return_value="1, 2")  
    def test_create_user_successfully(self, mock_maritalk):
        user, user_serializer = User_register_service.create_user(self.user_data)

        self.assertIsNotNone(user)
        self.assertEqual(user.email, self.user_data['email'])
        self.assertIsNotNone(user.password)
        self.assertEqual(user.cluster.count(), 2) 

    @patch("core.maritalkapi.Maritalk.Maritalk.get_response", return_value="1, 2") 
    def test_create_user_with_empty_password(self, mock_maritalk):
        self.user_data['password'] = ''

        with self.assertRaises(User_creation_exception) as exc_info:
            User_register_service.create_user(self.user_data)

        self.assertEqual(str(exc_info.exception), "A senha não pode ser vazia.")

    @patch("core.maritalkapi.Maritalk.Maritalk.get_response", return_value="1,2")  
    def test_create_login_successfully(self, mock_maritalk):
        user, user_serializer = User_register_service.create_user(self.user_data)

        login_email = self.user_data['email']
        login_password = self.user_data['password']

        User_register_service.create_login(user, login_email, login_password)

        self.assertTrue(Login.objects.filter(email=login_email).exists())
    
    @patch("core.maritalkapi.Maritalk.Maritalk.get_response", return_value="1, 2") 
    def test_rollback_user(self, mock_maritalk):
        user, user_serializer = User_register_service.create_user(self.user_data)

        self.assertTrue(Users.objects.filter(id=user.id).exists())

        
        User_register_service.rollback_user(user)

        self.assertFalse(Users.objects.filter(id=user.id).exists())  
