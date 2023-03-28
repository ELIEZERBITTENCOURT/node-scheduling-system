const express = require('express');
const router = express.Router();
const Agendamento = require('../models/agendamento');

// Rota para criar um novo agendamento
router.post('/', async (req, res) => {
  const agendamento = {
    nome: req.body.nome,
    email: req.body.email,
    data: req.body.data,
    hora: req.body.hora,
    telefone: req.body.telefone
  };

  const id = await Agendamento.criar(agendamento);
  res.send({ id, ...agendamento });
});

// Rota para listar todos os agendamentos
router.get('/', async (req, res) => {
  const agendamentos = await Agendamento.listar();
  res.send(agendamentos);
});

// Rota para atualizar um agendamento existente
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const agendamento = {
      nome: req.body.nome,
      email: req.body.email,
      data: req.body.data,
      hora: req.body.hora,
      telefone: req.body.telefone
    };
  
    const atualizado = await Agendamento.atualizar(id, agendamento);
    if (atualizado) {
      res.send({ id, ...agendamento });
    } else {
      res.status(404).send({ message: 'Agendamento não encontrado' });
    }
  });

// Rota para excluir um agendamento existente
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
  
    const excluido = await Agendamento.excluir(id);
    if (excluido) {
      res.send({ message: `Agendamento ${id} excluído com sucesso` });
    } else {
      res.status(404).send({ message: 'Agendamento não encontrado' });
    }
  });

module.exports = router;
