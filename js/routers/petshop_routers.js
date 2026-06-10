const express = require("express");
const router = express.Router();

const loginController = require("../controller/login_controller");
const cadastroController = require("../controller/cadastro_controller");
const atendimentoController = require("../controller/atendimento_controller");
const racaoController = require("../controller/racao_controller");
const acessoriosController = require("../controller/acessorios_controller");
const casasController = require("../controller/casas_controller");

//CADASTRAR
router.get("/cadastro", cadastroController.form);

//LOGIN
router.get("/login", loginController.loginForm);

//ROTAS (PRODUTOS E SERVIÇOS)
router.get("/atendimento", atendimentoController.index);
router.get("/racao", racaoController.index);
router.get("/acessorios", acessoriosController.index);
router.get("/casas", casasController.index);

// CRUD (RAÇÃO)
router.get("/racao", racaoController.index);
router.post("/racao", racaoController.cadastrar);
router.put("/racao/:id", racaoController.atualizar);
router.delete("/racao/:id", racaoController.deletar);

module.exports = router;