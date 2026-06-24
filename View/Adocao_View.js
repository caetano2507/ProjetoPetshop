export class AdocaoView {
    constructor() {
        this.form = document.getElementById('form-adocao');
        this.campoPetNome = document.getElementById('petNome');
        this.campoAdotanteNome = document.getElementById('adotanteNome');
        this.campoData = document.getElementById('petData');
        this.campoHora = document.getElementById('petHora');
        this.lista = document.getElementById('lista-adocao');
        this.tituloForm = document.getElementById('titulo-form');
        this.btnSubmitForm = document.getElementById('btn-submit-form');
        this.modalAviso = document.getElementById('modalAviso');
        this.modalTexto = document.getElementById('modalTexto');
        this.modalBotoesContainer = document.getElementById('modalBotoesContainer');
        this.secaoFormulario = document.getElementById('secaoFormulario');
        this.vitrine = document.querySelector('.grid-pets');
    }

    getValoresFormulario() {
        return {
            petnome: this.campoPetNome.value,
            adotantenome: this.campoAdotanteNome.value,
            data: this.campoData.value,
            hora: this.campoHora.value
        };
    }

    preencherFormulario(dados) {
        this.campoPetNome.value = dados.petnome;
        this.campoAdotanteNome.value = dados.adotantenome;
        this.campoData.value = dados.data;
        this.campoHora.value = dados.hora;
    }

    resetarFormulario() {
        this.form.reset();
        this.campoData.classList.remove('campo-invalido');
        this.tituloForm.textContent = 'Agendar Visita de Conhecimento';
        this.btnSubmitForm.textContent = 'Enviar Intenção por WhatsApp';
    }

    alternarModoEdicao(modoEdicao) {
        if (modoEdicao) {
            this.tituloForm.textContent = 'Alterar Agendamento de Visita';
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

    focarFormularioComPet(nomePet) {
        this.campoPetNome.value = nomePet;
        this.secaoFormulario.scrollIntoView({ behavior: 'smooth' });
    }

    adicionarCardNaTela(visita) {
        const item = document.createElement('div');
        item.className = 'item-consulta';
        item.id = `card-${visita.id}`;
        
        item.dataset.id = visita.id;
        item.dataset.petnome = visita.petnome;
        item.dataset.adotantenome = visita.adotantenome;
        item.dataset.data = visita.data;
        item.dataset.hora = visita.hora;

        const dataFormatada = visita.data.split('-').reverse().join('/');

        item.innerHTML = `
            <div class="info-pet">
                <h3>Visita para conhecer: ${visita.petnome}</h3>
                <p>Agendado por <strong>${visita.adotantenome}</strong> em ${dataFormatada} às ${visita.hora}</p>
            </div>
            <div class="direita-bloco">
                <span class="badge-esp">Pendente</span>
                <div class="acoes-consulta">
                    <button class="btn-acao btn-alterar" data-acao="alterar">Alterar</button>
                    <button class="btn-acao btn-excluir" data-acao="excluir">Excluir</button>
                </div>
            </div>
        `;
        this.lista.prepend(item);
    }

    atualizarCardNaTela(id, visita) {
        const item = document.getElementById(`card-${id}`);
        if (!item) return;

        const dataFormatada = visita.data.split('-').reverse().join('/');
        
        item.querySelector('.info-pet h3').textContent = `Visita para conhecer: ${visita.petnome}`;
        item.querySelector('.info-pet p').innerHTML = `Agendado por <strong>${visita.adotantenome}</strong> em ${dataFormatada} às ${visita.hora}`;
        
        item.dataset.petnome = visita.petnome;
        item.dataset.adotantenome = visita.adotantenome;
        item.dataset.data = visita.data;
        item.dataset.hora = visita.hora;
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

    abrirWhatsApp(visita) {
        const dataFormatada = visita.data.split('-').reverse().join('/');
        const msg = `Olá, vim pelo site da Royal Pet! Tenho grande interesse no processo de adoção:\n\n🐾 Pet escolhido: ${visita.petnome}\n👤 Nome do Interessado: ${visita.adotantenome}\n📅 Data da Entrevista/Visita: ${dataFormatada}\n⏰ Horário: ${visita.hora}\n\nEstou ansioso para conhecê-lo!`;
        const link = `https://wa.me/5511995417758?text=${encodeURIComponent(msg)}`;
        window.open(link, '_blank');
    }
}