from dotenv import load_dotenv
import os
import openai

load_dotenv()
# Configura a chave da API
openai.api_key = os.getenv('MARITALK_KEY')
openai.api_base = "https://chat.maritaca.ai/api"


class Maritalk:
# Função para gerar resposta
    def get_response(description):
        # Pergunta
        question = \
        """Estou fazendo uma segmentação de seres humanos para uma adoção de pets, que levam em consideração três informações, tempo disponível do dono, espaço disponível para o pet na moradia e se o dono já possui outros pets no local. Dessa forma, foram definidos os seguintes clusters:

        1° Cluster:
        - Agressivo com pessoas, bom para segurança

        2° Cluster:
        - Amigável com pessoas

        3° Cluster:
        - Precisa de muito espaço no ambiente

        4° Cluster:
        - Territorialista com outros pets

        5° Cluster:
        - Sociável com outros pets

        6° Cluster:
        - Agitado

        7° Cluster:
        - Quieto

        8° Cluster:
        - Barulhento

        9° Cluster:
        - Apenas pets machos

        10° Cluster:
        - Apenas pets fêmeas

        Me dê uma resposta com apenas números, separados por vírgula, de 1 a 10 com os clusters que mais relacionam com a seguinte descrição:

        """

        complete_question = question+description
        response = openai.ChatCompletion.create(
            model="sabia-3",  
            messages=[
                {"role": "user", "content": complete_question}
            ]
        )
        return response['choices'][0]['message']['content']