from django.db import models

class Institution(models.Model):
    cnpj = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=128, blank=False, null=False)
