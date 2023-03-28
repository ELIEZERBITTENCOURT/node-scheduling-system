const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const agendamentoRouter = require('./routes/agendamento');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/agendamentos', agendamentoRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
