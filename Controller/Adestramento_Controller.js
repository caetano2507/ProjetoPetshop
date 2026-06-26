// AdestramentoController.js
import { AdestramentoModel } from '../Model/Adestramento_Model.js';
import { AdestramentoView } from '../View/Adestramento_View.js';

class AdestramentoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.cardEmEdicao = null;

        this.init();
    }

    async init() {
        // Carrega dados iniciais do backend
        try {
            const adestramentos = await this.model.listarTodos();
            // Como o model já traz invertido do back, listamos normalmente
            adestramentos.forEach(pet => this.view.adicionarCardNaTela(pet));
        } catch (e) {
            this.view.abrirBalaoCustomizado('Erro ao carregar dados do servidor.', 'alerta-erro');
        }

        // Vincular Eventos da View
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

        const dadosPet = this.view.getValoresFormulario();

        try {
            if (this.cardEmEdicao) {
                const id = this.cardEmEdicao.dataset.id;
                await this.model.atualizar(id, dadosPet);
                this.view.atualizarCardNaTela(id, dadosPet);
                this.cardEmEdicao = null;
                this.view.alternarModoEdicao(false);
            } else {
                const novoPet = await this.model.criar(dadosPet);
                this.view.adicionarCardNaTela(novoPet);
            }

            this.view.abrirWhatsApp(dadosPet);
            this.view.resetarFormulario();
        } catch (error) {
            this.view.abrirBalaoCustomizado('Erro ao processar requisição no servidor.', 'alerta-erro');
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
                idade: card.dataset.idade,
                objetivo: card.dataset.objetivo,
                data: card.dataset.data,
                hora: card.dataset.hora
            });
            this.view.alternarModoEdicao(true);
            this.validarCampoDataEmTempoReal();
        } else if (acao === 'excluir') {
            const id = card.dataset.id;
            const nomePet = card.dataset.nome;

            this.view.abrirBalaoCustomizado(`Remover a solicitação de adestramento do pet ${nomePet}?`, 'confirmacao', async () => {
                try {
                    await this.model.deletar(id);
                    if (this.cardEmEdicao === card) {
                        this.cardEmEdicao = null;
                        this.view.alternarModoEdicao(false);
                    }
                    this.view.removerCardDaTela(id);
                } catch (error) {
                    this.view.abrirBalaoCustomizado('Não foi possível deletar.', 'alerta-erro');
                }
            });
        }
    }
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new AdestramentoController(new AdestramentoModel(), new AdestramentoView());
});