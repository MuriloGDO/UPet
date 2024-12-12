from ..models import Users

class User:
    def __init__(self, id, name, telephone, email, date_of_birth, address, cpf, photo, description, cluster, password):
        self.id = id
        self.name = name
        self.telephone = telephone
        self.email = email
        self.date_of_birth = date_of_birth
        self.address = address
        self.cpf = cpf
        self.photo = photo
        self.description = description
        self.cluster = cluster
        self.password = password

    def delete(self):
        Users.objects.get(id = self.id).delete()
        
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "telephone": self.telephone,
            "email": self.email,
            "date_of_birth": self.date_of_birth,
            "address": self.address,
            "cpf": self.cpf,
            "photo": self.photo,
            "description": self.description,
            "cluster": [c.id for c in self.cluster.all()] if self.cluster else None
        }

        
        