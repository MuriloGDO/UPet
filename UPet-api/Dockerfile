FROM python:3.10

WORKDIR /app

# Copia os arquivos para dentro do contêiner
COPY . /app

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["python", "manage.py", "runserver"]
