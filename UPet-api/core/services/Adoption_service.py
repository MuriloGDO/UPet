from datetime import datetime
from ..models.Adoption import Adoption

class Adoption_service:
    @staticmethod
    def get_adopted_pets_by_user(user_id):
        """Retorna os pets adotados por um usuário específico."""
        try:
            adopted_pets = Adoption.objects.filter(user_id=user_id).select_related('pet')

            if not adopted_pets.exists():
                return {"message": "Nenhum pet adotado por este usuário."}

            return [
                {
                    "id": adoption.pet.id,
                    "name": adoption.pet.name,
                    "species": adoption.pet.species,
                    "date_of_birth": adoption.pet.date_of_birth.strftime("%d/%m/%Y") if adoption.pet.date_of_birth else None,
                    "date_of_adoption": adoption.date_of_adoption.strftime("%d/%m/%Y"),
                }
                for adoption in adopted_pets
            ]
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def get_adopted_pets_by_institution(institution_id):
        """Retorna os pets adotados que pertenciam a uma instituição específica."""
        try:
            # 🔥 Consulta correta: Busca diretamente pelo campo `institution` em `Adoption`
            adopted_pets = Adoption.objects.filter(institution_id=institution_id).select_related('pet')

            if not adopted_pets.exists():
                return {"message": "Nenhum pet foi adotado desta instituição."}

            return [
                {
                    "id": adoption.pet.id,
                    "name": adoption.pet.name,
                    "species": adoption.pet.species,
                    "date_of_birth": adoption.pet.date_of_birth.strftime("%d/%m/%Y") if adoption.pet.date_of_birth else None,
                    "date_of_adoption": adoption.date_of_adoption.strftime("%d/%m/%Y"),
                }
                for adoption in adopted_pets
            ]
        except Exception as e:
            return {"error": str(e)}
