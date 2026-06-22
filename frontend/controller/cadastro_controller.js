 // Pegamos/Selecionamos o formulário
    const form = document.getElementById('formCadastro');

    //Criei a função voltar
    function voltarLogin() {
    window.location.href = "/frontend/loginPetshop.html";  //Local para onde vai voltar
}
 
    function entrar() {
    window.location.href ="loginPetshop.html";
    }

    function voltarTelaInicio() {
    window.location.href = "Telainicio.html";
    }

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