// Gerencia a inicialização do EmailJS, dispara o email primeiro e, caso de certo envia os dados para o backend registrar
import { ContatoModel } from '../Model/Contato_Model.js';
import { ContatoView } from '../View/Contato_View.js';

class ContatoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.init();
    }

    init() {
        // Inicializa o EmailJS com a sua chave original pública
        emailjs.init("2HoT6UIuSnJaVZblD");

        // Escuta o envio do formulário
        this.view.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        const dadosForm = this.view.getValoresFormulario();

        //  Primeiro envia via EmailJS usando o elemento do próprio form (this.view.form)
        emailjs.sendForm("service_c7ppt9s", "template_msqrfsv", this.view.form)
            .then(async () => {
                try {
                    //  Se o e-mail foi com sucesso, salva a cópia no servidor
                    await this.model.salvarMensagem(dadosForm);
                    
                    this.view.mostrarSucesso();
                    this.view.resetarFormulario();
                } catch (errBackend) {
                    console.error("Erro ao salvar no backend, mas o e-mail foi enviado:", errBackend);
                    // Avisa o usuário do sucesso no e-mail mesmo se o servidor local falhar
                    this.view.mostrarSucesso();
                    this.view.resetarFormulario();
                }
            }, (error) => {
                this.view.mostrarErro(error);
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ContatoController(new ContatoModel(), new ContatoView());
});