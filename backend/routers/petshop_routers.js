const express = require("express");
const router = express.Router();
const path = require("path");
const nodemailer = require("nodemailer"); // Importação do Nodemailer para o esqueci-senha
 
// IMPORTAÇÃO DAS CONTROLLERS DO BACKEND (Substituindo os Repositories daqui)
const usuarioController = require("../controllers/usuarioController");
const racaController = require("../controllers/racaController");
 
// ==========================================
// 1. ROTAS PARA ABRIR AS TELAS (HTMLs)
// ==========================================
 
// Abre a tela inicial
router.get("/inicio", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/login.html")); // Entrega o HTML com a barra lateral
});
 
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
// 2. PROCESSAMENTO DE DADOS (ROTAS -> CONTROLLERS)
// ==========================================
 
// 👤 Rotas de Usuário (Cadastro e Login delegados para a usuarioController)
router.post("/cadastrar", usuarioController.cadastrar);
router.post("/login", usuarioController.login);
 
// 🌾 Rotas de Ração (Listagem e Inserção delegadas para a racaController)
router.get("/racao", racaController.listarTodas);
router.post("/racao", racaController.cadastrar);
 
// ==========================================
// 🔒 RECUPERAÇÃO DE SENHA
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
 