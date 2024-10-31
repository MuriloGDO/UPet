from django.db import models
from django.core.exceptions import ValidationError
from .Institution import Institution
from .Pets import Pets

class Register(models.Model):
    institution_id = models.ForeignKey(Institution, on_delete=models.CASCADE, blank=False)
    pet_id = models.ForeignKey(Pets, on_delete=models.CASCADE, blank=False)
    date_of_registration = models.DateField()
