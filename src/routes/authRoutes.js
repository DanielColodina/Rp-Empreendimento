//Chamando os modulos da rota,controllers, e express
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const usuarioController = require('../controllers/usuarioController'); // ✅ FALTAVA ISSO
const isAuth = require('../middlewares/isAuth');



//Rota raiz redireciona para login
router.get('/', (req, res) => {
  res.redirect('/login');
});

//Pagina de login (Antes de ocorrer a validação)
router.get('/login', authController.loginPage);//Usando o "get" para pegar as informações

//Processa o login
router.post('/login', authController.login);

//Pagina apos o login "get", pegadno as informações de /dashboard
router.get('/dashboard', isAuth, authController.dashboard);

//Rota para criar usuários (POST)
router.post('/dashboard/usuarios', isAuth, usuarioController.create); 


module.exports = router;

