/*
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    const esqueciSenha = document.getElementById('esqueciSenha');
    const tituloInicio = document.querySelector('.titulo'); // Seleciona o H2 da logo
 
    // Evento de Submit do Login (Disparado quando clica no botão type="submit")
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Impede o recarregamento da página
 
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
 
            console.log("Tentando realizar login para:", email);
 
            // Mandando os dados para o seu servidor Express via POST
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, senha })
                });
 
                const dados = await response.json();
 
                if (response.ok) {
                    alert("Login realizado com sucesso!");
                    window.location.href = "/dashboard"; // Redireciona usando a rota do Express
                } else {
                    alert(dados.erro || "Erro ao fazer login.");
                }
            } catch (erro) {
                console.error("Erro na requisição:", erro);
                alert("Erro ao conectar com o servidor.");
            }
        });
    }
 
    // Função Esqueci a Senha
    if (esqueciSenha) {
        esqueciSenha.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
 
            if (!email) {
                alert("Digite seu e-mail no campo acima primeiro.");
                return;
            }
            alert("Recuperação enviada para: " + email);
        });
    }
 
    // Clique no título para voltar para a raiz do Express
    if (tituloInicio) {
        tituloInicio.addEventListener('click', function() {
            window.location.href = "/"; // Rota raiz do Express
        });
    }
});
*/

/*
// backend/controller/login_controller.js
const path = require("path");
 
exports.loginForm = (req, res) => {
    // Envia o arquivo HTML de login para o navegador do usuário
    res.sendFile(path.join(__dirname, "../../loginPetshop.html"));
};
*/

// Aguarda a página carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    // Busca o formulário de login na sua tela HTML
    const formLogin = document.querySelector("form");
 
    if (formLogin) {
        formLogin.addEventListener("submit", async (event) => {
            event.preventDefault(); // Impede a página de recarregar
 
            // Pega o que o usuário digitou nos campos
            const email = document.querySelector('input[type="email"]').value;
            const senha = document.querySelector('input[type="password"]').value;
 
            try {
                // Envia os dados para o seu servidor Node (Backend) na porta 3000
                const resposta = await fetch("http://localhost:3000/petshop/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, senha })
                });
 
                const dados = await resposta.json();
 
                if (resposta.ok) {
                    alert("Login efetuado com sucesso! Redirecionando...");
                    // Redireciona o usuário para a página principal do pet shop
                    window.location.href = "atendimentoPetshop.html";
                } else {
                    alert("Erro: " + dados.erro);
                }
 
            } catch (error) {
                console.error("Erro ao conectar com o servidor:", error);
                alert("Não foi possível conectar ao servidor. O backend está ligado?");
            }
        });
    }
});