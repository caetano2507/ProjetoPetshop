// Toda a lógica de validação de datas e os gerenciamento dos fluxos de salvamento, edição e deletamento fica aqui
import { ConsultaModel } from '../Model/Consulta_Model.js';
import { ConsultaView } from '../View/Consulta_View.js';

class ConsultaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.cardEmEdicao = null;

        this.init();
    }

    async init() {
        try {
            // Busca dados do servidor (padrão assíncrono MVC)
            const consultas = await this.model.listarTodas();
            consultas.forEach(c => this.view.adicionarCardNaTela(c));
        } catch (e) {
            console.error(e);
            this.view.abrirBalaoCustomizado('Erro ao carregar dados das consultas do servidor.', 'alerta');
        }

        // Configuração de Eventos do DOM
        this.view.btnToggleEsp.addEventListener('click', () => this.view.configurarToggleEspecialidades());
        this.view.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.view.lista.addEventListener('click', (e) => this.handleListaClick(e));
    }

    validarData(dataString) {
        const dataDigitada = new Date(dataString + 'T00:00:00');
        const dataHoje = new Date();
        dataHoje.setHours(0, 0, 0, 0);
        const anoDigitado = dataDigitada.getFullYear();

        if (anoDigitado > 2100 || dataDigitada < dataHoje) {
            return false;
        }
        return true;
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        const dadosConsulta = this.view.getValoresFormulario();

        if (!this.validarData(dadosConsulta.data)) {
            this.view.abrirBalaoCustomizado('Por favor, insira uma data correta.', 'alerta');
            return;
        }

        try {
            if (this.cardEmEdicao) {
                const id = this.cardEmEdicao.dataset.id;
                await this.model.atualizar(id, dadosConsulta);
                this.view.atualizarCardNaTela(id, dadosConsulta);
                this.cardEmEdicao = null;
                this.view.alternarModoEdicao(false);
            } else {
                const novaConsulta = await this.model.criar(dadosConsulta);
                this.view.adicionarCardNaTela(novaConsulta);
            }

            this.view.abrirWhatsApp(dadosConsulta);
            this.view.resetarFormulario();
        } catch (error) {
            console.error(error);
            this.view.abrirBalaoCustomizado('Erro ao salvar a consulta no servidor.', 'alerta');
        }
    }

    handleListaClick(e) {
        const b = e.target.closest('button');
        if (!b) return;

        const card = b.closest('.item-consulta');
        const acao = b.dataset.acao;

        if (acao === 'alterar') {
            this.cardEmEdicao = card;
            this.view.preencherFormulario({
                nome: card.dataset.nome,
                especie: card.dataset.especie,
                esp: card.dataset.esp,
                data: card.dataset.data,
                hora: card.dataset.hora
            });
            this.view.alternarModoEdicao(true);
        } else if (acao === 'excluir') {
            const id = card.dataset.id;
            const nomePet = card.dataset.nome;

            this.view.abrirBalaoCustomizado(`Tem certeza que deseja remover o agendamento do pet ${nomePet}?`, 'confirmacao', async () => {
                try {
                    await this.model.deletar(id);
                    if (this.cardEmEdicao === card) {
                        this.cardEmEdicao = null;
                        this.view.alternarModoEdicao(false);
                    }
                    this.view.removerCardDaTela(id);
                } catch (error) {
                    console.error(error);
                    this.view.abrirBalaoCustomizado('Não foi possível deletar a consulta do servidor.', 'alerta');
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ConsultaController(new ConsultaModel(), new ConsultaView());
});