const express = require("express");
const router = express.Router();
const path = require("path");
const conexao = require("../database/conexao.js"); // Puxa a sua conexão do banco
 
// ==========================================
// 1. ROTAS PARA ABRIR AS TELAS (HTMLs)
// ==========================================
 
// Abre a tela de cadastro
router.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/cadastroPetshop.html"));
});
 
// Abre a tela de login
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/loginPetshop.html"));
});
 
// Abre as outras telas
router.get("/atendimento", (req, res) => res.sendFile(path.join(__dirname, "../../frontend/atendimentoPetshop.html")));
router.get("/racao-tela", (req, res) => res.sendFile(path.join(__dirname, "../../frontend/racaoPetshop.html")));
router.get("/acessorios", (req, res) => res.sendFile(path.join(__dirname, "../../frontend/acessoriosPetshop.html")));
router.get("/casas", (req, res) => res.sendFile(path.join(__dirname, "../../frontend/casasPetshop.html")));
 
 
// ==========================================
// 2. PROCESSAMENTO DE DADOS (BANCO DE DADOS)
// ==========================================
 
// Enviar os dados do Cadastro para o Banco
router.post("/cadastrar", (req, res) => {
    const { nome, email, senha } = req.body;
 
    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios!" });
    }
 
    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    conexao.query(sql, [nome, email, senha], (erro, resultado) => {
        if (erro) {
            console.error("Erro ao inserir no banco:", erro);
            return res.status(500).json({ erro: "Erro ao salvar no banco." });
        }
        return res.status(201).json({ mensagem: "Conta criada com sucesso!" });
    });
});
 
// Verificar o Login no Banco
router.post("/login", (req, res) => {
    const { email, senha } = req.body;
 
    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    conexao.query(sql, [email, senha], (erro, resultados) => {
        if (erro) {
            console.error("Erro no banco:", erro);
            return res.status(500).json({ erro: "Erro interno." });
        }
        if (resultados.length > 0) {
            return res.status(200).json({ mensagem: "Login efetuado!" });
        } else {
            return res.status(401).json({ erro: "E-mail ou senha incorretos." });
        }
    });
});
 
 
// ==========================================
// 3. CRUD DE PRODUTOS (RAÇÃO)
// ==========================================
router.get("/racao", (req, res) => {
    conexao.query("SELECT * FROM racao", (erro, resultados) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar rações." });
        res.json(resultados);
    });
});
 
router.post("/racao", (req, res) => {
    const { nome, preco } = req.body;
    conexao.query("INSERT INTO racao (nome, preco) VALUES (?, ?)", [nome, preco], (erro) => {
        if (erro) return res.status(500).json({ erro: "Erro ao cadastrar ração." });
        res.status(201).json({ mensagem: "Ração cadastrada!" });
    });
});
 
module.exports = router;
