baseUrl = "https://projetopetshop.onrender.com/"
document.addEventListener("DOMContentLoaded", () => {
    const formCadastro = document.getElementById("formCadastro"); // Certifique-se de que a tag <form> no seu cadastroPetshop.html tenha id="formCadastro"
 
    if (formCadastro) {
        formCadastro.addEventListener("submit", async (event) => {
            event.preventDefault(); // Impede a página de recarregar e quebrar a requisição
 
            // Captura os valores dos inputs do HTML pelos IDs corretos
            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;
            const confirmarSenha = document.getElementById("confirmarSenha").value;
 
            // Validação de segurança básica no frontend
            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem!");
                return;
            }
 
            try {
                // Envia os dados para a rota correta do seu servidor Node
                const resposta = await fetch(`${baseUrl}cadastrar`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nome, email, senha }) // Chaves exatas que o banco espera
                });
 
                const dados = await resposta.json();
 
                if (resposta.ok) {
                    alert("Conta criada com sucesso! 🎉 Redirecionando para o login...");
                    window.location.href = "/petshop/login"; // Joga o usuário de volta para a tela de loginPetshop.html
                } else {
                    alert("Erro do servidor: " + (dados.erro || "Não foi possível cadastrar."));
                }
 
            } catch (error) {
                console.error("Erro na requisição de cadastro:", error);
                alert("Não foi possível conectar ao servidor backend.");
            }
        });
    }
});
 