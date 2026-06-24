// Aguarda a página carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    const formLogin = document.querySelector("form");
    const esqueciSenha = document.getElementById("esqueciSenha");
    const tituloInicio = document.querySelector(".titulo"); // Se tiver a classe 'titulo' no H2 da logo
 
    // --- 1. PROCESSO DE LOGIN (BOTÃO ENTRAR / SUBMIT) ---
    if (formLogin) {
        formLogin.addEventListener("submit", async (event) => {
            event.preventDefault(); // Impede a página de recarregar
 
            // Pega o que o usuário digitou nos campos por ID ou seletor estável
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
 
    // --- 2. LÓGICA DO "ESQUECI A SENHA" ---
    if (esqueciSenha) {
        esqueciSenha.addEventListener("click", (event) => {
            event.preventDefault(); // Impede o link de atualizar a página
 
            // Busca o campo de e-mail atual da tela
            const emailInput = document.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value : "";
 
            // Valida se o usuário preencheu o e-mail antes de clicar
            if (!email) {
                alert("Por favor, digite seu e-mail no campo acima primeiro para podermos recuperá-lo.");
                return;
            }
 
            // Simulação de sucesso exigida no front para o trabalho
            alert("Uma instrução de recuperação de senha foi enviada para o e-mail: " + email);
        });
    }
 
    // --- 3. CLIQUE NA LOGO/TÍTULO PARA IR PARA A HOME ---
    if (tituloInicio) {
        tituloInicio.style.cursor = "pointer"; // Deixa a setinha do mouse como clique
        tituloInicio.addEventListener("click", () => {
            window.location.href = "atendimentoPetshop.html";
        });
    }
});
 