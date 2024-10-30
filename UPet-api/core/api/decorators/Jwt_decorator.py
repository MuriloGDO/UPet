from rest_framework.exceptions import AuthenticationFailed
import jwt
from functools import wraps
from models.Users import Users

def jwt_required(view_func):
    @wraps(view_func)
    def wrapped_view(request, *args, **kwargs):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Não autenticado.')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = Users.objects.get(id=payload['id'])
            request.user = user

        except (jwt.ExpiredSignatureError, jwt.DecodeError, Users.DoesNotExist):
            raise AuthenticationFailed('Sessão inválida ou expirada.')

        return view_func(request, *args, **kwargs)
    return wrapped_view