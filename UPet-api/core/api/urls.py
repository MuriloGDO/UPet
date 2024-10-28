from rest_framework import routers
from .views import Users_view_set, Clusters_view_set, Users_register, Login_view, Login_view_set
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'users_model', Users_view_set)
router.register(r'clusters_model', Clusters_view_set)
router.register(r'login_model', Login_view_set)

urlpatterns = [
    path('', include(router.urls)),
    path('user_register/', Users_register.as_view(), name='user-register'),
    path('login/', Login_view.as_view(), name='login'),
]
