document.addEventListener("DOMContentLoaded", () => {
 
    // 🔍 RECUPERA A REGRA VERDADEIRA QUE SALVAMOS NO LOCALSTORAGE
    // Se não houver nada (ex: alguém tentou burlar a URL), vira 'user' por segurança.
    const regraSessao = localStorage.getItem("usuario_regra") || "user";
 
    // Pegando as referências dos elementos HTML pelas IDs
    const txtRoleDisplay = document.getElementById("user-role-display");
    const menuAdmin = document.getElementById("menu-admin-only");
    const painelAdmin = document.getElementById("pane-admin-only");
 
    // Aplicando as permissões com base no valor dinâmico
    if (regraSessao === "admin") {
 
        // Exibe o texto de Admin no perfil do topo
        if (txtRoleDisplay) {
            txtRoleDisplay.textContent = "Administrador";
            txtRoleDisplay.style.color = "#6f42c1";
        }
 
        // Remove a classe 'hidden' liberando o acesso visual às rações
        if (menuAdmin) menuAdmin.classList.remove("hidden");
        if (painelAdmin) painelAdmin.classList.remove("hidden");
 
    } else {
 
        // Configuração para usuário comum / cliente padrão
        if (txtRoleDisplay) {
            txtRoleDisplay.textContent = "Cliente Padrão";
            txtRoleDisplay.style.color = "#007bff";
        }
 
        // Garante que as áreas críticas fiquem ocultas de verdade
        if (menuAdmin) menuAdmin.classList.add("hidden");
        if (painelAdmin) painelAdmin.classList.add("hidden");
    }
 
    // --- LOGOUT SEGURO ---
    // Limpa os dados de permissão do navegador quando o usuário clica em "Sair"
    const botaoSair = document.querySelector(".logout");
    if (botaoSair) {
        botaoSair.addEventListener("click", () => {
            localStorage.removeItem("usuario_regra");
        });
    }
});
 