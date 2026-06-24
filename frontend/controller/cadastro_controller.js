document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SELEÇÃO DOS ELEMENTOS DO HTML ---
    const btnVoltar = document.getElementById("btnVoltar");
    const btnEntrar = document.getElementById("btnEntrar");
    const tituloInicio = document.getElementById("tituloInicio");
    const formCadastro = document.getElementById("formCadastro");
 
    // --- 2. AÇÃO DO BOTÃO "VOLTAR" ---
    if (btnVoltar) {
        btnVoltar.addEventListener("click", () => {
            window.location.href = "loginPetshop.html";
        });
    }
 
    // --- 3. AÇÃO DO BOTÃO "ENTRAR" ---
    if (btnEntrar) {
        btnEntrar.addEventListener("click", () => {
            window.location.href = "loginPetshop.html";
        });
    }
 
    // --- 4. AÇÃO AO CLICAR NO TÍTULO "ROYAL PET" (Ir para Home) ---
    if (tituloInicio) {
        tituloInicio.addEventListener("click", () => {
            window.location.href = "atendimentoPetshop.html"; // Altere para o nome real da sua página inicial se for diferente
        });
    }
 
    // --- 5. ENVIO REALS DOS DADOS PARA O BANCO DE DADOS (BACKEND) ---
    if (formCadastro) {
        formCadastro.addEventListener("submit", async (event) => {
            event.preventDefault(); // Não deixa a página recarregar
 
            // Pegando os valores digitados nos campos
            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;
            const confirmarSenha = document.getElementById("confirmarSenha").value;
            const termos = document.getElementById("termos").checked;
 
            // Validações básicas antes de enviar
            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem! Tente novamente.");
                return;
            }
 
            if (!termos) {
                alert("Você precisa aceitar os termos de uso.");
                return;
            }
 
            try {
                // Envia as informações para a rota que criamos no Node (petshop_routers.js)
                const resposta = await fetch("http://localhost:3000/petshop/cadastrar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nome, email, senha })
                });
 
                const dados = await resposta.json();
 
                if (resposta.ok) {
                    alert(`Bem-vindo(a), ${nome}! Sua conta Royal Pet foi criada com sucesso.`);
                    window.location.href = "loginPetshop.html"; // Vai para a tela de login após cadastrar
                } else {
                    alert("Erro ao cadastrar: " + dados.erro);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
                alert("Não foi possível conectar ao servidor. Verifique se o Node está rodando.");
            }
        });
    }
});