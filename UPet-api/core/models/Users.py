from django.db import models
from .Clusters import Clusters

class Users(models.Model):
    name = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    email = models.EmailField(max_length=100, unique=True)
    date_of_birth = models.DateField()
    address = models.CharField(max_length=150)
    cpf = models.CharField(max_length=30)
    photo = models.ImageField(upload_to='users_picture/', blank=True, null=True)
    description = models.CharField(max_length=500)
    cluster = models.ForeignKey(Clusters, on_delete=models.CASCADE, related_name='usuarios')
    password = models.CharField(max_length=128)

    # Método save para inferir o cluster do usuário
    def save(self, *args, **kwargs):
        # Adicione lógica personalizada aqui para definir o cluster do usuário
        super().save(*args, **kwargs) 