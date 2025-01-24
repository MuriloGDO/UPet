from ..models import Institution

class Institutions:
    def __init__(self, id, cnpj, name, telephone, address, email, password):
        self.id = id
        self.cnpj = cnpj
        self.name = name
        self.telephone = telephone
        self.address = address
        self.email = email
        self.password = password

    def delete(self):
        Institution.objects.get(id = self.id).delete()

    def to_json(self):
        return {
            "id": self.id,
            "cnpj": self.cnpj,
            "name": self.name,
            "telephone": self.telephone,
            "email": self.email,
            "address": self.address
        }