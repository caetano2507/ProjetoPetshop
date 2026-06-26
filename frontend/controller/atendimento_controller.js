//Volta pra "Telainicio.html"
function voltarTelaInicio() {
        window.location.href = "Telainicio.html";
        }

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalAtendimento");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalTexto = document.getElementById("modalTexto");
    const btnFechar = document.getElementById("fecharModal");
 
    // Elementos dos Cards
    const cardPedido = document.getElementById("cardPedido");
    const cardProdutos = document.getElementById("cardProdutos");
    const cardTrocas = document.getElementById("cardTrocas");
    const cardHorarios = document.getElementById("cardHorarios");
    const cardServicos = document.getElementById("cardServicos");
    const cardUnidades = document.getElementById("cardUnidades"); // Puxa o card novo
 
    // Lista de Respostas dos cards
    const respostas = {
        pedido: {
            titulo: "Status do Pedido 📦",
            texto: "Para rastrear a entrega ou retirada dos produtos do seu pet, faça login na sua conta e acesse a aba 'Meus Pedidos' no painel principal."
        },
        produtos: {
            titulo: "Disponibilidade de Produtos 🛒",
            texto: "Nosso estoque é atualizado em tempo real! Você pode conferir os produtos disponíveis navegando pelas abas 'Rações' e 'Acessórios' no menu superior."
        },
        trocas: {
            titulo: "Trocas e Devoluções 🔄",
            texto: "Você tem até 7 dias corridos após o recebimento para solicitar a troca ou devolução de qualquer item. Isso pode ser feito direto na nossa loja física ou pelo e-mail suporte@royalpet.com."
        },
        horarios: {
            titulo: "Horários de Funcionamento ⏰",
            texto: "Estamos prontos para receber você e seu pet nos seguintes horários:<br><br>• <strong>Segunda a Sexta:</strong> 08h às 20h<br>• <strong>Sábados e Feriados:</strong> 09h às 16h<br>• <strong>Domingos:</strong> Fechado"
        },
        servicos: {
            titulo: "Agendamento de Serviços 🐾",
            texto: "Oferecemos serviços profissionais de Banho, Tosa e Consultas Veterinárias. Para agendar um horário, mande uma mensagem no nosso WhatsApp de atendimento: <strong>(11) 995417758</strong>."
        },
        unidades: {
            titulo: "Nossas Unidades 📍",
            texto: "Venha nos visitar com o seu pet! Nossa loja principal fica na **Avenida Principal, 1230 - Centro**. Temos estacionamento gratuito e um espaço pet esperando por vocês!"
        }
    };
 
    function abrirModal(chave) {
        modalTitulo.innerHTML = respostas[chave].titulo;
        modalTexto.innerHTML = respostas[chave].texto;
        modal.style.display = "flex";
    }
 
    // Ouvintes de clique
    if (cardPedido) cardPedido.addEventListener("click", () => abrirModal("pedido"));
    if (cardProdutos) cardProdutos.addEventListener("click", () => abrirModal("produtos"));
    if (cardTrocas) cardTrocas.addEventListener("click", () => abrirModal("trocas"));
    if (cardHorarios) cardHorarios.addEventListener("click", () => abrirModal("horarios"));
    if (cardServicos) cardServicos.addEventListener("click", () => abrirModal("servicos"));
    if (cardUnidades) cardUnidades.addEventListener("click", () => abrirModal("unidades")); // Evento do card novo
 
    btnFechar.addEventListener("click", () => modal.style.display = "none");
 
    window.addEventListener("click", (event) => {
        if (event.target === modal) modal.style.display = "none";
    });
});
 