require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path"); 
 
const conexao = require("./database/conexao.js"); // ➔ O server só inicia a conexão que você configurou acima
const petshopRoutes = require("./routers/petshop_routers.js");
 
const app = express();
// Garante que o Node consiga ler a pasta style e as imagens do frontend
app.use(express.static(path.join(__dirname, '../frontend')));
 
app.use(cors());
app.use(express.json());
 
app.use(express.static(path.join(__dirname, "./")));
 
app.use("/petshop", petshopRoutes);
 
app.listen(process.env.DB_PORT || 3000, () => {
 console.log(`Servidor rodando na porta ${process.env.DB_PORT || 3000}`);
});
 