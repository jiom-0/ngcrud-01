# Client

## Instalação

Clone o repositório com:
`git clone https://github.com/jiom-0/ngcrud-01.git`

Acesse a pasta do projeot
`cd ngcrud-01`

Execute `npm start` para iniciar em modo de desenvolvedor.

A aplicação está disponível em:
`http://localhost:4200`

## Troubleshouting
Caso não tenha o npm instalado na sua máquisa acesse:
`https://nodejs.org/en`

E siga as instruções para instação do ambiente de execução.

## Docker
Para executar em um conteiner a Dockerfile está disponível.
`docker build -t ngcrud .`

Criada a imagem basta suba o container:
`docker run -p 80:80 --name ngcrud ngcrud`

Neste caso a aplicação está disponível em:
`http://localhost:80`