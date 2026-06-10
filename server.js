const express = require("express");
const cors = require("cors");


const conexao = require("./database/conexao.js");

const petshopRoutes = require("./routers/petshop_routers.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "./")));

app.use("/petshop", petshopRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

