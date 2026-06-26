// vai organizar a ação de clique do botão de simulação, acionar os cálculos da Model e enviar os dados processados para serem atualizados na View
import { PlanoSaudeModel } from '../Model/PlanoSaude_Model.js';
import { PlanoSaudeView } from '../View/PlanoSaude_View.js';


class PlanoSaudeController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.configurarEventos();
    }

    configurarEventos() {
        if (this.view.btnCalcular) {
            this.view.btnCalcular.addEventListener('click', () => this.handleSimularPlano());
        }
    }

    handleSimularPlano() {
        const dados = this.view.obterDadosFormulario();
        
        if (!dados.tipo.trim()) {
            alert('Por favor, informe a espécie ou tipo do seu pet para calcular.');
            return;
        }

        // Executa a lógica matemática e de negócio isolada na Model
        const recomendacao = this.model.calcularRecomendacao(dados.tipo, dados.idade);
        
        // Atualiza os componentes visuais através da View
        this.view.exibirResultado(recomendacao.plano, recomendacao.preco);
        
        // Atualiza a URL dinâmica de contato do WhatsApp com o plano sugerido
        const linkWhats = this.model.gerarLinkWhatsApp(recomendacao.plano);
        this.view.atualizarLinkContratacao(linkWhats);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PlanoSaudeController(new PlanoSaudeModel(), new PlanoSaudeView());
});