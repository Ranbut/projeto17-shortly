# projeto17-shortly
Back-end do projeto n° 16 do curso de desenvolvimento fullstack da Driven 

# 📑 Descrição

- Vamos ser francos: passar uma URL gigante de um meme, vídeo ou qualquer outra coisa na internet para um(a) amigo(a) é uma situação embaraçosa. Tudo piora quando a pessoa que recebe o link não tem como abri-lo diretamente e é obrigada a escrever o link caractere por caractere.
- Para evitar este tipo de situação e de quebra conseguir monitorar os acessos a este link, surgiram os encurtadores de URL (aqui no curso mesmo já utilizamos o [bit.ly](http://bit.ly) várias vezes).
- Agora, imagine que você é a mais nova pessoa da desenvolvedora web Full Stack na empresa ENCURTADORES CORP e precisa ajudar a equipe que está defasada.
- O *designer* do time montou um Figma para o projeto e o profissional *front-end* começou a desenvolvê-lo. No entanto, olhem só como a vida é engraçada: o *designer*, o QA, o dev *front-end* e a dev *back-end* fizeram um bolão, jogaram na loteria e ganharam uns 3 milhões cada. Não deu outra, saíram da empresa no dia seguinte e deixaram o gerente na mão.
- *“Oh, e agora, quem poderá defendê-lo de uma falência?”* - **VOCÊ!** ❤️

Agora é contigo!

Neste projeto você deve implementar o *back-end,* modelar e criar o banco de dados (relacional) de um sistema encurtador de URLs chamado **Shortly**: Links que cabem no bolso!

## ⏰ Driven time

- Nomeie a pasta do seu projeto com: `projeto17-shortly`

## 🗒️ Documentação da API

### Autenticação

Todas as rotas autenticadas devem receber um *header* `Authorization` no formato `Bearer TOKEN`. **Nem todas as rotas são autenticadas.**

### Rotas

- **POST** `/signup`
    - Esta **não é** uma rota autenticada.
    - Deve receber um corpo (*body*) no formato:
        
        ```jsx
        {
        	name: "João",
          email: "joao@driven.com.br",
          password: "driven",
          confirmPassword: "driven"
        }
        ```
        
    - Deve responder com *status code* `201`.
    - Caso exista algum erro no formato do corpo enviado, responder com *status code* `422` e os erros correspondentes.
    - Caso exista algum usuário cadastrado com o e-mail enviado no corpo da requisição, responder com *status code* `409`.
- **POST** `/signin`
    - Esta **não é** uma rota autenticada.
    - Deve receber um corpo (*body*) no formato:
        
        ```jsx
        {
          email: "joao@driven.com.br",
          password: "driven"
        }
        ```
        
    - Deve retornar o *status code* `200` com o *token* gerado para autenticação.
    - Caso o usuário/senha não seja compatível (ou não exista), retornar o *status code* `401`.
    - Caso exista algum erro no formato do corpo enviado, responder com *status code* `422` e os erros correspondentes.
- **POST** `/urls/shorten`
    - Esta é uma **rota autenticada.**
    - Deve receber um *header* `Authorization` no formato `Bearer TOKEN`.
    - Deve receber um corpo (*body*) no formato:
        
        ```json
        {
        	"url": "https://..."
        }
        ```
        
    - Deve responder com *status code* `201` e corpo (*body*) no formato:
        
        ```json
        {
        	"shortUrl": "a8745bcf" // aqui o identificador que for gerado
        }
        ```
        
    - Caso o *header* não seja enviado ou seja inválido, responder com *status code* `401`.
    - Caso exista algum erro no formato do corpo enviado, responder com *status code* `422` e os erros correspondentes.
    - Dica: Use a biblioteca **[nanoid](https://www.npmjs.com/package/nanoid)** para gerar as `shortUrl`.
- **GET** `/urls/:id`
    - Esta **não é** uma rota autenticada.
    - Deve responder com *status code* `200` e corpo (*body*) no formato:
        
        ```json
        {
        	"id": 1,
        	"shortUrl": "bd8235a0",
        	"url": "https://..."
        }
        ```
        
    - Caso a url encurtada não exista, responder com *status code* `404`.
- **GET** `/urls/open/:shortUrl`
    - Esta **não é** uma rota autenticada.
    - Redirecionar o usuário para o link correspondente.
    - Aumentar um na contagem de visitas do link.
    - Caso a url encurtada não exista, responder com *status code* `404`.
    - Dica: Procure por **res.redirect**.
- **DELETE** `/urls/:id`
    - Esta é uma **rota autenticada.**
    - Deve receber um *header* `Authorization` no formato `Bearer TOKEN`.
    - Caso o *header* não seja enviado ou seja inválido, responder com *status code* `401`.
    - Deve responder com *status code* `401` quando a url encurtada não pertencer ao usuário.
    - Se a url for do usuário, deve responder com *status code* `204` e excluir a url encurtada.
    - Caso a url encurtada não exista, responder com *status code* `404`.
- **GET** `/users/me`
    - Esta é uma **rota autenticada.**
    - Deve receber um *header* `Authorization` no formato `Bearer TOKEN`.
    - A rota deve retornar os dados do usuário atrelado ao token.
    - Deve responder com *status code* `200` e corpo (*body*) no formato:
        
        ```json
        {
          "id": id do usuário,
        	"name": nome do usuário,
        	"visitCount": soma da quantidade de visitas de todos os links do usuário,
        	"shortenedUrls": [
        		{
        			"id": 1,
        			"shortUrl": "...",
        			"url": "...",
        			"visitCount": soma da quantidade de visitas do link
        		},
        		{
        			"id": 2,
        			"shortUrl": "...",
        			"url": "...",
        			"visitCount": soma da quantidade de visitas do link
        		}
        	]
        }
        ```
        
    - Caso o *header* não seja enviado ou seja inválido, responder com *status code* `401`.
    - Caso o usuário não exista, responder com *status code* `404`.
- **GET** `/ranking`
    - Esta **não é** uma rota autenticada.
    - Deve responder com *status code* `200` e corpo (*body*) no formato:
        
        ```json
        [
        	{
        		"id": id do usuário,
        		"name": nome do usuário,
        		"linksCount": 5,
        		"visitCount": 100000
        	},
        	{
        		"id": id do usuário,
        		"name": nome do usuário,
        		"linksCount": 3,
        		"visitCount": 85453
        	},
        	{
        		"id": id do usuário,
        		"name": nome do usuário,
        		"linksCount": 10,
        		"visitCount": 0
        	},
        	{
        		"id": id do usuário,
        		"name": nome do usuário,
        		"linksCount": 0,
        		"visitCount": 0
        	}
        ]
        ```
        
    - Limitado a **10 usuários.**
    - Esta lista deve ser **ordenada** pela soma de visitas de seus links.
    - Deve aparecer inclusive usuários cujos *links* não tiveram nenhuma visita, caso necessário.

## 🪟 Layout (Não é para fazer front é só base)

- Abaixo segue o layout desenvolvido para a tela principal *(use-o para entender o funcionamento da aplicação e modelar o banco de dados)*.
    
    [https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?node-id=0%3A1](https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?node-id=0%3A1)
    

## ✅ Requisitos

- Geral
    - [ ]  Seu projeto deverá ser desenvolvido utilizando Git e GitHub.
    - [ ]  **A cada requisito implementado** faça um *commit* com uma mensagem descritiva do que você evoluiu. Caso queira dividir um requisito em vários *commits*, não há problema. Mas evite colocar mais de um requisito no mesmo *commit.*
    - [ ]  **Abuse do SQL!** Faça o mínimo possível de processamento no navegador.
- Rotas
    - [ ]  Implemente as rotas descritas na documentação da API :)
    - *Dica: Para a última rota `/ranking`, você precisa usar `left join`.*
- Banco de dados
    - [ ]  Utilize o banco de dados Postgres.
    - [ ]  Modele o banco de dados de acordo com a necessidade.
    - [ ]  Use CONSTRAINTS quando aplicável para garantir a lógica de negócio da aplicação.
    - [ ]  Use um campo chamado `createdAt` para armazenar a data de criação das entidades.
- Dump do banco de dados
    - [ ]  **ATENÇÃO:** É **obrigatório** fazer o **dump do banco de dados e colocá-lo dentro da pasta raiz do projeto**. O arquivo gerado deve ter o nome `dump.sql`.
    - Se tiver dúvidas sobre como gerar o dump, consulte seu tutor.
- *Back-end*
    - [ ]  Implemente o *back-end* da aplicação em **Node + Express** seguindo a arquitetura de *routes*, *controllers* e *middlewares*.
    - [ ]  Dados sensíveis (como senhas) devem estar criptografados.
    - [ ]  Proteja sua aplicação contra ataques do tipo *SQL Injection*.
    - [ ]  Em paralelo ao seu arquivo `.env`, crie também na raiz do projeto um arquivo chamado `.env.example` com a estrutura contida no arquivo `.env` original (com os dados vazios).
        
        Modelo:
        
        ```bash
        PORT=
        DATABASE_URL=
        ```
        
    - [ ]  Defina no arquivo `package.json` os scripts de inicialização da API, informe que deseja trabalhar com modules na aplicação e confira se as dependências estão devidamente instaladas no projeto.
- QA (*quality assurance*)
    - Teste os “casos felizes” (em que tudo dá certo) e os “casos reais” (em que erros podem acontecer), lembre-se que o usuário é uma persona imprevisível.
    - Certifique-se de que as respostas da API correspondem ao que está em sua documentação.
- *Deploy* do *back-end*
    - [ ]  Faça *deploy* do *back-end no Render e do banco de dados no Render ou ElephantSQL*.

## ☑️ Bônus

- *Repository Pattern*
    - [ ]  Procure por *Repository Pattern* e aplique-o para gerenciar os acessos ao banco de dados.
- Validação de *Schemas*
    - [ ]  Crie um *middleware* genérico que consiga lidar com os schemas da aplicação.
- *Front-end*
    - [ ]  Desenvolva o *front-end* da aplicação usando as tecnologias React + *styled components*.
    - [ ]  Faça o deploy da aplicação na Vercel.
    - Você precisará criar outras rotas para criar o fluxo completo ;)
