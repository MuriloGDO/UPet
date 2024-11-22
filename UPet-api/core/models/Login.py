from django.db import models
from .Clusters import Clusters
from .Users import Users
from .Institution import Institution

class Login(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE, related_name='login', blank=True, null=True)
    institution = models.OneToOneField(Institution, on_delete=models.CASCADE, related_name='login', blank=True, null=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, blank=False, null=False)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def find_by_email(email):
        return Login.objects.filter(email = email).first()