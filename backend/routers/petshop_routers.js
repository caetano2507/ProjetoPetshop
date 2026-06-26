const express = require("express");
const router = express.Router();
const path = require("path");
const conexao = require("../database/conexao.js"); // Puxa a sua conexão do banco
const nodemailer = require("nodemailer"); // Importação do Nodemailer no lugar certo
 
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
 
  // Busca o usuário correspondente no banco do Aiven
  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  conexao.query(sql, [email, senha], (erro, resultados) => {
    if (erro) {
      console.error("Erro no banco:", erro);
      return res.status(500).json({ erro: "Erro interno." });
    }
 
    if (resultados.length > 0) {
      const usuarioLogado = resultados[0];
 
      // Pega a regra diretamente da coluna do banco de dados
    
      const regraDoBanco = usuarioLogado.regra || "user"; 
 
      // Devolve a mensagem E a regra para o front-end
      return res.status(200).json({ 
        mensagem: "Login efetuado!", 
        regra: regraDoBanco 
      });
 
    } else {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }
  });
});
 
 
// ==========================================
// CRUD DE PRODUTOS (RAÇÃO)
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
 
// ==========================================
// RECUPERAÇÃO DE SENHA
// ==========================================
router.post("/esqueci-senha", async (req, res) => {
 const { email } = req.body;
 
 // Configurar o transportador do Gmail
 const transporter = nodemailer.createTransport({
 host: "smtp.gmail.com",
 port: 465,
 secure: true,
 auth: {
 user: process.env.EMAIL_REMETENTE, 
 pass: process.env.EMAIL_SENHA_APP 
 }
 });
 
 try {
 const infoEmail = {
 from: '"Royal Pet Care" <vicaetano2507@gmail.com>',
 to: email,
 subject: "Recuperação de Senha - Royal Pet 🐾",
 html: `
 <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 500px; border-radius: 8px;">
 <h2 style="color: #4A90E2; text-align: center;">Royal Pet</h2>
 <p>Olá!</p>
 <p>Recebemos um pedido para recuperar a senha da sua conta.</p>
 <p>Sua senha temporária de acesso é: <strong style="font-size: 18px; color: #d9534f;">Royal123#</strong></p>
 <p>Recomendamos alterar essa senha assim que fizer o login no sistema.</p>
 <br>
 <hr style="border: 0; border-top: 1px solid #eee;">
 <small style="color: #777;">Se você não solicitou isso, pode ignorar este e-mail com segurança.</small>
 </div>
 `
 };
 
 await transporter.sendMail(infoEmail);
 return res.status(200).json({ mensagem: "E-mail de recuperação enviado com sucesso!" });
 
 } catch (error) {
 console.error("Erro ao enviar e-mail:", error);
 return res.status(500).json({ erro: "Erro interno ao enviar o e-mail de recuperação." });
 }
});
 
// Exportação da rota
module.exports = router;
 