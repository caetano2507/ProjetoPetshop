// Vai cuidar da captura de dados dos inputs do formulário, injeção do resultado em HTML na tela e atualização dinâmica do link do botão de contratação
export class PlanoSaudeView {
    constructor() {
        this.btnCalcular = document.getElementById('btn-calcular');
        this.inputTipo = document.getElementById('tipo');
        this.selectIdade = document.getElementById('idade');
        this.resultadoContainer = document.getElementById('resultado');
        this.btnWhats = document.getElementById('btn-whats');
    }

    obterDadosFormulario() {
        return {
            tipo: this.inputTipo ? this.inputTipo.value : '',
            idade: this.selectIdade ? this.selectIdade.value : 'filhote'
        };
    }

    exibirResultado(plano, preco) {
        if (!this.resultadoContainer) return;
        
        this.resultadoContainer.innerHTML = `
            Recomendado: <br>
            <strong>${plano}</strong> - ${preco}<br>
            <small>Baseado no perfil do seu pet</small>
        `;
    }

    atualizarLinkContratacao(url) {
        if (!this.btnWhats) return;
        this.btnWhats.href = url;
        this.btnWhats.style.display = 'inline-block'; // Garante que o botão apareça se estivesse oculto
    }
}