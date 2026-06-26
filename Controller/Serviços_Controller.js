// Organiza a inicialização e o tratamento de falhas 
import { ServicosModel } from '../Model/Serviços_Model.js';
import { ServicosView } from '../View/Serviços_View.js';

class ServicosController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.init();
    }

    async init() {
        try {
            const servicos = await this.model.listarServicos();
            this.view.renderizarCatalogo(servicos);
        } catch (error) {
            
            console.error("Erro detalhado:", error);
            alert('Não foi possível carregar os serviços em tempo real. Verifique a conexão com o servidor.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ServicosController(new ServicosModel(), new ServicosView());
});