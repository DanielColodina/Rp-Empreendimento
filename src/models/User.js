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

// LISTAGEM DE TODOS OS USUARIOS
exports.findAllWithAdmin = async () => {
  const sql = `
    SELECT 
      u.id,
      u.nome,
      u.email,
      u.telefone,
      u.endereco,
      u.obra,
      a.nome AS admin_nome,
      u.created_at
    FROM usuarios u
    JOIN admins a ON a.id = u.criado_por
    ORDER BY u.id DESC
  `;
  const [rows] = await db.execute(sql);
  return rows;
};
