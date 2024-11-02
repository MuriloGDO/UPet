from django.db import models
from django.core.exceptions import ValidationError
from .Institution import Institution
from .Pets import Pets

class Register_pets(models.Model):
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, blank=False, null=False)
    pet = models.ForeignKey(Pets, on_delete=models.CASCADE, blank=False, null=False)
    date_of_registration = models.DateField()
