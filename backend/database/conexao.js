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

const mysql = require('mysql2');
 
const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '', // Vazio para o XAMPP
    database: 'petshop_cadastro'
});
 
conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
        return;
    }
    console.log('Conectado com sucesso ao banco petshop_cadastro!');
});
 
module.exports = conexao;
