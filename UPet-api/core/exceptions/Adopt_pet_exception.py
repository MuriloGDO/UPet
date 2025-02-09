class Adopt_pet_exception(Exception):
    def __init__(self, errors):
        self.errors = errors