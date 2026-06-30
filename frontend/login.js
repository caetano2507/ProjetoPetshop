document.addEventListener("DOMContentLoaded", () => {
 
  // ========================================================
  // 1. COMPORTAMENTO DA TELA DE LOGIN (Mantido)
  // ========================================================
  const formLogin = document.getElementById('formLogin');
 
  if (formLogin) {
    formLogin.addEventListener('submit', async (event) => {
      event.preventDefault();
 
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
 
      try {
        const resposta = await fetch('/petshop/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha })
        });
 
        const dados = await resposta.json();
 
        if (resposta.ok) {
          // Salva a regra vinda do banco Aiven
          localStorage.setItem('usuario_regra', dados.regra);
          
          alert("Login efetuado com sucesso! 🎉");
          window.location.href = '/petshop/dashboard';
        } else {
          alert(dados.erro || "E-mail ou senha incorretos.");
        }
      } catch (erro) {
        console.error("Erro ao fazer login:", erro);
        alert("Erro ao conectar com o servidor.");
      }
    });
  }
 
  // ========================================================
  // 2. VERIFICAÇÃO DINÂMICA DO DASHBOARD (O que você alterou)
  // ========================================================
  const displayRegra = document.getElementById('user-role-display');
  const sidebarRoleText = document.getElementById('sidebar-role-text');
 
  if (displayRegra) {
    const regraUsuario = localStorage.getItem('usuario_regra');
 
    // Se alguém tentar acessar a página direto sem fazer login, chuta de volta pra tela de login
    if (!regraUsuario) {
        window.location.href = '/petshop/login';
        return;
    }
 
    if (regraUsuario === 'admin') {
        displayRegra.textContent = '👑 Administrador';
        displayRegra.style.color = '#6f42c1';
        if (sidebarRoleText) sidebarRoleText.textContent = 'Admin';
        
        document.getElementById('menu-admin-only')?.classList.remove('hidden');
        document.getElementById('pane-admin-only')?.classList.remove('hidden');
    } else {
        displayRegra.textContent = '🐾 Cliente Padrão';
        displayRegra.style.color = '#007bff';
        if (sidebarRoleText) sidebarRoleText.textContent = 'Cliente';
        
        document.getElementById('menu-admin-only')?.classList.add('hidden');
        document.getElementById('pane-admin-only')?.classList.add('hidden');
    }
  }
 
  // ========================================================
  // 3. LOGOUT SEGURO (Mantido)
  // ========================================================
  const botaoSair = document.querySelector(".logout");
  if (botaoSair) {
    botaoSair.addEventListener("click", () => {
      localStorage.removeItem("usuario_regra");
    });
  }
});