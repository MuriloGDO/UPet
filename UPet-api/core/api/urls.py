from rest_framework import routers
from .views import Users_view_set, Clusters_view_set, Users_register, Login_view
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'usuarios', Users_view_set)
router.register(r'clusters', Clusters_view_set)

urlpatterns = [
    path('', include(router.urls)),
    path('usuario_register/', Users_register.as_view(), name='usuarios-register'),
    path('login/', Login_view.as_view(), name='login'),
]
