// Recebe a lista do Controller e renderiza os cards aplicando as classes CSS e delays originais das animações
export class ServicosView {
    constructor() {
        this.containerPrincipais = document.getElementById('container-servicos-principais');
        this.containerSecundarios = document.getElementById('container-servicos-secundarios');
    }

    renderizarCatalogo(servicos) {
        this.containerPrincipais.innerHTML = '';
        this.containerSecundarios.innerHTML = '';

        servicos.forEach((servico) => {
            const cardHtml = this.criarCardHTML(servico);

            // Distribui os cards nos blocos visuais corretos de acordo com o layout original
            if (servico.posicao === 'principal') {
                this.containerPrincipais.appendChild(cardHtml);
            } else {
                this.containerSecundarios.appendChild(cardHtml);
            }
        });
    }

    criarCardHTML(servico) {
        const card = document.createElement('div');
        card.className = 'card';
        // Mantém a estrutura de delays css injetada dinamicamente
        card.style.animationDelay = servico.delay;

        card.innerHTML = `
            <div class="icon-wrap ${servico.classeIcone}">${servico.icone}</div>
            <h3 class="card-title">${servico.titulo}</h3>
            <p class="card-desc">${servico.descricao}</p>
            <a href="${servico.link}" class="btn btn-green">Saiba mais →</a>
        `;
        return card;
    }
}