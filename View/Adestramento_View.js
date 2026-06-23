// AdestramentoView.js
export class AdestramentoView {
    constructor() {
        this.form = document.getElementById('form-adestramento');
        this.campoData = document.getElementById('petData');
        this.lista = document.getElementById('lista-adestramento');
        this.tituloForm = document.getElementById('titulo-form');
        this.btnSubmitForm = document.getElementById('btn-submit-form');
        this.modalAviso = document.getElementById('modalAviso');
        this.modalTexto = document.getElementById('modalTexto');
        this.modalBotoesContainer = document.getElementById('modalBotoesContainer');
    }

    getValoresFormulario() {
        return {
            nome: document.getElementById('petNome').value,
            idade: document.getElementById('petIdade').value,
            objetivo: document.getElementById('petObjetivo').value,
            data: this.campoData.value,
            hora: document.getElementById('petHora').value
        };
    }

    preencherFormulario(dados) {
        document.getElementById('petNome').value = dados.nome;
        document.getElementById('petIdade').value = dados.idade;
        document.getElementById('petObjetivo').value = dados.objetivo;
        this.campoData.value = dados.data;
        document.getElementById('petHora').value = dados.hora;
    }

    resetarFormulario() {
        this.form.reset();
        this.campoData.classList.remove('campo-invalido');
        this.tituloForm.textContent = 'Solicitar Avaliação';
        this.btnSubmitForm.textContent = 'Solicitar Avaliação por WhatsApp';
    }

    alternarModoEdicao(modoEdicao) {
        if (modoEdicao) {
            this.tituloForm.textContent = 'Alterar Solicitação';
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

    adicionarCardNaTela(pet) {
        const item = document.createElement('div');
        item.className = 'item-consulta';
        item.id = `card-${pet.id}`;
        
        // Atributos de dados para controle interno
        item.dataset.id = pet.id;
        item.dataset.nome = pet.nome;
        item.dataset.idade = pet.idade;
        item.dataset.objetivo = pet.objetivo;
        item.dataset.data = pet.data;
        item.dataset.hora = pet.hora;

        const dataFormatada = pet.data.split('-').reverse().join('/');
        const exibicaoFoco = pet.objetivo.split(' (')[0]; 
        const exibicaoIdade = pet.idade.split(' ')[0];

        item.innerHTML = `
            <div class="info-pet">
                <h3>${pet.nome}</h3>
                <p>${dataFormatada} às ${pet.hora} | <strong>Foco:</strong> ${exibicaoFoco}</p>
            </div>
            <div class="direita-bloco">
                <span class="badge-esp">${exibicaoIdade}</span>
                <div class="acoes-consulta">
                    <button class="btn-acao btn-alterar" data-acao="alterar">Alterar</button>
                    <button class="btn-acao btn-excluir" data-acao="excluir">Excluir</button>
                </div>
            </div>
        `;
        this.lista.prepend(item);
    }

    atualizarCardNaTela(id, pet) {
        const item = document.getElementById(`card-${id}`);
        if (!item) return;

        const dataFormatada = pet.data.split('-').reverse().join('/');
        
        item.querySelector('.info-pet h3').textContent = pet.nome;
        item.querySelector('.info-pet p').textContent = `${dataFormatada} às ${pet.hora} | Foco: ${pet.objetivo.split(' (')[0]}`;
        item.querySelector('.badge-esp').textContent = pet.idade.split(' ')[0];
        
        item.dataset.nome = pet.nome;
        item.dataset.idade = pet.idade;
        item.dataset.objetivo = pet.objetivo;
        item.dataset.data = pet.data;
        item.dataset.hora = pet.hora;
    }

    removerCardDaTela(id) {
        const item = document.getElementById(`card-${id}`);
        if (item) item.remove();
    }

    abrirBalaoCustomizado(mensagem, tipo, acaoConfirmar = null) {
        this.modelTexto.textContent = mensagem;
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

    abrirWhatsApp(pet) {
        const dataFormatada = pet.data.split('-').reverse().join('/');
        const msg = `Olá, vim pelo site da Royal Pet. Gostaria de agendar uma Avaliação de Adestramento:\n\n🐾 Pet: ${pet.nome}\n Idade: ${pet.idade}\n Objetivo Principal: ${pet.objetivo}\n Data Desejada: ${dataFormatada}\n Horário: ${pet.hora}`;
        const link = `https://wa.me/5511995417758?text=${encodeURIComponent(msg)}`;
        window.open(link, '_blank');
    }
}