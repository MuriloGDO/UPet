from django.test import TestCase
from django.core.exceptions import ObjectDoesNotExist
from ...models import Users, Login
from ...services import User_delete_service
from ...exceptions import Rollback_exception

class test_User_delete_service(TestCase):

    def setUp(self):
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

    def test_delete_user_and_login_success(self):
        User_delete_service.delete_user_and_login(self.user.id)
    
        with self.assertRaises(Users.DoesNotExist):
            Users.objects.get(id=self.user.id)
        with self.assertRaises(Login.DoesNotExist):
            Login.objects.get(user=self.user)

    def test_delete_user_not_found(self):
        with self.assertRaises(Rollback_exception) as context:
            User_delete_service.delete_user_and_login(999)  

        self.assertIn("Erro ao deletar", str(context.exception))

    def test_delete_user_with_no_login(self):
        self.login.delete()
        
        with self.assertRaises(Rollback_exception) as context:
            User_delete_service.delete_user_and_login(self.user.id)

        self.assertIn("Erro ao deletar", str(context.exception))

    def tearDown(self):
        Users.objects.all().delete()
        Login.objects.all().delete()
