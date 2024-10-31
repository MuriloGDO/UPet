# UPet
Repositório para o projeto de Engenharia de Software

### Instalação e Execução backend
1. Clone o repositório:

``` bash
    git clone https://github.com/MuriloGDO/UPet.git
    cd UPet
```
2. Criar e ativar um ambiente virtual (utilizando git bash):

```bash
    python -m venv env
    source env/Scripts/activate
```

3. Instalar as dependências:

```bash
    pip install -r requirements.txt
```

4. Iniciar o servidor:

```bash
    cd UPet/
    python manage.py runserver
```

5. Acesse a aplicação no navegador:

Abra http://localhost:8000.

### Instalação e Execução frontend

1. Entre na pasta UPet-gui.

2. Rode o comando.
```bash
npm install
```

3. Após a instalaçao das dependencias, rode o comando e escolha qual dispositivo rodar a applicaçao.
```bash
npx expo start
```
### Utilizaçao do banco de dados de desenvolvimento(dev_database.yml)

1. Certifique-se que o docker ou docker desktop está instalado e configurado no seu pc.

2. Crie a imagem e o container do banco de dados no seu terminal rodando o comando dentro da pasta UPet-api 

```bash
    docker compose -f dev_database.yml up -d
```

3. Após concluir o build, é possível verificar o container com o comando docker ps -a

4. Caso o container nao esteja "up" suba ele com 

```bash
    docker start {id do container}
```

5. Prepare o .env do backend com as variaveis do banco de desenvolvimento:

```bash
    DB_NAME='postgres'
    DB_USER='upet_dev'
    DB_PASSWORD='upet'
    DB_HOST='localhost'
    DB_PORT='5432'
```

6. Após isso, aplique as migraçoes para o banco e use-o através do django.

7. Para parar o container, apenas rode:

```bash
    docker stop {id container}
```
8. Sempre que quiser, voce pode rodar o banco novamente com seus dados e migraçoes já aplicadas rodando:

```bash
    docker start {id do container}
```
