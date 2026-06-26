require('dotenv').config(); // ➔ Corrigido para "require" minúsculo
const express = require("express");
const cors = require("cors");
const path = require("path");
 
const conexao = require("./database/conexao.js"); 
const petshopRoutes = require("./routers/petshop_routers.js");
 
const app = express();
 
// Garante que o Node consiga ler a pasta style e as imagens do frontend
app.use(express.static(path.join(__dirname, '../frontend')));
 
app.use(cors());
app.use(express.json());
 
app.use(express.static(path.join(__dirname, "./")));
 
app.use("/petshop", petshopRoutes);
 

const PORTA_SERVIDOR = process.env.PORT || 3000;
 
app.listen(PORTA_SERVIDOR, () => {
 console.log(`Servidor rodando na porta ${PORTA_SERVIDOR}`);
});
 