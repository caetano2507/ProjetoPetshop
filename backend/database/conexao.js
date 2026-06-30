require('dotenv').config();

/*
const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NOME

});

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
        return;
    }
    console.log('Conectado com sucesso ao banco petshop_cadastro!');
});
 
module.exports = conexao;
*/

const mysql = require('mysql2/promise'); // para aceitar o 'await' do router!
 
const conexao = mysql.createPool({ // 'createPool' é muito melhor para servidores na nuvem
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
 
// Mensagem simples de confirmação
console.log('Pool de conexões criado com sucesso para o banco defaultdb!');
 
module.exports = conexao;