const connection = require('../db');

const Agendamento = {
  criar: async (agendamento) => {
    const sql = 'INSERT INTO agendamentos SET ?';
    const [rows] = await connection.query(sql, agendamento);
    return rows.insertId;
  },

  listar: async () => {
    const sql = 'SELECT * FROM agendamentos';
    const [rows] = await connection.query(sql);
    return rows;
  },
  
  atualizar: async (id, agendamento) => {
    const sql = 'UPDATE agendamentos SET ? WHERE id = ?';
    const [rows] = await connection.query(sql, [agendamento, id]);
    return rows.affectedRows > 0;
  }
};

module.exports = Agendamento;
