from django.db import models
from django.core.exceptions import ValidationError

class Institution(models.Model):
    cnpj = models.CharField(max_length=15)
    name = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
