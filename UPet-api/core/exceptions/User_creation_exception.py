class User_creation_exception(Exception):
    """
    Exceção personalizada para indicar que um erro na criação ocorreu.
    """
    def __init__(self, errors):
        self.errors = errors