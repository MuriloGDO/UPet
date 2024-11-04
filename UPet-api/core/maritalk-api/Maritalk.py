from dotenv import load_dotenv
import os
import openai

load_dotenv()
# Configura a chave da API
openai.api_key = os.getenv('MARITALK_KEY')
openai.api_base = "https://chat.maritaca.ai/api"


class Maritalk:
# Função para gerar resposta
    def get_response(question):
        response = openai.ChatCompletion.create(
            model="sabia-3",  
            messages=[
                {"role": "user", "content": question}
            ]
        )
        return response['choices'][0]['message']['content']

# Pergunta
question = "Insira sua pergunta aqui"
answer = Maritalk.get_response(question)

# Exibe a resposta
print(answer)