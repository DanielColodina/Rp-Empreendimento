const Admin = require('../models/Admin');
const Usuario = require('../models/User');
const bcrypt = require('bcrypt');

exports.loginPage = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send('Preencha todos os campos');
  }

  try {
    const admin = await Admin.findByEmail(email);
    if (!admin) {
      return res.send('Acesso negado');
    }

    console.log('DEBUG - Password received:', typeof password, password.length);
    console.log('DEBUG - Hash from DB:', typeof admin.password, admin.password.length);
    console.log('DEBUG - Hash preview:', admin.password.toString().slice(0, 40));

    const ok = await bcrypt.compare(password.trim(), admin.password);
    console.log('DEBUG - Compare result:', ok);
    
    if (!ok) {
      return res.send('Senha inválida');
    }

    req.session.adminId = admin.id;
    res.redirect('/dashboard');
  } catch (err) {
    console.error('ERRO no login:', err);
    res.send('Erro no servidor: ' + err.message);
  }
};

exports.dashboard = (req, res) => {
  if (!req.session.adminId) {
    return res.redirect('/login');
  }

  res.render('dashboard');
};
