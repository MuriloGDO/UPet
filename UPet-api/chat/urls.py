from django.urls import path
from .views import Message_history, Chat_create, Chat_rooms

urlpatterns = [
    path('history/<str:room_name>/', Message_history.as_view(), name='message-history'),
    path('create/', Chat_create.as_view(), name='chat-create'),
    path('chat_rooms/', Chat_rooms.as_view(), name='list_chat_rooms'),
]