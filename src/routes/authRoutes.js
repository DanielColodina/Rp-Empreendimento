// Chamando os módulos
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const usuarioController = require('../controllers/usuarioController');
const isAuth = require('../middlewares/isAuth');

// ---------------- ROTAS PÚBLICAS ----------------

// Rota raiz
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Página de login
router.get('/login', authController.loginPage);

// Processa login
router.post('/login', authController.login);

// ---------------- ROTAS PROTEGIDAS ----------------

// Dashboard
router.get('/dashboard', isAuth, authController.dashboard);

// Criar usuário
router.post('/dashboard/usuarios', isAuth, usuarioController.create);

// Listar usuários
router.get('/dashboard/tablesUsers', isAuth, usuarioController.list);

// ---------------- EXPORT ----------------
module.exports = router;
