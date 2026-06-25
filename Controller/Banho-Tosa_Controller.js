// Nessa parte fica a lógica de interceptar as ações do usuário, disparar as  validações de data e organizar as atualizações entre a View e a Model
import { Banho_tosaModel } from '../Model/Banho-Tosa_Model.js';
import { Banho_tosaView } from '../View/Banho-Tosa_View.js';

class Banho_tosaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.cardEmEdicao = null;

        this.init();
    }

    async init() {
        try {
            const agendamentos = await this.model.listarTodos();
            agendamentos.forEach(a => this.view.adicionarCardNaTela(a));
        } catch (e) {
            console.error(e);
            this.view.abrirBalaoCustomizado('Erro ao carregar dados do servidor.', 'alerta-erro');
        }

        // Eventos
        this.view.campoData.addEventListener('input', () => this.validarCampoDataEmTempoReal());
        this.view.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.view.lista.addEventListener('click', (e) => this.handleListaClick(e));
    }

    validarCampoDataEmTempoReal() {
        const valor = this.view.campoData.value;
        if (!valor) {
            this.view.marcarDataInvalida(false);
            return false;
        }

        const partes = valor.split('-');
        const ano = parseInt(partes[0], 10);
        const dataDigitada = new Date(valor + 'T00:00:00');
        const dataHoje = new Date();
        dataHoje.setHours(0, 0, 0, 0);

        if (partes[0].length > 4 || ano > 2100 || dataDigitada < dataHoje) {
            this.view.marcarDataInvalida(true);
            return false;
        } else {
            this.view.marcarDataInvalida(false);
            return true;
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        if (!this.validarCampoDataEmTempoReal()) {
            this.view.marcarDataInvalida(true);
            this.view.abrirBalaoCustomizado('Coloque uma data correta.', 'alerta-erro');
            return;
        }

        const dadosAgendamento = this.view.getValoresFormulario();

        try {
            if (this.cardEmEdicao) {
                const id = this.cardEmEdicao.dataset.id;
                await this.model.atualizar(id, dadosAgendamento);
                this.view.atualizarCardNaTela(id, dadosAgendamento);
                this.cardEmEdicao = null;
                this.view.alternarModoEdicao(false);
            } else {
                const novoAgendamento = await this.model.criar(dadosAgendamento);
                this.view.adicionarCardNaTela(novoAgendamento);
            }

            this.view.abrirWhatsApp(dadosAgendamento);
            this.view.resetarFormulario();
        } catch (error) {
            console.error(error);
            this.view.abrirBalaoCustomizado('Erro ao salvar agendamento no servidor.', 'alerta-erro');
        }
    }

    handleListaClick(e) {
        const botao = e.target.closest('button');
        if (!botao) return;

        const card = botao.closest('.item-consulta');
        const acao = botao.dataset.acao;

        if (acao === 'alterar') {
            this.cardEmEdicao = card;
            this.view.preencherFormulario({
                nome: card.dataset.nome,
                especie: card.dataset.especie,
                raca: card.dataset.raca,
                porte: card.dataset.porte,
                data: card.dataset.data,
                hora: card.dataset.hora
            });
            this.view.alternarModoEdicao(true);
            this.validarCampoDataEmTempoReal();
        } else if (acao === 'excluir') {
            const id = card.dataset.id;
            const nomePet = card.dataset.nome;

            this.view.abrirBalaoCustomizado(`Tem certeza que deseja remover o agendamento de banho do pet ${nomePet}?`, 'confirmacao', async () => {
                try {
                    await this.model.deletar(id);
                    if (this.cardEmEdicao === card) {
                        this.cardEmEdicao = null;
                        this.view.alternarModoEdicao(false);
                    }
                    this.view.removerCardDaTela(id);
                } catch (error) {
                    console.error(error);
                    this.view.abrirBalaoCustomizado('Não foi possível deletar o agendamento.', 'alerta-erro');
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Banho_tosaController(new Banho_tosaModel(), new Banho_tosaView());
});