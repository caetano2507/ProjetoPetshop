// Esse bichinho é responsável por capturar o formulário gerenciar o modal de avisos e atualizar os elementos da pagina visualmente 
export class Banho_tosaView {
    constructor() {
        this.form = document.getElementById('form-estetica');
        this.campoNome = document.getElementById('petNome');
        this.campoEspecie = document.getElementById('petEspecie');
        this.campoRaca = document.getElementById('petRaca');
        this.campoPorte = document.getElementById('petPorte');
        this.campoData = document.getElementById('petData');
        this.campoHora = document.getElementById('petHora');
        this.lista = document.getElementById('lista-estetica');
        this.tituloForm = document.getElementById('titulo-form');
        this.btnSubmitForm = document.getElementById('btn-submit-form');
        this.modalAviso = document.getElementById('modalAviso');
        this.modalTexto = document.getElementById('modalTexto');
        this.modalBotoesContainer = document.getElementById('modalBotoesContainer');
    }

    getValoresFormulario() {
        return {
            nome: this.campoNome.value,
            especie: this.campoEspecie.value,
            raca: this.campoRaca.value,
            porte: this.campoPorte.value,
            data: this.campoData.value,
            hora: this.campoHora.value
        };
    }

    preencherFormulario(dados) {
        this.campoNome.value = dados.nome;
        this.campoEspecie.value = dados.especie;
        this.campoRaca.value = dados.raca;
        this.campoPorte.value = dados.porte;
        this.campoData.value = dados.data;
        this.campoHora.value = dados.hora;
    }

    resetarFormulario() {
        this.form.reset();
        this.campoData.classList.remove('campo-invalido');
        this.tituloForm.textContent = 'Agendar Horário';
        this.btnSubmitForm.textContent = 'Agendar Banho e Tosa';
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

    marcarDataInvalida(invalido) {
        if (invalido) {
            this.campoData.classList.add('campo-invalido');
        } else {
            this.campoData.classList.remove('campo-invalido');
        }
    }

    adicionarCardNaTela(agendamento) {
        const item = document.createElement('div');
        item.className = 'item-consulta';
        item.id = `card-${agendamento.id}`;
        
        item.dataset.id = agendamento.id;
        item.dataset.nome = agendamento.nome;
        item.dataset.especie = agendamento.especie;
        item.dataset.raca = agendamento.raca;
        item.dataset.porte = agendamento.porte;
        item.dataset.data = agendamento.data;
        item.dataset.hora = agendamento.hora;

        const dataFormatada = agendamento.data.split('-').reverse().join('/');
        const exibicaoPorte = agendamento.porte.split(' ')[0];

        item.innerHTML = `
            <div class="info-pet">
                <h3>${agendamento.nome} (${agendamento.especie})</h3>
                <p>${dataFormatada} às ${agendamento.hora} | Raça: ${agendamento.raca}</p>
            </div>
            <div class="direita-bloco">
                <span class="badge-esp">Porte ${exibicaoPorte}</span>
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
        const exibicaoPorte = agendamento.porte.split(' ')[0];
        
        item.querySelector('.info-pet h3').textContent = `${agendamento.nome} (${agendamento.especie})`;
        item.querySelector('.info-pet p').textContent = `${dataFormatada} às ${agendamento.hora} | Raça: ${agendamento.raca}`;
        item.querySelector('.badge-esp').textContent = `Porte ${exibicaoPorte}`;
        
        item.dataset.nome = agendamento.nome;
        item.dataset.especie = agendamento.especie;
        item.dataset.raca = agendamento.raca;
        item.dataset.porte = agendamento.porte;
        item.dataset.data = agendamento.data;
        item.dataset.hora = agendamento.hora;
    }

    removerCardDaTela(id) {
        const item = document.getElementById(`card-${id}`);
        if (item) item.remove();
    }

    abrirBalaoCustomizado(mensagem, tipo, acaoConfirmar = null) {
        this.modalTexto.textContent = mensagem;
        this.modalBotoesContainer.innerHTML = ''; 
        this.modalAviso.classList.remove('erro-data');

        if (tipo === 'alerta-erro') {
            this.modalAviso.classList.add('erro-data');
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
        const msg = `Olá, vim pelo site da Royal Pet. Gostaria de agendar um Banho e Tosa para o meu pet:\n\n• Nome: ${agendamento.nome}\n• Espécie: ${agendamento.especie}\n• Raça: ${agendamento.raca}\n• Porte: ${agendamento.porte}\n• Data: ${dataFormatada}\n• Horário: ${agendamento.hora}`;
        const link = `https://wa.me/5511995417758?text=${encodeURIComponent(msg)}`;
        window.open(link, '_blank');
    }
}