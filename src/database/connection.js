//Aqui no Controllers criando e solicitando o banco de dados 
const mysql = require('mysql2/promise');

//Criando Conexão com o bando de dados, elemtnos de id, email, senha e a database
 const connection = mysql.createPool ({
    host:'localhost',
    user: 'root', 
    password: '',
    database:'rp_empreendimentos'
 });

module.exports = connection;