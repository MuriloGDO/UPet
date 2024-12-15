from django.db import models
from django.core.exceptions import ValidationError
from .Clusters import Clusters
from .Institution import Institution

class Pets(models.Model):
    name = models.CharField(max_length=30)
    date_of_birth = models.DateField()
    species = models.CharField(max_length=30)
    description = models.CharField(max_length=500)
    status = models.CharField(max_length=30)
    cluster = models.ManyToManyField(Clusters, related_name='pets')

    # Método save para inferir o cluster do pet
    def save(self, *args, **kwargs):
        # Adicione lógica personalizada aqui para definir o cluster do pet
        super().save(*args, **kwargs)