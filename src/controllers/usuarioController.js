const User = require('../models/User');

// CRIAR USUÁRIO
exports.create = async (req, res) => {
  const { nome, email, telefone, endereco, obra} = req.body;

  if (!nome || !email || !endereco || !obra || !Telefone) {
    return res.status(400).send('Nome e email são obrigatórios');
  }

  try {
    await User.create(
      nome,
      email,
      telefone || null,
      endereco,
      obra,
      req.session.adminId
    );

    res.redirect('/dashboard/tablesUsers');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar usuário');
  }
};

// LISTAR USUÁRIOS
exports.list = async (req, res) => {
  try {
    const usuarios = await User.findAllWithAdmin();
    res.render('tablesUsers', { usuarios });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao listar usuários');
  }
};

