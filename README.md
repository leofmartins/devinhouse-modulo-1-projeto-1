
# DEVinKnowledge
Projeto avaliativo 1 do Módulo 1 do DEVin[House] turma Philips

 1. [Intrução](here)
 2. [Características](here)
 3. [Como visualizar o projeto](here)

## Introdução
Esse projeto foi desenvolvido como tarefa avaliação do Módulo 1 do DEVinHouse turma Philips. O ojetivo foi exercitar e aplicar os conhecimentos de HTML, CSS e JavaScript.

## Características
O projeto consistia em construir um *website* para uma empresa fictíticia com o objetivo de reunir dicas sobre linguagens e skills para que novos empregados tenham, em um único local, informações para melhorar sua integração.
Para incluir das dicas, o site deveria possuir um formulário, com diversos tipos de input e validações. As dicas deveriam ser apresentadas em uma lista de cards, com possibilidade de filtro por título, edição e exclusão da dica.
O site também deveria ter um grid de informações, com os totais de dicas por categorias e o total de dicas.
Um dos requisitos foi que deveria haver persistência de dados, ou seja, as dicas deveriam estar disponíveis caso o site fosse fechado e reaberto.
Para ter uma descrição completa dos requisitos e comportamentos da aplicação, leia o [documento do projeto](https://docs.google.com/document/d/1yJ8oHg1D5aGI8BOc3kRzrJcQBtMOTImaFSyMYkVxm1I/).

## Como visualizar o projeto
Para rodar o projeto, faça o clone (`git clone`) do repositório para o seu PC/Mac e abra-o em uma IDE ou edidor de código de sua preferência. Você vai precisar de um servidor web. Sugerimos o [LiveServer,](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) caso utilize Visual Studo Code. Uma IDE como o WebStorm já provê um servidor nativo.
Esta implementação do projeto faz um do LocalStorage para armezenar os dados. No carregamento da página, ele faz a leitura do LocalStorage e procura pela chave listaDicas. Provavelmente, não haverá essa chave no seu navegador. A aplicação web irá criar uma chave listaDicas com Value [] (uma array vazia) carregar com valores zerados. A forma de armazenamento dos dados é um objeto JSON.
