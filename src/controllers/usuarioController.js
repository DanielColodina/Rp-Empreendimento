const db = require('../database/connection');

exports.create = async (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || !email) {
    return res.status(400).send('Nome e email são obrigatórios');
  }

  try {
    const sql = `
      INSERT INTO usuarios (nome, email, telefone, criado_por)
      VALUES (?, ?, ?, ?)
    `;

    await db.execute(sql, [
      nome,
      email,
      telefone || null,
      req.session.adminId
    ]);

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar usuário');
  }
};
