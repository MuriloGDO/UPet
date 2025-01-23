from django.urls import re_path
from chat.consumers import Chat_consumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', Chat_consumer.as_asgi()),
]