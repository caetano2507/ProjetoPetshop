
 /*
 // Pegamos/Selecionamos o formulário
    const form = document.getElementById('formCadastro');

    form.addEventListener('submit', function(event) {
        // Impede a página de ficar recarregando
        event.preventDefault();
 
        // Pegando os valores dos campos
        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
        const termos = document.getElementById('termos').checked;
 
        // Lógica de validação da senha e termos
        if (senha !== confirmarSenha) {
            alert(" As senhas não coincidem! Tente novamente.");
            return;
        }
 
        if (!termos) {
            alert(" Você precisa aceitar os termos de uso.");
            return;
        }
 
        // Simulação de sucesso
        alert(` Bem-vindo(a), ${nome}! Sua conta Royal Pet foi criada.`);
        
        // Aqui enviaria os dados para o seu servidor
        console.log("Dados prontos para envio:", { nome, senha });
    });
    */
/*
// --- 1. SELEÇÃO DOS ELEMENTOS DO HTML ---
const form = document.getElementById('formCadastro');
const btnVoltar = document.getElementById('btnVoltar');
const btnEntrar = document.getElementById('btnEntrar');
const tituloInicio = document.getElementById('tituloInicio');
 
// --- 2. FUNÇÕES DE NAVEGAÇÃO DOS BOTÕES ---
function voltarLogin() {
    console.log("Botão Voltar clicado!");
    window.location.href = "loginPetshop.html";
}
 
function entrar() {
    console.log("Botão Entrar clicado!");
    window.location.href = "loginPetshop.html";
}
 
function voltarTelaInicio() {
    console.log("Título Royal Pet clicado!");
    window.location.href = "Telainicio.html";
}
 
// --- 3. VINCULANDO OS CLIQUES AOS BOTÕES ---
if (btnVoltar) {
    btnVoltar.addEventListener('click', voltarLogin);
}
 
if (btnEntrar) {
    btnEntrar.addEventListener('click', entrar);
}
 
if (tituloInicio) {
    tituloInicio.addEventListener('click', voltarTelaInicio);
}
 
 
// --- 4. SUA LÓGICA ORIGINAL DE CADASTRO (FORMULÁRIO) ---
form.addEventListener('submit', function(event) {
    // Impede a página de ficar recarregando
    event.preventDefault();
 
    // Pegando os valores dos campos
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const termos = document.getElementById('termos').checked;
 
    // Lógica de validação da senha e termos
    if (senha !== confirmarSenha) {
        alert(" As senhas não coincidem! Tente novamente.");
        return;
    }
 
    if (!termos) {
        alert(" Você precisa aceitar os termos de uso.");
        return;
    }
 
    // Simulação de sucesso
    alert(` Bem-vindo(a), ${nome}! Sua conta Royal Pet foi criada.`);
 
    // Aqui enviaria os dados para o seu servidor
    console.log("Dados prontos para envio:", { nome, senha });
});
*/

// Exemplo de como deve estar no comecinho ou fim da função do formulário no backend:
exports.form = (req, res) => {
    // Como o server.js está na pasta backend, para achar o html ele faz:
    const path = require("path");
    res.sendFile(path.join(__dirname, "../cadastroPetshop.html"));
};
 