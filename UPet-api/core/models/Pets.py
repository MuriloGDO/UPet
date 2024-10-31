from django.db import models
from django.core.exceptions import ValidationError
from .Clusters import Clusters
from .Institution import Institution

class Pets(models.Model):
    name = models.CharField(max_length=30)
    date_of_birth = models.DateField()
    species = models.CharField(max_length=30)
    description = models.CharField(max_length=500)
    photo = models.ImageField(upload_to='users_picture/', blank=True, null=True)
    status = models.CharField(max_length=30)
    cluster = models.ForeignKey(Clusters, on_delete=models.CASCADE, related_name='pets', blank=True, null=True)

 # Método save para inferir o cluster do usuário
    def save(self, *args, **kwargs):
        # Adicione lógica personalizada aqui para definir o cluster do usuário
        super().save(*args, **kwargs)