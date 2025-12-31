

// Core
const express = require('express');
const app = express();
const path = require('path');

// View engine
const exphbs = require('express-handlebars');

// Middlewares
const bodyParser = require('body-parser');
const session = require('express-session');
const rateLimit = require('express-rate-limit');

// Rotas
const authRoutes = require('./src/routes/authRoutes');


console.log('STATIC DIR:', path.join(__dirname, 'public'));


// ---------------- VIEW ENGINE ----------------
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

// ---------------- MIDDLEWARES ----------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: '$2a$12$aP4ruFadminsHIzLCaPI4SLYQhbegiPDsXrxOvVc3YSq3czaL1KwKsCiAT2',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}));

// ---------------- RATE LIMIT LOGIN ----------------
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  message: 'Muitas tentativas de login. Tente novamente mais tarde.'
});

app.use('/login', loginLimiter);

// ---------------- ROTAS ----------------
app.use('/', authRoutes);

// ---------------- SERVER ----------------
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000!');
});
