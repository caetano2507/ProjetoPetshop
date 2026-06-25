// Esse bichinho gerencia estritamente a manipulação do DOM(é uma interface que o navegador utiliza para representar o conteúdo de uma página web); captura os valores do formulário, exibe/esconde os cards extras de especialidades, abre o modal customizado e atualiza a listagem visual
export class ConsultaView {
    constructor() {
        this.form = document.getElementById('form-consulta');
        this.campoNome = document.getElementById('petNome');
        this.campoEspecie = document.getElementById('petEspecie');
        this.campoEsp = document.getElementById('petEsp');
        this.campoData = document.getElementById('petData');
        this.campoHora = document.getElementById('petHora');
        this.lista = document.getElementById('lista-consultas');
        this.tituloForm = document.getElementById('titulo-form');
        this.btnSubmitForm = document.getElementById('btn-submit-form');
        this.btnToggleEsp = document.getElementById('btn-toggle-especialidades');
        this.modalAviso = document.getElementById('modalAviso');
        this.modalTexto = document.getElementById('modalTexto');
        this.modalBotoesContainer = document.getElementById('modalBotoesContainer');
    }

    getValoresFormulario() {
        return {
            nome: this.campoNome.value,
            especie: this.campoEspecie.value,
            esp: this.campoEsp.value,
            data: this.campoData.value,
            hora: this.campoHora.value
        };
    }

    preencherFormulario(dados) {
        this.campoNome.value = dados.nome;
        this.campoEspecie.value = dados.especie;
        this.campoEsp.value = dados.esp;
        this.campoData.value = dados.data;
        this.campoHora.value = dados.hora;
    }

    resetarFormulario() {
        this.form.reset();
        this.tituloForm.textContent = 'Agendar Consulta';
        this.btnSubmitForm.textContent = 'Agendar Consulta';
    }

    alternarModoEdicao(modoEdicao) {
        if (modoEdicao) {
            this.tituloForm.textContent = 'Alterar Agendamento';
            this.btnSubmitForm.textContent = 'Salvar Alterações e Enviar';
            this.tituloForm.scrollIntoView({ behavior: 'smooth' });
        } else {
            this.resetarFormulario();
        }
    }

    configurarToggleEspecialidades() {
        const cards = document.querySelectorAll('.card');
        if (cards.length < 5) return;
        
        const estaEscondido = cards[4].classList.contains('escondido');

        if (estaEscondido) {
            cards.forEach((card, index) => {
                if (index >= 4) card.classList.remove('escondido');
            });
            this.btnToggleEsp.textContent = 'Ver menos';
        } else {
            cards.forEach((card, index) => {
                if (index >= 4) card.classList.add('escondido');
            });
            this.btnToggleEsp.textContent = 'Ver mais especialidades';
        }
    }

    adicionarCardNaTela(agendamento) {
        const item = document.createElement('div');
        item.className = 'item-consulta';
        item.id = `card-${agendamento.id}`;
        
        item.dataset.id = agendamento.id;
        item.dataset.nome = agendamento.nome;
        item.dataset.especie = agendamento.especie;
        item.dataset.esp = agendamento.esp;
        item.dataset.data = agendamento.data;
        item.dataset.hora = agendamento.hora;

        const dataFormatada = agendamento.data.split('-').reverse().join('/');

        item.innerHTML = `
            <div class="info-pet">
                <h3>${agendamento.nome}</h3>
                <p>${dataFormatada} às ${agendamento.hora}</p>
            </div>
            <div class="direita-bloco">
                <span class="badge-esp">${agendamento.esp}</span>
                <div class="acoes-consulta">
                    <button class="btn-acao btn-alterar" data-acao="alterar">Alterar</button>
                    <button class="btn-acao btn-excluir" data-acao="excluir">Excluir</button>
                </div>
            </div>
        `;
        this.lista.prepend(item);
    }

    atualizarCardNaTela(id, agendamento) {
        const item = document.getElementById(`card-${id}`);
        if (!item) return;

        const dataFormatada = agendamento.data.split('-').reverse().join('/');
        
        item.querySelector('.info-pet h3').textContent = agendamento.nome;
        item.querySelector('.info-pet p').textContent = `${dataFormatada} às ${agendamento.hora}`;
        item.querySelector('.badge-esp').textContent = agendamento.esp;
        
        item.dataset.nome = agendamento.nome;
        item.dataset.especie = agendamento.especie;
        item.dataset.esp = agendamento.esp;
        item.dataset.data = agendamento.data;
        item.dataset.hora = agendamento.hora;
    }

    removerCardDaTela(id) {
        const item = document.getElementById(`card-${id}`);
        if (item) item.remove();
    }

    abrirBalaoCustomizado(mensagem, tipo, acaoConfirmar = null) {
        this.modalTexto.textContent = mensagem; 

        if (tipo === 'alerta') {
            const btnOk = document.createElement('button');
            btnOk.className = 'btn-modal btn-modal-confirmar';
            btnOk.textContent = 'Ok';
            btnOk.onclick = () => this.fecharBalaoCustomizado();
            this.modalBotoesContainer.appendChild(btnOk);
        } else if (tipo === 'confirmacao') {
            const btnCancelar = document.createElement('button');
            btnCancelar.className = 'btn-modal btn-modal-cancelar';
            btnCancelar.textContent = 'Cancelar';
            btnCancelar.onclick = () => this.fecharBalaoCustomizado();

            const btnConfirmar = document.createElement('button');
            btnConfirmar.className = 'btn-modal btn-modal-confirmar';
            btnConfirmar.textContent = 'Confirmar';
            btnConfirmar.onclick = () => {
                acaoConfirmar();
                this.fecharBalaoCustomizado();
            };

            this.modalBotoesContainer.appendChild(btnCancelar);
            this.modalBotoesContainer.appendChild(btnConfirmar);
        }
        this.modalAviso.classList.add('ativo');
    }

    fecharBalaoCustomizado() {
        this.modalAviso.classList.remove('ativo');
    }

    abrirWhatsApp(agendamento) {
        const dataFormatada = agendamento.data.split('-').reverse().join('/');
        const msg = `Olá, vim pelo site da Royal Pet. Gostaria de agendar uma consulta de ${agendamento.esp} para o meu pet ${agendamento.nome} no dia ${dataFormatada} às ${agendamento.hora}.`;
        const link = `https://wa.me/5511995417758?text=${encodeURIComponent(msg)}`;
        window.open(link, '_blank');
    }
}