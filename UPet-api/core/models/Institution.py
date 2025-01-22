from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from ..classes import Institution

class Institution(models.Model):
    cnpj = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=128, blank=False, null=False)

    def find_by_id(id):
        if Institution.objects.filter(id = id).exists():
            institution = Institution.objects.get(id = id)
            return Institution(institution.id, institution.cnpj, institution.telephone, institution.address, institution.email, institution.password)
        else:
            raise ObjectDoesNotExist("Instituição com o ID especificado não foi encontrada.")