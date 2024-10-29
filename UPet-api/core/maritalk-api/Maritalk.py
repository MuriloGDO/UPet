from dotenv import load_dotenv
import os
import openai

load_dotenv()
# Configura a chave da API
openai.api_key = os.getenv('MARITALK_KEY')
openai.api_base = "https://chat.maritaca.ai/api"

# Função para gerar resposta
def gerar_resposta(pergunta):
    response = openai.ChatCompletion.create(
        model="sabia-3",  
        messages=[
            {"role": "user", "content": pergunta}
        ]
    )
    return response['choices'][0]['message']['content']

# Pergunta
pergunta = "Insira sua pergunta aqui"
resposta = gerar_resposta(pergunta)

# Exibe a resposta
print(resposta)