class Rollback_exception(Exception):
    """
    Exceção personalizada para indicar que um rollback ocorreu.
    """
    def __init__(self, message="Rollback occurred during user creation"):
        self.message = message
        super().__init__(self.message)