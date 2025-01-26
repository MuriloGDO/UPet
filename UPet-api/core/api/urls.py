from rest_framework import routers
from .views import Users_view_set, Clusters_view_set, Intitution_view_set, Users_register, Login_view, Login_view_set, Users_delete, Users_update, Users_information, Pets_register, Institution_delete, Institution_update, Pets_update, Institution_register, Users_search_pets, Institution_information, Institution_search_by_filters, Pets_delete, Institution_count_pets
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'users_model', Users_view_set)
router.register(r'clusters_model', Clusters_view_set)
router.register(r'login_model', Login_view_set)
router.register(r'intitution_model', Intitution_view_set)

urlpatterns = [
    path('', include(router.urls)),
    path('user_register/', Users_register.as_view(), name='user-register'),
    path('user_delete/', Users_delete.as_view(), name='user-delete'),
    path('user_update/', Users_update.as_view(), name='user-update'),
    path('user_information/', Users_information.as_view(), name='user-information'),
    path('user_search_pet', Users_search_pets.as_view(), name='user-search-pet'),
    path('login/', Login_view.as_view(), name='login'),
    path('pet_register/', Pets_register.as_view(), name='pet-register'),
    path('institution_delete/', Institution_delete.as_view(), name='institution-delete'),
    path('institution_update/', Institution_update.as_view(), name='Institution-update'),
    path('pet_update/', Pets_update.as_view(), name='pet-update'),
    path('pet_delete/', Pets_delete.as_view(), name='pet-delete'),
    path('pet_delete/', Pets_delete.as_view(), name='pet-delete'),
    path('institution_register/', Institution_register.as_view(), name='institution-register'),
    path('institution_information/', Institution_information.as_view(), name='institution-information'),
    path('institution_search_by_filters/', Institution_search_by_filters.as_view(), name='institution-search-by-filters'),
    path('institution_count_pets/', Institution_count_pets.as_view(), name='Institution-count-pets'),
]