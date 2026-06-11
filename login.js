document.addEventListener("DOMContentLoaded", () => {
    
    // --- SIMULAÇÃO DE SISTEMA DE PERMISSÃO ---
    // Valores de teste: mude para 'user' para ver como um cliente comum enxerga a tela
    // ou deixe 'admin' para habilitar as funções completas.
    const usuarioLogado = {
        nome: "Guilherme",
        regra: "admin" // Pode ser: 'admin' ou 'user'
    };
 
    // Pegando as referências dos elementos HTML pelas IDs
    const txtRoleDisplay = document.getElementById("user-role-display");
    const menuAdmin = document.getElementById("menu-admin-only");
    const painelAdmin = document.getElementById("pane-admin-only");
 
    // Aplicando a regra na tela
    if (usuarioLogado.regra === "admin") {
        
        // Exibe o texto de Admin no perfil do topo
        txtRoleDisplay.textContent = "Administrador";
        txtRoleDisplay.style.color = "#6f42c1";
 
        // Remove a classe 'hidden' liberando o acesso visual às rações
        menuAdmin.classList.remove("hidden");
        painelAdmin.classList.remove("hidden");
 
    } else {
        
        // Configuração para usuário comum/cliente
        txtRoleDisplay.textContent = "Cliente Padrão";
        txtRoleDisplay.style.color = "#007bff";
 
        // Garante que as áreas críticas fiquem ocultas de verdade
        menuAdmin.classList.add("hidden");
        painelAdmin.classList.add("hidden");
    }
});
 