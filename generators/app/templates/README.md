## Bem vindo

Aplicação MongoDB + ExpressJs + Angular2 + Node.JS

## SOBRE

Esta aplicação está composta por dois projetos. 
O primeiro, localizado na raiz, corresponde a aplicação servidora, fornecendo os Endpoints REST, já configurado para com CORS habilitado.

O segundo  projeto encontra-se na pasta `./client` e contem o Fontend da aplicação.

## REQUERIMENTOS

`node -v` v6.10.2 
`npm install -g @angular/cli gulp` 

## INSTALAÇÃO 

Execute `npm install` na raiz do projeto para que todas as dependencias sejam instaladas. 
Este comando tambem irá instalar as dependencias do Frontend. (client).

## EXECUTANDO

Execute `gulp build` na raiz do projeto para construir a aplicação servidora. Este comando irá criar o diretorio `./dist`. 
Para iniciar o servidor execute o arquivo `server.js`.

    Observação: A aplicação servidor utiliza o dotenv para configuração de conexão com o banco. Observe a existencia do arquivo .env na pasta ./dist
    
Para inciar o Fontend em modo de desenvolvimento acesse o diretorio `./client` e execute o comando `ng serve`. Este comando faz parte do angular-cli.


## BUILD PARA PRODUÇÃO

Para construir a versão de produção deste projeto, execute o comando `npm run build` na raiz do projeto. Este comando irá construir a aplicação servidora e Frontend para produção.
Os arquivos serão disponibilizados no diretorio `./dist`
