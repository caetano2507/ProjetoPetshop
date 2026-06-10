document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    const esqueciSenha = document.getElementById('esqueciSenha');

    // Evento de Submit do Login
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Impede o recarregamento da página

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

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

    // Função Esqueci a Senha
    esqueciSenha.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;

        if (!email) {
            alert("Digite seu e-mail no campo acima primeiro.");
            return;
        }
        alert("Recuperação enviada para: " + email);
    });
});

// Fora do DOMContentLoaded para o botão do HTML achar a função
function voltarTelaInicio() {
    window.location.href = "/"; // Ideal usar a rota do Express, ex: "/"
}