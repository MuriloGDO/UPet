from django.db import models

class Chat_room(models.Model):
    name = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey("core.Users", on_delete=models.CASCADE, null=False)
    institution = models.ForeignKey("core.Institution", on_delete=models.CASCADE, null=False)
    pet = models.ForeignKey("core.Pets", on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.name