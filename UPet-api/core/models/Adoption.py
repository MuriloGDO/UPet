from django.db import models
from django.core.exceptions import ValidationError
from .Users import Users
from .Pets import Pets

class Adoption(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE, blank=False)
    pet_id = models.ForeignKey(Pets, on_delete=models.CASCADE, blank=False)
    date_of_adoption = models.DateField()
