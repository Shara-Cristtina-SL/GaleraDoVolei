````markdown
# Galera Vôlei - API

Este projeto é um esqueleto de referência implementando **Clean Architecture / DDD** para o domínio da **Comunidade de Vôlei**.  
Inclui entidades de domínio, casos de uso da aplicação, repositórios em memória, controllers, rotas.
````

## Funcionalidades

- Cadastro e listagem de jogadores
- Convite de jogadores para partidas
- Solicitação de adesão a partidas
- Controle de status de partidas (NOVA, ADESAO, ENCERRADA, REALIZADA)
- Repositórios em memória para teste rápido sem banco de dados
- Estrutura organizada para testes unitários
````
## Rodando localmente

1. Instale as dependências:

````
bash
npm install
````

2. Rode os testes:

```bash
npm test
```

3. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor iniciará em: `http://localhost:4000`

## Endpoints principais

* **Jogadores**

  * `GET /api/jogadores` — Listar todos os jogadores
  * `POST /api/jogadores/:convidanteId/convidar` — Convidar outro jogador
  * `GET /api/jogadores/:id/convites` — Listar convites de um jogador
  * `GET /api/jogadores/:id/pedidos` — Listar pedidos de adesão de um jogador

* **Partidas**

  * `POST /api/partidas`
  * `POST /api/partidas/:partidaId/adesao` — Solicitar adesão a uma partida

## Testes

Testes unitários são realizados com **Jest** e podem ser executados com:

```bash
npm test
```

## Estrutura do projeto

```
src/
├── application/      # Casos de uso
├── domain/           # Entidades e interfaces de repositórios
├── infrastructure/   # Repositórios, persistência e mocks
├── presentation/     # Controllers, rotas e middlewares
└── tests/            # Testes unitários
```

