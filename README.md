# API Sistema de agendamentos

Essa API foi criada utilizando Node.js, Express e MySQL. Ela permite criar, listar, atualizar e
excluir agendamentos de clientes, armazenando os dados em um banco de dados MySQL.

## Requisitos

Antes de executar esta API, é necessário ter o Node.js instalado em sua máquina.
Além disso, é preciso configurar um banco de dados MySQL para armazenar os agendamentos.

## Instalação e Execução

1. Clone o repositório para sua máquina local.
2. Instale as dependências do projeto utilizando o gerenciador de pacotes npm:
```npm install```
3. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes informações:

```
DB_HOST=<seu_host_do_banco_de_dados>
DB_USER=<seu_usuario_do_banco_de_dados>
DB_PASSWORD=<sua_senha_do_banco_de_dados>
DB_DATABASE=<seu_nome_do_banco_de_dados>
```

4. Em seguida, para executar a API, execute o comando:
```npm start```.

## Utilização

### Criar um novo agendamento

Para criar um novo agendamento, envie uma requisição HTTP POST para a rota /agendamentos com um objeto JSON contendo os dados do agendamento no corpo da requisição:
```
{
  "nome": "João da Silva",
  "email": "joao.silva@gmail.com",
  "data": "2023-04-10",
  "hora": "10:00",
  "telefone": "(11) 99999-9999"
}

```

### Listar todos os agendamentos

Para listar todos os agendamentos registrados no banco de dados, envie uma requisição HTTP GET para a rota /agendamentos.

### Atualizar um agendamento existente

Para atualizar um agendamento existente, envie uma requisição HTTP PUT para a rota /agendamentos/:id com o ID do agendamento a ser atualizado na URL da requisição e um objeto JSON contendo os dados atualizados do agendamento no corpo da requisição:
```
{
  "nome": "João da Silva",
  "email": "joao.silva@hotmail.com",
  "data": "2023-04-10",
  "hora": "11:00",
  "telefone": "(11) 99999-9999"
}

```

### Excluir um agendamento existente

Para excluir um agendamento existente, envie uma requisição HTTP DELETE para a rota /agendamentos/:id com o ID do agendamento a ser excluído na URL da requisição.
