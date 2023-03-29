const request = require('supertest');
const express = require('express');
const app = express();
const router = require('./routes/agendamento');
const Agendamento = require('./models/agendamento');

// Mock do modelo Agendamento
jest.mock('./models/agendamento', () => ({
  criar: jest.fn(),
  listar: jest.fn(),
  atualizar: jest.fn(),
  excluir: jest.fn()
}));

// Configuração do app
app.use(express.json());
app.use('/agendamentos', router);

describe('Testes para a rota de criação de agendamento', () => {
  test('Deve criar um novo agendamento', async () => {
    const agendamento = {
      nome: 'Fulano',
      email: 'fulano@teste.com',
      data: '2023-04-01',
      hora: '10:00',
      telefone: '123456789'
    };

    Agendamento.criar.mockResolvedValueOnce(1);

    const response = await request(app).post('/agendamentos').send(agendamento);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, ...agendamento });
    expect(Agendamento.criar).toHaveBeenCalledWith(agendamento);
  });
});

describe('Testes para a rota de listagem de agendamentos', () => {
  test('Deve listar todos os agendamentos', async () => {
    const agendamentos = [
      {
        id: 1,
        nome: 'Fulano',
        email: 'fulano@teste.com',
        data: '2023-04-01',
        hora: '10:00',
        telefone: '123456789'
      },
      {
        id: 2,
        nome: 'Ciclano',
        email: 'ciclano@teste.com',
        data: '2023-04-02',
        hora: '14:00',
        telefone: '987654321'
      }
    ];

    Agendamento.listar.mockResolvedValueOnce(agendamentos);

    const response = await request(app).get('/agendamentos');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(agendamentos);
    expect(Agendamento.listar).toHaveBeenCalled();
  });
});

describe('Testes para a rota de atualização de agendamento', () => {
  test('Deve atualizar um agendamento existente', async () => {
    const id = 1;
    const agendamento = {
      nome: 'Fulano',
      email: 'fulano@teste.com',
      data: '2023-04-01',
      hora: '10:00',
      telefone: '123456789'
    };

    Agendamento.atualizar.mockResolvedValueOnce(true);

    const response = await request(app).put(`/agendamentos/${id}`).send(agendamento);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: id.toString(), ...agendamento });
    expect(Agendamento.atualizar).toHaveBeenCalledWith(id.toString(), agendamento);
  });

  test('Deve retornar erro 404 para agendamento inexistente', async () => {
    const id = 1;
    const agendamento = {
      nome: 'Fulano',
      email: 'fulano@teste.com',
      data: '2023-04-01',
      hora: '10:00',
      telefone: '123456789'
    };

    Agendamento.atualizar.mockResolvedValueOnce(false);

    const response = await request(app).put(`/agendamentos/${id}`).send(agendamento);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Agendamento não encontrado' });
    expect(Agendamento.atualizar).toHaveBeenCalledWith(id.toString(), agendamento);
  });
});

describe('Testes para a rota de exclusão de agendamento', () => {
  test('Deve excluir um agendamento existente', async () => {
    const id = 1;
    Agendamento.excluir.mockResolvedValueOnce(true);

    const response = await request(app).delete(`/agendamentos/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: `Agendamento ${id} excluído com sucesso` });
    expect(Agendamento.excluir).toHaveBeenCalledWith(id.toString());
  });

  test('Deve retornar erro 404 para agendamento inexistente', async () => {
    const id = 1;
    Agendamento.excluir.mockResolvedValueOnce(false);

    const response = await request(app).delete(`/agendamentos/${id}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Agendamento não encontrado' });
    expect(Agendamento.excluir).toHaveBeenCalledWith(id.toString());
  });
});