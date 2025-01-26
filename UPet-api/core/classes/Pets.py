from ..models import Pets

class Pets:
    def __init__(self, id, name, date_of_birth, species, description, status):
        self.id = id
        self.name = name
        self.date_of_birth = date_of_birth
        self.species = species
        self.description = description
        self.status = status

    def delete(self):
        Pets.objects.get(id = self.id).delete()

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "date_of_birth": self.date_of_birth,
            "species": self.species,
            "description": self.description,
            "status": self.status
        }