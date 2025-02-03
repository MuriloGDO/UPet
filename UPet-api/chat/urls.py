from django.urls import path
from .views import Message_history

urlpatterns = [
    path('history/<str:room_name>/', Message_history.as_view(), name='message-history'),
]