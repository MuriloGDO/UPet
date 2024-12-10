from django.db import models
from django.core.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from .Clusters import Clusters
from ..classes import User

class Users(models.Model):
    name = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    email = models.EmailField(max_length=100, unique=True)
    date_of_birth = models.DateField()
    address = models.CharField(max_length=150)
    cpf = models.CharField(max_length=30)
    photo = models.TextField(blank=True, null=True)
    description = models.CharField(max_length=500)
    # cluster = models.ForeignKey(Clusters, on_delete=models.CASCADE, related_name='usuarios', blank=True, null=True)
    cluster = models.ManyToManyField(Clusters, related_name='usuarios', blank=True)
    password = models.CharField(max_length=128, blank=False, null=False, default='')

    # Método save para inferir o cluster do usuário
    def save(user, *args, **kwargs):
        # Adicione lógica personalizada aqui para definir o cluster do usuário
        super().save(*args, **kwargs) 

    def find_by_id(id):
        if Users.objects.filter(id = id).exists():
            # return Users.objects.get(id = id)
            user = Users.objects.get(id = id)
            return User(user.id, user.name, user.telephone, user.email, user.date_of_birth, user.address, user.cpf, user.photo, user.description, user.cluster, user.password)
        else:
            raise ObjectDoesNotExist("Usuário com o ID especificado não foi encontrado.")