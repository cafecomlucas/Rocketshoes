## Estrutura inicial | Removendo itens e configurando padrão de código

Após criar o projeto com `yarn create react-app <nome_da_pasta>` removemos linhas de código e arquivos desnecessários para essa aplicação.

Também foi configurado o padrão de código com ESLint (integrado ao Babel), Prettier e EditorConfig.

---

## Configurando roteamento

Para criar a navegação, instalamos o React Router DOM:

```
yarn add react-router-dom
```

A pasta `pages` foi criada com os componentes `Cart` e `Home`.

Na pasta `src` criamos o arquivo `routes.js` importando os novos componentes para configurar as rotas.

Ainda em `routes.js`, utilizamos os componentes do React Router DOM para configuração das rotas. Utilizamos o componente `Switch` para garantir que apenas uma rota é carregada por vez e o componente `Route` para associar cada rota com uma URL específica.

O `BrowserRouter`, componente que permite utilizar a navegação através da URL do browser, foi configurado no `App.js` ao invés do `routes.js`, já que, além do conteúdo da navegação, também existirá o conteúdo do cabeçalho (componente `Header`) que será fixo entre as páginas e precisará ter acesso as propriedades da navegação (por isso necessita estar dentro do componente `BrowserRouter`).

---

## Instalação do Styled Components e criação da estilização global

Para trabalhar com o CSS com recursos adicionais, utilizamos o Styled Components:

```
yarn add styled-components
```

Criamos o arquivo `src/styles/global.js`, importamos a fonte [Roboto do Google Fonts][https://fonts.google.com/specimen/roboto?selection.family=roboto] no começo do CSS e definimos as estilizações globais. Também utilizamos uma imagem SVG (pasta `assets`) como fundo de toda a aplicação.

Incluímos a estilização global no `App.js`.

---

## Criando o componente de cabeçalho com a estrutura de elementos e a estilização

Instalamos o React Icons para utilização de um ícone de carrinho do Material Design.

```
yarn add react-icons
```

Criamos a pasta `components` para guardar qualquer tipo de componente que não é uma página inteira.

Dentro da pasta `components` criamos o componente `Header` em `Header/index.js` com a estrutura de elementos, links, importação do logo e importação do ícone de carrinho. Em `Header/styles.js` criamos os componentes estilizados que são importados e aplicados na estrutura.

Incluímos o componente `Header` no `App.js`.

---

## Home | Criando a estrutura de elementos e a estilização

Criamos a estrutura da `Home` no arquivo `index.js`, onde definimos a imagem do produto (copiada do site da Netshoes), o título, o preço e um botão para adicionar itens ao carrinho (com um ícone do Material Design). Por enquanto todos os dados exibidos são estáticos.

Criamos também a estilização da `Home` no arquivo `styles.js`, onde definimos o layout principal com utilização de grid, além de definir a responsividade através de media queries (essa parte não estava nos requisitos iniciais e foi feita como um extra). Para estilizar o botão de adicionar ao carrinho no evento `:hover`, adicionamos a biblioteca `polished` (`yarn add polished`) e utilizamos o método `darken` para escurecer o botão.

---

## Cart | Criando a estrutura de elementos e a estilização

Criamos a estrutura do componente `Cart` no arquivo `index.js`, onde definimos uma tabela com a imagem do produto (copiada do site da Netshoes), o título, o preço, a quantidade, o subtotal, botões para adicionar ou remover a quantidade de um produto e um botão para remover um produto (com ícones do Material Design). No rodapé definimos o valor total da compra e um botão para finalizar o pedido. Por enquanto todos os dados exibidos são estáticos.

Criamos também a estilização do componente `Cart` no arquivo `styles.js`, onde definimos a estilização da tabela e do rodapé, além de definir a responsividade através de media queries (essa parte não estava nos requisitos iniciais e foi feita como um extra).

---

## Configuração do Back-end que serve uma REST API (fake)

É possível utilizar um Back-end que serve uma REST API fake enquanto não temos acesso a API real, dessa maneira, quando a migração pra API real acontecer poucas modificações serão necessárias.

Utilizamos a biblioteca [json-server](https://github.com/typicode/json-server), que após ser instalada globalmente, permite servir uma REST API informando apenas um arquivo JSON com os dados a serem servidos.

```bash
yarn global add json-server
```

(`yarn add json-server -D` para instalação local)

Baixamos o arquivo `server.json` com os dados da aplicação (produtos na "tabela" `products`, quantidade em estoque na "tabela" `stock`) e em um novo terminal inicializamos o servidor da REST API na porta 3333 (já que a porta 3000 já está sendo utilizada pela aplicação Front-End):

```bash
json-server server.json -p 3333
```

(`yarn json-server ...` no caso de módulo local)

(a opção `-w` pode ser incluída para observar alterações nos arquivos e reinicializar o servidor quando necessário)

Após inicialização, as rotas [localhost:3333/products](http://localhost:3333/products) e [localhost:3333/stock](http://localhost:3333/stock) já funcionam ao acessá-los pelo browser.

Com essa biblioteca é possível realizar qualquer operação (Create, Read, Update, Delete) como se fosse realmente uma API real. É recomendada apenas para no ambiente de desenvolvimento.

---

## Instalação do Axios para buscar dados na REST API

Instalamos o serviço `axios` para poder buscar os dados da API configurada:

```bash
yarn add axios
```

Definimos as configurações do serviço no arquivo `services/api`.

---

## Home | Buscando dados na API e atualizando estrutura

Modificamos o componente `Home` declarando-o como classe ao invés de função para utilizarmos o estado e os métodos do ciclo de vida do componente.

Criamos a propriedade do estado `products` para guardar todos os produtos. Criamos também o método `componentDidMount` para preencher essa nova propriedade com os dados recebidos da API.

Também foi necessário formatar o preço de cada produto de acordo com a localização, para isso criamos a pasta `src/util` (por organização, para que os arquivos criados nela possam ser utilizados em qualquer parte da aplicação), e nela criamos o arquivo `format.js`. No arquivo utilizamos a classe nativa de intercionalização do JavaScript para formatar números do tipo preço e exportamos a função `format` renomeada para `formatPrice`.

Modificamos o componente `Home` para importar a função `formatPrice` e utilizamos na criação de um novo campo com o preço formatado. A formatação do campo foi feita logo após busca dos dados da API ao invés de ser feita dentro do método `render`, pois assim formatamos os dados apenas uma vez (ao carregar o componente) ao invés de várias vezes (ao renderizar cada `<li>`) - quando possível é sempre recomendável fazer qualquer tipo de formatação apenas uma vez e fora do método `render` por questões de performance.

Por enquanto, a quantidade de itens no carrinho permanece estática.

---

## Arquitetura Flux com o Redux - Documentação dos conceitos

### O que é Redux?

- Biblioteca independente (pode ser usada com o Angular, React ou mesmo com JavaScript puro) que implementa Arquitetura Flux (que é uma forma de comunicação entre vários elementos em tela);
- Utilizado para controle de estados globais;
- Quando utilizar o Redux?
- - Meu estado tem mais de um dono? Ou seja, ele é utilizado por mais de um componente?
- - Meu estado é manipulado por mais de um componente? Em um e-commerce, por exemplo, um carrinho de compras pode exibir no componente cabeçalho o dado da quantidade de itens adicionados, baseado na adição feita em um outro componente que apenas lista os produtos e possui um botão de adicionar em cada um deles.
- - As ações do usuário causam efeitos colaterais nos dados? Por exemplo, ao adicionar um produto ao carrinho estando dentro do componente de listagem de produtos, pode exibir uma mensagem em outro componente ou afetar o dado com a quantidade de itens adicionados utilizada em um componente de cabeçalho ou rodapé.

Exemplos: Carrinho de compras, dados do usuário, player de música, etc;

### Arquitetura Flux

Cada biblioteca Front-End possui nomes diferentes ao se referir a essa arquitetura. Pelo contexto do React, utilizaremos os nomes do Redux dentro do React.

### Fluxo da arquitetura

Catálogo de produtos [botão adicionar ao carrinho] => ACTION (objeto) => REDUX STORE (com vários REDUCERS dentro) => REDUCER ADD (faz a alteração) => Nova renderização

Carrinho [botão de atualizar quantidade] => ACTION (objeto) => REDUX STORE (com vários REDUCERS dentro) => REDUCER UPDATE (faz a alteração) => Nova renderização

#### Descrição de cada item

ACTION: Objeto com a informação da ação disparada e qualquer informação adicional (dados a serem adicionados, por exemplo). O disparo de uma ACTION é feito com base em algum evento (carregamento da página, clique no botão, etc). Exemplo:

```js
{
  type: "ADD_TO_CART",
  product: {...}
}
```

REDUX STORE: Container do estado global, guarda todos os REDUCERS.

REDUCER: Função responsável por um pedaço do estado global que ouve as ACTIONS e manipula uma propriedade do estado específica. Por exemplo: REDUCER CART, REDUCER USER, REDUCER PRODUCTS, etc. Cada REDUCER manipula sua respectiva propriedade, quando isso é feito o Redux sinaliza todos os componentes que estão ouvindo alterações e utilizam essa propriedade do estado (renderizando o componente novamente).

#### Princípios

- Toda ACTION deve possuir um `type` (`ADD_TO_CART`, `REMOVE_FROM_CART`, etc). Todo `type` é unico em toda a aplicação.
- Uma vez definido que uma propriedade do estado será global, ela só deve ser acessada ou manipulada através do Redux: O estado do Redux torna-se o seu único ponto de acesso. Não é uma boa prática, por exemplo, ter uma propriedade de estado do Redux e uma propriedade de estado React local ao mesmo tempo (duplicidade) quando elas se referem a uma mesma entidade;
- Não podemos mutar o estado do Redux sem uma ACTION. Assim como os estados do React locais, os estados do Redux também são imutáveis, ou seja, não é possível alterar um estado diretamente.
- As ACTIONS e REDUCERS são funções puras e não lidam com side-effects (efeitos colaterais) assíncronos, ou seja, elas não fazem chamadas a API, não lidam com bancos de dados ou qualquer outra atividade assíncrona. Portanto, ao chamar essas funções puras com os mesmos parâmetros, o resultado esperado é sempre o mesmo, o que facilita a realização de testes unitários. (Para lidar com side-effects assíncronos podemos utilizar o Redux Saga)
- Qualquer lógica síncrona para regras de negócio deve ficar no REDUCER e nunca na ACTION (como cálculos, formatações, etc), ou seja, caso necessário, apenas os REDUCERS mutam os dados.
- **Nem toda aplicação precisa utilizar o Redux, o ideal é iniciar a aplicação sem ele e ir sentindo a necessidade de utilização (ou não utilização) com o passar do tempo. (A exceção é quando a aplicação já tem bem descrita quais informações serão globais com certeza)**

### Exemplos do carrinho

#### Exemplo 01

\\/ Propriedade do estado global Cart `[]` (Array vazio)

\\/ [Botão adicionar ao carrinho]

\\/ ACTION `{ type: 'ADD_TO_CART', procuct: { id: 1, title: 'Novo produto', price: 129.9, ...} }`

\\/ CART REDUCER (adiciona dado `formattedPrice` e atualiza o estado) `[ { id:1, title: 'Novo produto', amount: 1, price: '129,9', formattedPrice: 'R$ 129,9',...} ]`

\\/ (Aviso do Redux aos componentes que estão ouvindo a propriedade Cart)

[Nova Renderização]

#### Exemplo 02

\\/ [Botão atualizar quantidade]

\\/ ACTION `{ type: 'UPDATE_AMOUNT', procuct: 1, amount: 5 }`

\\/ CART REDUCER (modifica o dado `amount` e atualiza o estado) `[ { id:1, title: 'Novo produto', amount: 5, ...} ]`

\\/ (Aviso do Redux aos componentes que estão ouvindo a propriedade Cart)

[Nova Renderização]

---

## Configuração do Redux | Configuração do Redux Store e do primeiro REDUCER

Para configurar o Redux, adicionamos o módulo `redux` e o módulo de integração do Redux com o React `react-redux`:

```bash
yarn add redux react-redux
```

Criamos a pasta `src/store` para guardar toda a configuração referente ao Redux Store. Dentro da pasta `store`, para organizar melhor, criamos a pasta `modules` para guardar todos os REDUCERS.

Dentro da pasta `store/modules` criamos o arquivo `cart/reducer.js` e o arquivo `rootReducers.js`. O `cart/reducer.js` exporta uma função que por enquanto retorna um Array vazio (valor inicial da propriedade do estado Cart) e o `rootReducers.js` utiliza o método `combineReducers` do Redux para combinar todos os REDUCERS da aplicação (por enquanto só existe o CART REDUCER).

Dentro da pasta `store`, criamos o arquivo `index.js`, que importa o método `createStore` do Redux, importa os REDUCERS de `modules/rootReducers.js` e exporta o Redux Store através do método `createStore` passando os REDUCERS como parâmetro (parâmetro obrigatório para funcionar).

Apesar da organização adotada (fazendo a combinação de todos os REDUCERS), também seria perfeitamente possível passar qualquer função/REDUCER diretamente pro método `createStore`.

Modificamos o `App.js`, importando o componente `Provider` do módulo React Redux, importando o Redux Store da pasta `store` e envolvendo toda a estrutura da aplicação com o componente `Provider` informando o `store` via propriedade. O `Provider` é um dos componentes que efetivamente integra o Redux ao React, permitindo que toda a aplicação tenha acesso as propriedades de estado globais do Redux Store.

---

## Adicionando produtos ao estado global Cart | Exibindo quantidade de produtos

Para utilizar o Redux Store, além de utilizar o componente `Provider` como container, também precisamos integrar cada componente que lê ou modifica as propriedades de estado globais do Redux Store através do método `connect` do React Redux.

O método `connect` do React Redux pode receber uma função no primeiro parâmetro, que tem o argumento `state` preenchida automaticamente pelo Redux contendo todo o estado global atual com todos os REDUCERS dentro dele (que foram preenchidos na inicialização do Redux no método `combineReducers`). Além disso, o método `connect` também é uma high-order function e retorna uma outra função, que chamamos em seguida, passando o componente do React que queremos integrar ao Redux. O Resultado final é um componente "React Redux", onde é possível ler algum dado do estado global do Redux Store ou acessar métodos do Redux (como o `dispatch`).

### Home

Modificamos o componente do React `Home`, para que a integração com o Redux seja feita antes da exportação. Ao final exportamos uma chamada ao método `connect` (sem parâmetros, pois nesse momento não precisamos ler nenhum dado, apenas modificar). E, na chamada da função retornada pelo `connect`, passamos o componente React `Home` como parâmetro.

Com o componente React `Home` modificado para um componente React Redux, criamos o método `handleAddToCart` (que recebe o produto via parâmetro) e o associamos a cada botão de adicionar produto ao carrinho. No `handleAddToCart`, utilizamos o método `dispatch` (preenchido nas propriedades do componente pelo Redux) para disparar uma ACTION contendo o type `ADD_TO_CART` e o produto recebido via parâmetro.

### Sobre REDUCERS

Em uma aplicação com o Redux, todas as funções de REDUCER possuem dois argumentos preenchidos automaticamente pelo Redux, o `state`, com o valor do respectivo estado global atual (antes de uma possível modificação) e o `action`, com os dados que foram preenchidos ao chamar a função `dispatch`.

Além disso, todos os REDUCERS ouvem todos os disparos de ACTIONS. Por essa razão, denro de cada REDUCER, nos casos de modificação, é necessário conferir a condição para modificar o dado da respectiva propriedade do estado global, ou, nos casos de leitura, apenas retornar a propriedade do estado global (o padrão, quando nenhuma condição for atendida). Essa condição é a verificação da propriedade `action.type`, através de um `switch`. Todos os REDUCERS seguem esse padrão.

As funções de todos os REDUCERS são executadas internamente pelo Redux tanto ao executar um `dispatch` para disparar uma ACTION (nos casos de modificação do estado global do Redux Store) quanto nas chamadas do método `connect` com o primeiro argumento preenchido (nos casos de leitura do estado global do Redux Store).

### Cart REDUCER

Modificamos o CART REDUCER (`store/modules/cart`) para que o valor inicial do `state` seja um Array vazio `[]`. Através de um switch, também verificamos se o `action.type` é `ADD_TO_CART` e se a condição for atendida, retornamos um novo Array com o `state` atual + o novo produto informado na `action.product`. Se nenhuma condição for atendida, apenas retornamos o estado sem modificações.

Neste ponto, um produto é adicionado ao estado Cart sempre que um clique é feito no botão de adicionar produto ao carrinho.

### Header

Para ler e exibir a quantidade de produtos adicionados ao carrinho, modificamos o componente do React `Header`, fazendo a integração dele com o Redux antes da exportação. Como nesse caso precisamos ler dados do estado global, na chamada do método `connect` passamos como primeiro argumento a função que retorna um objeto com as propriedades a serem utilizadas pelo componente `Header`. E, na chamada da segunda função retornada pelo `connect`, passamos o componente React `Header` como parâmetro.

Dentro do componente `Header`, através do acesso as propriedades do componente, acessamos a propriedade `cartSize`, preenchida anteriormente na chamada do método `connect` e incluímos essa propriedade na estrutura para exibir a quantidade de produtos atuais no carrinho.

Neste ponto, toda vez que um produto é adicionado ao carrinho, esse componente é avisado pelo Redux e renderizado novamente.

---

## Configurando Debug externo na ferramenta Reactotron

Ter a ferramenta [Reactotron](https://github.com/infinitered/reactotron) já instalada é um pré-requisito pro funcionamento dos próximos passos.

Na aplicação, instalamos o Debugger externo Reactotron e a integração dele com o Redux.

```bash
yarn add reactotron-react-js reactotron-redux
```

As dependências são instaladas em modo normal (ao invés do modo de desenvolvimento) pro ESLint não indicar erros. Contudo, ainda inicializamos o Reactotron apenas no ambiente de desenvolvimento a seguir.

Na pasta src criamos o arquivo `config/ReactotronConfig.js` e nele importamos os módulos instalados, verificamos se a aplicação está rodando em ambiente de desenvolvimento (checando a variável que o `create react-app` preenche chamada `process.env.NODE_ENV`, que só existe quando utilizamos `yarn start` [e não no `yarn build`]), em caso positivo inicializamos o Reactotron e armazenamos o objeto retornado por ele dentro da variável global do console (em console.tron) para ter acesso em outros lugares da aplicação. Também efetuamos a limpeza do log (tron.clear()).

(O ESLint indica um erro ao utilizar o `console.tron`, para ignora-lo alteramos o arquivo de configuração do ESLint)

No `App.js`, importamos o arquivo de configuração do Reactotron antes da importação do Redux Store.

Como também existe o Redux nessa aplicação, para integrá-lo ao Reactotron também foi necessário passar a função `reactotronRedux` (do Reactotron Redux) na inicialização do Reactotron (no arquivo `RectotronConfig.js`). Além disso, no arquivo `src/store/index.js` foi necessário passar o resultado do método `createEnhancer` do Reactotron como segundo parâmetro pro método `createStore`.

Neste ponto, a ferramenta Reactotron já indica quando iniciamos a aplicação.

Na aba "Timeline" da ferramenta Reactotron conseguimos ver os detalhes do disparo de uma ACTION (quando adicionamos um item ao carrinho, por exemplo), além de ser possível refazer o disparo de uma ACTION e modificá-la antes caso necessário.

Na aba "State" da ferramenta Reactotron, em "Subscriptions" conseguimos acompanhar o valor atual de determinada propriedade global e em "Snapshots" é possível fazer um Backup de todo o estado ou reverter a aplicação para um Backup feito anteriormente.

---

## Cart | Listando produtos adicionados ao carrinho na página cart

No componente `Cart` utilizamos a função `connect` para transformá-lo em um componente React Redux antes da exportação.

Nesse componente também será necessário utilizar dados do estado global, recendo os mesmos via propriedades, para isso criamos uma função chamada `mapStateToProps` que retorna os dados a serem utilizados na renderização do componente. Depois passamos essa função como primeiro argumento da função `connect`. Esse padrão pode ser utilizado em qualquer componente que precise acessar o estado global do Redux Store.

Modificamos a estrutura para percorrer o Array `cart` e criar uma `<tr>` com os dados para cada produto presente no carrinho.

Neste ponto, para cada produto adicionado ao carrinho, exibimos a imagem, título, e o preço formatado. Falta exibir a quantidade, o subtotal, o total e implementar a remoção do produto do carrinho.

---

## Instalando immer | Facilitando a manipulação de dados imutáveis

Instalamos o [immer](https://immerjs.github.io/immer/docs/introduction), uma biblioteca que facilita a alteração de dados do estado. Ela permite que alterações diretas sejam feitas em uma cópia da propriedade do estado (draft), para depois comparar/unir com o estado original (current) e retornar uma nova cópia da propriedade alterada com o novo valor a ser armazenado no estado (next).

```bash
yarn add immer
```

Modificamos o CART REDUCER para que agora ele utilize a função `produce` do `immer`. Para essa função passamos o estado atual no primeiro argumento. No segundo argumento passamos outra função com a variável draft (preenchida pelo immer). Modificamos o draft diretamente como se fosse a propriedade do estado (com o método push) e a função `produce` se encarrega de retornar a nova propriedade a ser armazenada no estado.

---

## Cart REDUCER | Adicionando quantidade de produtos

Modificamos o CART REDUCER para fazer uma verificação antes de adicionar um novo produto. Se o produto não existir no carrinho, ele é adicionado com a quantidade (`amount`) 1. Se o produto já existir no carrinho, a quantidade (`amount`) é incrementada para +1.

(Como alteramos o argumento `draft`, o ESLint indicou erro, então alteramos o arquivo de configuração para desativar esse tipo de erro)

Também modificamos o componente `Cart` para exibir a quantidade de itens dentro do campo input do tipo number.

Neste ponto, ao acessar a página `Home` e adicionar um produto duas vezes, o valor que aparece no cabeçalho (com a quantidade de itens do carrinho) só muda uma vez, já que, a partir da segunda adição, o que muda é a propriedade do respectivo produto que guarda a quantidade e um novo item não é adicionado ao carrinho.

---

## Cart REDUCER | Removendo item da listagem do carrinho

Adicionamos um novo `type` no CART REDUCER, para fazer a remoção de um item do carrinho após procurar o produto pelo seu `id` e encontrar o seu respectivo `index` em relação ao Array onde ele está guardado.

No componente `Cart` adicionamos uma função ao botão de deletar (com o ícone da latinha de lixo), utilizando o método `dispatch` para disparar a ACTION com o type 'REMOVE_FROM_CART' (que será ouvido pela condição criada no CART REDUCER).

Neste ponto, ao clicar no botão excluir da página `Cart`, o item é removido da listagem.

---

## Refatoração de todas as ACTIONS: 'ADD_TO_CART' e 'REMOVE_FROM_CART'

Para implementar uma boa prática, refatoramos o código para ter as ACTIONS de determinado módulo (nesse caso, o módulo cart) em um arquivo só, assim, se for necessário disparar uma mesma ACTION através de outro componente, importamos desse único arquivo e a manutenção também fica em apenas um local.

Dentro de `store/modules/cart` criamos o arquivo `action` e dentro dele definimos as funções que exportam a ACTION (um objeto com o type e os dados) para cada REDUCER adicionar ou remover os itens do carrinho.

Nos componentes `Home` e `Cart` importamos essas duas funções para dentro da variável `CartActions` e bastaria substituir os objetos das ACTIONS em cada um dos arquivos por sua respectiva função (`CartActions.removeFromCart` no componente `Cart` e `CartActions.addToCart` no componente `Home`), contudo, existe uma maneira de otimizar ainda mais o código, associando cada uma das funções ao dispatch antes de chamá-las (eliminando a necessidade de ter o dispatch por volta delas).

Para associar as funções do arquivo `action.js` ao `dispatch` do Redux, importamos o método `bindActionCreators` tanto no componente `Home`, quanto no componente `Cart`.

O método `connect`, além do primeiro parâmetro (que recebe uma função para transformar o estado em propriedades a serem utilizadas pelo componente), ele também aceita no segundo parâmetro uma outra função que também tem o argumento preenchido automaticamente, só que com com o `dispatch`. Dessa maneira, utilizamos o `dispatch` para associa-lo as funções que foram importadas para dentro de `CartActions` através do método `bindActionCreators`.

(No caso do componente Home, como ele não precisar ler o estado global, o primeiro parâmetro ficou com o valor `null`)

Após essas alterações, ao invés de utilizar o dispatch informando um objeto, ou ao invés de informar uma função que retorna o objeto, é possível acessar as funções `addToCart` e `removeFromCart` diretamente das propriedades do componente e cada uma delas já é uma função do tipo `dispatch` (disparando suas respectivas ACTIONS quando são invocadas).

Neste ponto a aplicação continua funcionando da mesma forma, adicionando (itens e quantidade de produtos) e removendo itens do carrinho normalmente.

---

## Cart ACTIONS e REDUCERS | Padroniza propriedade type

Para padronizar os nomes dos types enviados pelas ACTIONS / recebidos pelos REDUCERS, como também, facilitar a visualização no Reactotron, alteramos todos os nomes seguindo a estrutura @nomeDoModulo/ACAO.

---

## Cart ACTION/REDUCER | Adicionando e removendo a quantidade de produtos

Adicionamos as funcionalidades de adicionar ou remover a quantidade de determinado produto que aparece na página `Cart`.

Criamos a função `updateAmount` que retorna a ACTION no arquivo `cart/actions.js`. A ACTION possui o type `@cart/UPDATE_AMOUNT`, o `id` do produto com a quantidade a ser alterada e o `amount` com o valor da nova quantidade. A função da ACTION deve apenas retornar os dados necessários e toda a parte lógica fica por conta do REDUCER.

Na página `Cart` criamos a função `decrement`, que dispara a ACTION `@cart/UPDATE_AMOUNT` através da função `updateAmount` passando como argumento o id do produto e a quantidade (`amount`) atual decrementado em -1. Associamos essa função ao botão com o ícone que possui o sinal de menos (-);

Na página `Cart` também criamos a função `increment`, que dispara a ACTION `@cart/UPDATE_AMOUNT` através da função `updateAmount` passando como argumento o id do produto e a quantidade (`amount`) atual incrementado em +1. Associamos essa função ao botão com o ícone que possui o sinal de mais (+);

O componente `Cart` é responsável apenas pela estrutura/interface e nenhuma verificação lógica é feita nele, toda a parte lógica de alterações no estado fica por conta do Redux através do REDUCER.

Neste ponto, o Reactotron já mostra os disparos das ACTIONS, faltando apenas criar o REDUCER para ouvir a ACTION e fazer as alterações de acordo com as regras necessárias.

Criamos a condição de atualização no REDUCER no arquivo `cart/reducer.js`. Adicionamos o case `@cart/UPDATE_AMOUNT`, com chaves ({}) para fazer uma verificação adicional antes do `return`. Verificamos se o `action.amount` recebido é menor ou igual a zero (quando o usuário tentar diminuir até o máximo possível) e não é feita nenhuma alteração no estado nesse caso. Se o `amount` recebido for maior que zero e o produto com o id informado for encontrado na lista, a alteração na quantidade é feita.

Neste ponto, ao clicar no sinal de menos a quantidade diminui até chegar no limite (1) e ao clicar no sinal de mais a quantidade aumenta infinitamente.

---

## Cart | Exibindo subtotal e total de acordo com a quantidade de produtos

Como o subtotal de cada produto e o total tratam-se de propriedades que só fazem sentido serem calculadas quando a lista de produtos está sendo exibida, adicionamos essas propriedades no componente `Cart` ao invés de adicionar ao seu respectivo REDUCER. Assim, o preço não é calculado toda vez que disparamos o evento de adicionar ao carrinho do componente `Home`, por exemplo.

Também não adicionamos o cálculo diretamente na estrutura pela mesma razão de não ter feito isso na listagem de produtos no componente `Home`: não é uma boa prática e isso faria o preço ser calculado toda vez que qualquer outra propriedade do estado (diferente de `Cart`) fosse alterada.

Ou seja, nesse contexto, já que o subtotal e o total só fazem sentido de serem calculados quando exibimos a listagem de todos os produtos do carrinho, o melhor local para fazer esse cálculo é dentro do mesmo arquivo que possui a estrutura dessa listagem, o componente `Cart`. Em outras palavras, cálculos (ou obtenção de valores) que utilizam dados do Redux Store podem estar no mesmo arquivo do componente.

Uma outra forma de ver isso seria considerar que qualquer dado "colateral" fora do Array `cart`, como o `total` dos itens, o `subtotal` pra cada item ou até mesmo o `cartSize` (do componente `Header`), mas que ainda pertence ao contexto de `cart` e não é nenhuma regra a ser verificada através de alguma condição, pode estar dentro do `mapStateToProps`.

Modificamos o componente `Cart` adicionando propriedades ao `mapStateToProps` responsáveis por guardar o subtotal (em cada produto) com base no preço e na quantidade de cada produto e o total com base nos preços e quantidades de todos os itens do carrinho.

---

## Home | Exibindo a quantidade de produtos adicionados no carrinho

Modificamos o componente `Home` para exibir a quantidade de produtos adicionados ao carrinho dentro do botão de adicionar de cada produto.

Criamos o `mapStateToProps` e nele utilizamos o `reduce` para percorrer o estado global `cart` e retornar um novo objeto chamado `amount`. O resultado é um objeto onde cada propriedade é acessada através do `id` de cada produto e no valor de cada propriedade fica guardada a quantidade de itens no carrinho deste produto.

Modificamos a estrutura do componente `Home` para também exibir a quantidade de produto no carrinho consultando o objeto `amount` na propriedade nomeada com o `id` do respectivo produto. Caso a propriedade não exista, significa que o produto não existe no carrinho e retornamos `0`.

Neste ponto é possível adicionar ou remover produtos tanto na página `Home`, quanto na página `Cart` e as alterações são refletidas em cada um dos botões dos produtos que estão no carrinho.

---

## Trabalhando com Middlewares através do Redux Saga

O [Redux Saga](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html) é uma biblioteca para lidar com side-effects (efeitos colaterais) no React (tanto Web quanto Mobile). Ele lida com a execução de um código assíncrono que precisa acontecer antes da execução de algum outro código. Esses códigos que acontecem antes, são os chamados side-effects. Essa biblioteca funciona através de middlewares, ou seja, através de funções intermediadoras. Por exemplo: ao executar a requisição de dados de uma API, podemos exibir um loader, até que o resultado seja recebido, para depois executar a ACTION de atualização/exibição dos dados em tela. Ou seja, um "Saga Middleware" intercepta uma ACTION e executa um código antes de chamar o REDUCER.

Instalamos a biblioteca Redux Saga:

```bash
yarn add redux-saga
```

Iniciamos a configuração de inicialização do Saga na aplicação.

Dentro da pasta `store/modules` criamos o arquivo `rootSagas.js`, que serve para combinar e exportar todos os sagas (semelhante ao que fizemos com os reducers, já que a partir deste ponto vamos chamar um saga ao invés de reducer em alguns casos).

No arquivo `rootSagas.js`, importamos o método `all` do Redux Saga para fazer a combinação de todos os sagas (por enquanto não existe nenhum). A estrutura do código do Redux Saga espera ser utilizada com **generators**, que é uma maneira de executar códigos assíncronos semelhante ao **async/await**, só que com recursos adicionais. Para utilizar uma função com generator cologamos um sinal de vezes na frente de sua palavra chave (`function* ...`) e isso funciona como se fosse um **async**. Dentro da função, para cada código assícrono colocamos o `yield`, que funciona como se fosse um **await**.

(O Babel converte o async/await pra genarators em alguns navegadores)

Modificamos o arquivo `store/index.js` definindo a nova configuração para a utilização dos sagas. 

 Para utilizar um "Saga Middleware" é necessário criá-lo através do método `createSagaMiddleware`. Fizemos a criação e guardamos na variável `sagaMiddleware`.

 Foi necessário modificar o que a constante `enhancer` recebe, já que neste ponto existe um código adicional além do código do Reactotron. Como utilizamos um if ternário, para unir os códigos que precisam ser carregados em ambiente de desenvolvimento, utilizamos o método `compose` do Redux, passando como argumento tanto a chamada do método `tron.createEnhancer()`, quanto o "Saga Middleware".

Quando utilizamos um "Middleware" no Redux Store, também é necessário iniciáliza-lo através do método `applyMiddleware` do Redux, então utilizamos esse método por volta do `sagaMiddleware`.

Após a inicialização do `store`, também inicializamos os middlewares do Saga através do método `sagaMiddleware.run`, passando os sagas (importados do arquivo `rootSagas.js`) como parâmetro.

Neste ponto a aplicação continua funcionando normalmente com o Saga inicializado.

---

## Cart SAGA | Chamada a API antes de armazenar produto no carrinho

Imaginando que a listagem de produtos principal na página `Home` não traz todas as informações de um produto (como peso, altura, etc) e que precisamos exibir essas informações adicionais na página `Cart`, utilizamos o Redux Saga, para buscar os dados adicionais na API antes de exibir a página `Cart`.

Para executar esse passo a mais, é necessário criar uma nova ACTION. A nova ACTION que será ouvida pelo SAGA possuirá o type `@cart/ADD_REQUEST`, que após ser executada, vai disparar outra ACTION chamada `@cart/ADD_SUCCESS` (a antiga `@cart/ADD` que adiciona o produto ao carrinho.

No arquivo `cart/actions.js` adicionamos a função `addToCartRequest` pra retornar a ACTION apenas com o ID e o SAGA será responsável por buscar as outras informações do produto e por passar essas informações adiante. Também renomeamos a função já existente `addToCart` para `addToCartSucess`.

No arquivo `cart/reducer.js`, modificamos o case ADD para escutar o type `@cart/ADD_SUCCESS` ao invés de `@cart/ADD`.

No arquivo `pages/Home`, modificamos e o método `handleAddToCart` para receber o `id` como parâmetro e depois chamar a função `addToCartRequest` ao invés da antiga `addToCart` para disparar a ACTION com o type `@cart/ADD_REQUEST`.

Para a ACTION com o type `@cart/ADD_REQUEST` ser ouvida pelo SAGA, essa configuração é feita e exportada do arquivo SAGA pro respectivo módulo.

Criamos o arquivo `cart/sagas.js` e nele uma função com generator chamada `addToCart`, que executará algum código quando a "SAGA ACTION" `@cart/ADD_REQUEST` for chamada. 

Ao final do arquivo, exportamos essa configuração utilizando o método `all` do `redux-saga/effects` para unir todos os listeners a serem executados (por enquanto só existe esse de adicionar), mas quando surgirem novos, basta adicioná-los ao Array. Para criar o listener, utilizamos o método `takeLatest` do `redux-saga/effects`, passando no primeiro parâmetro o type da ACTION a ser ouvida (`@cart/ADD_REQUEST`) e a função a ser executada quando essa ACTION for disparada (`addToCart`). O `takeLatest` cria um tipo de `listener` que sempre ouve apenas a última execução/chamada da ACTION, cancelando as chamadas anteriores (para quando o usuário faz várias chamadas clicando várias vezes em um botão, por exemplo).

A função `addToCart` é responsável por executar aquele passo a mais, fazendo a busca na API antes da execução da ACTION seguinte (podendo passar as informações adicionais pra ela). Nela fazemos a chamada a API utilizando o ID recebido da ACTION com o type `@cart/ADD_REQUEST`. Ao utilizar o SAGA, qualquer chamada desse tipo (assíncronas que retornam Promisses) não podem ser feitas diretamente e é necessário utilizar o método auxiliar `call` do `redux-saga/effects`. Após receber os dados, disparamos a "REDUX ACTION" com o type `@cart/ADD_SUCCESS`, através de um outro método auxiliar chamado `put` do `redux-saga/effects`.

Modificamos o arquivo `rootSagas.js` para incluir o CART SAGA na exportação a ser utilizada pelo `store/index.js`.

Fluxo:

\\/ [botão adicionar ao carrinho da página `Home`]
\\/ dispatch "SAGA ACTION" type `@cart/ADD_REQUEST` (através do método `addToCartSuccess`)
\\/ arquivo "SAGA REDUCER", funcão `addToCart` que recebe `id`
\\/ (chamada a API)
\\/ dispatch "REDUX ACTION" type `@cart/ADD_SUCCESS` (através do método `addToCartRequest`)
\\/ arquivo "REDUX REDUCER", função cart que recebe `product`, case `@cart/ADD_SUCCESS`
\\/ (adiciona produto ao carrinho)

Neste ponto, a aplicação continua funcionando como antes, mas agora com a chamada a API e recebimento dos dados do produto antes de guarda-lo no carrinho.

---

## Reactotron | Instalando plugin do Redux Saga

Para facilitar a visualização do fluxo da aplicação instalamos o plugin do Redux Saga pro Reactotron:

```bash
yarn add reactotron-redux-saga
```

No arquivo `config/ReactotronConfig.js` importamos o e inicializamos o plugin através do método `use` do Reactotron.

No arquivo `store/index.js` inicializamos a constante `sagaMonitor` com o método do Reactotron `createSagaMonitor` se estivermos em ambiente de desenvolvimento e passamos como parâmetro pro método `createSagaMiddleware`.

Neste ponto, ao adicionar um produto ao carrinho é possível ver todo o fluxo no Reactotron, desde o disparo da primeira ACTION de REQUEST, até a chamada da API e a chamada da ACTION de SUCCESS. A ultilização do `yield` antes das chamadas dos métodos/effects `call` e `put` permitem que eles métodos sejam exibidos no debugger. Também é possível ver os detalhes de cada effect, como o que foi enviado via parâmetro (`in`) e o que foi recebido pelo retorno das funções (`out`).

---