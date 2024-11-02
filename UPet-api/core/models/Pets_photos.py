from django.db import models
from ..models import Pets

class Pets_photos(models.Model):
    pet = models.ForeignKey(Pets, related_name='photos', on_delete=models.CASCADE)
    photo = models.TextField() 
    uploaded_at = models.DateTimeField(auto_now_add=True)