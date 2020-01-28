# Rocketshoes

Aplicação Front-End responsiva para um e-commerce de venda de tênis. Feita com ReactJS, Redux e Redux Saga. A aplicação consome uma REST API fake e permite criar, listar, atualizar ou remover itens (CRUD) ao carrinho de compras.

Passo a passo documentado em: https://github.com/cafecomlucas/Rocketshoes/blob/master/_steps.md

![Demonstração - Busca na API, demonstra o CRUD e testa responsividade](.github/reactjs_ecommerce_crud_redux_saga_rocketshoes.gif)

---

## Como iniciar

### Versão online

Acesse o endereço [rocketshoesapp.herokuapp.com](https://rocketshoesapp.herokuapp.com/)

### Localmente

Clone o repositório, acesse o diretório, instale as dependências e inicie a REST API:

```bash
git clone https://github.com/cafecomlucas/Rocketshoes.git
cd Rocketshoes
yarn
json-server server.json -p 3333 -d 400
```

Em outro terminal, inicie a aplicação:

```bash
yarn dev
```

---

## Funcionalidades

- Configuração do padrão de código (com EditorConfig, ESLint e Prettier);
- Configuração do debugger externo Reactotron (com o plugin do Redux Saga);
- Roteamento no Front-End através do React Router DOM;
- Configuração das rotas `/` e `/cart`;
- Responsividade e utilização do Flexbox;
- Configuração do Back-end que serve uma REST API (fake);
- Busca de dados na API através de requisições assíncronas;
- Listagem de produtos no componente `Home` (rota `/`), com imagem e título em cada um;
- Utilização de ACTIONS/REDUCERS do Redux para adicionar ou modificar o estado global;
- Adição de produtos ao estado global carrinho através no componente `Home`;
- Exibição da quantidade total de produtos do carrinho no cabeçalho;
- Exibição da quantidade individual em cada produto no componente `Home`;
- Listagem de produtos do carrinho no componente `Cart` (rota `/cart`), com imagem, descrição, quantidade, subtotal em cada um;
- Utilização do Redux Saga para fazer chamada a API para buscar mais detalhes do produto antes de adicioná-lo ao carrinho;
- Utilização do Redux Saga para checar estoque antes de adicionar produto ao carrinho;
- Utilização do Redux Saga para feedback ao usuário mostrando ícones e alterando estilizações quando a aplicação estiver carregando;
- Exibição de mensagem de erro ao constatar que não existem mais produtos disponíveis no estoque após busca na API.
