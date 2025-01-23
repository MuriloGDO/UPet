from django.db import models

class Message(models.Model):
    user = models.ForeignKey("core.Users", on_delete=models.CASCADE)
    room = models.ForeignKey("chat.Chat_room", on_delete=models.CASCADE, related_name="messages")
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user}: {self.content}"