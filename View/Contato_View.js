// Vai ser responsável por ler os inputs e disparar os "alert()" 
export class ContatoView {
    constructor() {
        this.form = document.getElementById('form-contato');
        this.campoNome = document.querySelector('input[name="name"]');
        this.campoEmail = document.querySelector('input[name="email"]');
        this.campoMensagem = document.querySelector('textarea[name="message"]');
    }

    getValoresFormulario() {
        return {
            nome: this.campoNome.value,
            email: this.campoEmail.value,
            mensagem: this.campoMensagem.value
        };
    }

    resetarFormulario() {
        this.form.reset();
    }

    mostrarSucesso() {
        alert("Mensagem enviada com sucesso!");
    }

    mostrarErro(erro) {
        alert("Erro ao enviar: " + JSON.stringify(erro));
    }
}