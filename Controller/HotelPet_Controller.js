//Vai centraliza e coordena o fluxo entre o modelo e a tela, incluindo os modos de criação, edição e exclusão de reservas
import { HotelPetModel } from '../Model/HotelPet_Model.js';
import { HotelPetView } from '../View/HotelPet_View.js';

class HotelPetController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.idReservaEmEdicao = null;

        this.init();
    }

    init() {
        this.configurarDatasLimites();
        this.atualizarLista();
        this.configurarEventos();
        this.view.atualizarModoServico();
    }

    configurarDatasLimites() {
        const hoje = new Date().toISOString().split('T')[0];
        if (this.view.inputDataIn) this.view.inputDataIn.min = hoje;
        if (this.view.inputDataOut) this.view.inputDataOut.min = hoje;
    }

    atualizarLista() {
        const reservas = this.model.obterReservas();
        this.view.renderizarReservas(
            reservas,
            (id) => this.handleDeletar(id),
            (reserva) => this.handleIniciarEdicao(reserva)
        );
    }

    configurarEventos() {
        if (this.view.selectServico) {
            this.view.selectServico.addEventListener('change', () => {
                this.view.atualizarModoServico();
            });
        }

        if (this.view.inputDataIn) {
            this.view.inputDataIn.addEventListener('change', () => {
                if (this.view.inputDataIn.value) {
                    this.view.inputDataOut.min = this.view.inputDataIn.value;

                    if (this.view.selectServico.value === 'Day Care') {
                        this.view.inputDataOut.value = this.view.inputDataIn.value;
                    }
                }
            });
        }

        if (this.view.form) {
            this.view.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSalvarReserva();
            });
        }
    }

    handleSalvarReserva() {
        const dados = this.view.obterDadosCampos();

        if (!dados.nome) {
            this.view.mostrarAviso('Por favor, informe o nome do Pet.');
            return;
        }

        const datasValidas = this.model.validarPeriodo(dados.datain, dados.dataout, dados.servico);
        if (!datasValidas) {
            this.view.mostrarAviso('Periodo de reserva invalido! A data de saida deve ser posterior a data de entrada.', true);
            this.view.marcarCamposInvalidos();
            return;
        }

        let reservas = this.model.obterReservas();

        if (this.idReservaEmEdicao) {
            reservas = reservas.map((reserva) => {
                if (reserva.id === this.idReservaEmEdicao) {
                    return { ...dados, id: this.idReservaEmEdicao };
                }

                return reserva;
            });

            this.idReservaEmEdicao = null;
            this.view.mostrarAviso('Reserva atualizada com sucesso!');
        } else {
            const novaReserva = { ...dados, id: Date.now().toString() };
            reservas.unshift(novaReserva);

            const urlWhats = this.model.gerarLinkWhatsApp(novaReserva);
            window.open(urlWhats, '_blank');
        }

        this.model.salvarReservas(reservas);
        this.view.limparFormulario();
        this.view.atualizarModoServico();
        this.atualizarLista();
    }

    handleIniciarEdicao(reserva) {
        this.idReservaEmEdicao = reserva.id;
        this.view.preencherFormulario(reserva);
        this.view.atualizarModoServico();
    }

    handleDeletar(id) {
        this.view.confirmarAcao('Deseja realmente cancelar esta reserva de hospedagem?', () => {
            let reservas = this.model.obterReservas();
            reservas = reservas.filter((reserva) => reserva.id !== id);
            this.model.salvarReservas(reservas);

            if (this.idReservaEmEdicao === id) {
                this.idReservaEmEdicao = null;
                this.view.limparFormulario();
            }

            this.atualizarLista();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HotelPetController(new HotelPetModel(), new HotelPetView());
});
