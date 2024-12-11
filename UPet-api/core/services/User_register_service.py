from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import ValidationError
from ..api.serializers import Users_model_serializer, Login_model_serializer
from ..exceptions import Rollback_exception, User_creation_exception
from ..maritalkapi import Maritalk

class User_register_service:
    @classmethod
    def create_user(cls, user_data):
        if not user_data.get('password') or user_data.get('password').strip() == "":
            raise User_creation_exception("A senha não pode ser vazia.")
        
        
        
        user_data['password'] = make_password(user_data.get('password'))
        clusters_response = Maritalk.Maritalk.get_response(user_data.get('description'))
        formatted_cluster_response = cls.formatt_maritalk_information(clusters_response)
        user_data['cluster'] = formatted_cluster_response
        user_serializer = Users_model_serializer(data=user_data)

        if not user_serializer.is_valid():
            print(user_serializer.errors)
            raise User_creation_exception(user_serializer.errors)

        user = user_serializer.save()
        return user, user_serializer
    
    @staticmethod
    def formatt_maritalk_information(cluster_response):
        final_response = []
        cluster_response_without_spacebars = cluster_response.strip(' ')
        formatted_cluster_response = cluster_response_without_spacebars.split(',')
        for n in formatted_cluster_response:
            final_response.append(int(n))
        return final_response

    @staticmethod
    def create_login(user, email, password):
        try:
            login_data = {
                'user': user.id,
                'institution': None,
                'email': email,
                'password': password
            }
            login_serializer = Login_model_serializer(data=login_data)
            
            if login_serializer.is_valid():
                login_serializer.save()
            else:
                raise Rollback_exception(str(e))
        except Exception as e:
            raise Rollback_exception(str(e))

    @staticmethod
    def rollback_user(user):
        user.delete()