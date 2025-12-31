const db = require('../database/connection');

exports.create = async (nome, email, telefone, adminId) => {
  const sql = `
    INSERT INTO usuarios (nome, email, telefone, criado_por)
    VALUES (?, ?, ?, ?)
  `;
  await db.execute(sql, [nome, email, telefone, adminId]);
};

exports.findAllByAdmin = async (adminId) => {
  const sql = 'SELECT * FROM usuarios WHERE criado_por = ?';
  const [rows] = await db.execute(sql, [adminId]);
  return rows;
};
