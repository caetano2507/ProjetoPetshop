// Aguarda a página carregar completamente
document.addEventListener("DOMContentLoaded", () => {
 
  const formLogin = document.getElementById("loginForm"); 
  const esqueciSenha = document.getElementById("esqueciSenha");
  const tituloInicio = document.querySelector(".titulo");
 
  // --- PROCESSO DE LOGIN (BOTÃO ENTRAR) ---
  if (formLogin) {
    formLogin.addEventListener("submit", async (event) => {
      event.preventDefault(); // Impede a página de recarregar e quebrar o envio
 
      // Captura o que o usuário digitou usando os IDs exatos do seu loginPetshop.html
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
 
      try {
        // Envia os dados para o seu Backend oficial rodando no localhost:3000
        const resposta = await fetch("http://localhost:3000/petshop/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, senha })
        });
 
        const dados = await resposta.json();
 
        if (resposta.ok) {
          // SALVA A REGRA DO BANCO DA AIVEN NO NAVEGADOR ('admin' ou 'user')
          localStorage.setItem("usuario_regra", dados.regra);
 
          alert("Login efetuado com sucesso! Redirecionando...");
          
          // REDIRECIONA PARA A ROTA QUE ABRE O DASHBOARD (login.html)
          window.location.href = "/petshop/dashboard";
        } else {
          // Mostra o erro exato vindo do banco (ex: E-mail ou senha incorretos)
          alert("Erro: " + (dados.erro || "Credenciais inválidas."));
        }
 
      } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Não foi possível conectar ao servidor. O seu backend (node server.js) está ligado?");
      }
    });
  }
 
  // --- LÓGICA DO "ESQUECI A SENHA" ---
  if (esqueciSenha) {
    esqueciSenha.addEventListener("click", (event) => {
      event.preventDefault(); 
 
      const emailInput = document.getElementById("email");
      const email = emailInput ? emailInput.value : "";
 
      if (!email) {
        alert("Por favor, digite seu e-mail no campo acima primeiro para podermos recuperá-lo.");
        return;
      }
 
      alert("Uma instrução de recuperação de senha foi enviada para o e-mail: " + email);
    });
  }
 
  // --- CLIQUE NA LOGO/TÍTULO PARA FAZER REFRESH NA TELA ---
  if (tituloInicio) {
    tituloInicio.style.cursor = "pointer";
    tituloInicio.addEventListener("click", () => {
      window.location.href = "/petshop/login";
    });
  }
});
 