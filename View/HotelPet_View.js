// Vai capturar elementos do DOM, renderizar os cartões na lista de consultas e gerir os estados visuais dos inputs.
export class HotelPetView {
    constructor() {
        this.form = document.getElementById('form-hotel');
        this.containerConsultas = document.getElementById('lista-hotel');

        this.inputNome = document.getElementById('petNome');
        this.selectServico = document.getElementById('hotelServico');
        this.selectSocial = document.getElementById('hotelSocial');
        this.inputDataIn = document.getElementById('petData');
        this.inputDataOut = document.getElementById('petDataSaida');

        this.tituloForm = document.getElementById('titulo-form');
        this.btnSubmit = document.getElementById('btn-submit-form');
        this.containerDatas = document.getElementById('containerDatas');
        this.blocoSaida = document.getElementById('blocoSaida');
        this.labelDataEntrada = document.getElementById('labelDataEntrada');

        this.modalAviso = document.getElementById('modalAviso');
        this.modalTexto = document.getElementById('modalTexto');
        this.modalBotoesContainer = document.getElementById('modalBotoesContainer');
    }

    renderizarReservas(reservas, onDelete, onEdit) {
        if (!this.containerConsultas) return;

        this.containerConsultas.innerHTML = '';

        reservas.forEach((reserva) => {
            const card = document.createElement('div');
            card.className = 'item-consulta';

            const periodo = reserva.servico === 'Day Care'
                ? reserva.datain
                : `${reserva.datain} ate ${reserva.dataout}`;

            card.innerHTML = `
                <div class="info-pet">
                    <h3>${reserva.nome}</h3>
                    <p>Socializacao: ${reserva.social}</p>
                    <p>Periodo: ${periodo}</p>
                </div>
                <div class="direita-bloco">
                    <span class="badge-esp">${reserva.servico}</span>
                    <div class="acoes-consulta">
                        <button class="btn-acao btn-alterar" type="button">Alterar</button>
                        <button class="btn-acao btn-excluir" type="button">Excluir</button>
                    </div>
                </div>
            `;

            card.querySelector('.btn-excluir').addEventListener('click', () => onDelete(reserva.id));
            card.querySelector('.btn-alterar').addEventListener('click', () => onEdit(reserva));

            this.containerConsultas.appendChild(card);
        });
    }

    preencherFormulario(reserva) {
        this.inputNome.value = reserva.nome;
        this.selectServico.value = reserva.servico;
        this.selectSocial.value = reserva.social;
        this.inputDataIn.value = reserva.datain;
        this.inputDataOut.value = reserva.dataout;

        this.tituloForm.textContent = 'Editar Reserva';
        this.btnSubmit.textContent = 'Salvar Alteracoes';
    }

    limparFormulario() {
        this.form.reset();
        this.inputDataIn.classList.remove('campo-invalido');
        this.inputDataOut.classList.remove('campo-invalido');
        this.tituloForm.textContent = 'Reservar Vaga';
        this.btnSubmit.textContent = 'Solicitar Reserva por WhatsApp';
    }

    marcarCamposInvalidos() {
        this.inputDataIn.classList.add('campo-invalido');
        this.inputDataOut.classList.add('campo-invalido');
    }

    obterDadosCampos() {
        const servico = this.selectServico.value;
        const datain = this.inputDataIn.value;

        return {
            nome: this.inputNome.value.trim(),
            servico,
            social: this.selectSocial.value,
            datain,
            dataout: servico === 'Day Care' ? datain : this.inputDataOut.value
        };
    }

    atualizarModoServico() {
        if (!this.selectServico || !this.blocoSaida) return;

        const ehDayCare = this.selectServico.value === 'Day Care';

        this.containerDatas.classList.toggle('modo-daycare', ehDayCare);
        this.blocoSaida.style.display = ehDayCare ? 'none' : 'flex';
        this.inputDataOut.required = !ehDayCare;
        this.labelDataEntrada.textContent = ehDayCare ? 'Data do Day Care' : 'Data de Entrada (Check-in)';

        if (ehDayCare && this.inputDataIn.value) {
            this.inputDataOut.value = this.inputDataIn.value;
        }
    }

    mostrarAviso(mensagem, erro = false) {
        if (!this.modalAviso || !this.modalTexto || !this.modalBotoesContainer) {
            alert(mensagem);
            return;
        }

        this.modalAviso.classList.toggle('erro-data', erro);
        this.modalTexto.textContent = mensagem;
        this.modalBotoesContainer.innerHTML = `
            <button class="btn-modal btn-modal-confirmar" type="button">OK</button>
        `;

        this.modalAviso.classList.add('ativo');
        this.modalBotoesContainer.querySelector('button').addEventListener('click', () => {
            this.modalAviso.classList.remove('ativo');
        });
    }

    confirmarAcao(mensagem, onConfirmar) {
        if (!this.modalAviso || !this.modalTexto || !this.modalBotoesContainer) {
            if (confirm(mensagem)) onConfirmar();
            return;
        }

        this.modalAviso.classList.remove('erro-data');
        this.modalTexto.textContent = mensagem;
        this.modalBotoesContainer.innerHTML = `
            <button class="btn-modal btn-modal-cancelar" type="button">Cancelar</button>
            <button class="btn-modal btn-modal-confirmar" type="button">Confirmar</button>
        `;

        const [btnCancelar, btnConfirmar] = this.modalBotoesContainer.querySelectorAll('button');

        btnCancelar.addEventListener('click', () => {
            this.modalAviso.classList.remove('ativo');
        });

        btnConfirmar.addEventListener('click', () => {
            this.modalAviso.classList.remove('ativo');
            onConfirmar();
        });

        this.modalAviso.classList.add('ativo');
    }
}
