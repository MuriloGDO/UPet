from django.db import models
from .Users import Users
from .Pets import Pets
from .Institution import Institution

class Adoption(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, blank=False, null=False)
    pet = models.ForeignKey(Pets, on_delete=models.CASCADE, blank=False, null=False)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, blank=False, null=False)
    date_of_adoption = models.DateField()