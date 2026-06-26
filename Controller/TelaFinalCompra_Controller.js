//Vai organizar as ações da View e as regras da Model, controlando os cliques e eventos
import { TelaFinalCompraModel } from './TelaFinalCompra_Model.js';
import { TelaFinalCompraView } from './TelaFinalCompra_View.js';

class TelaFinalCompraController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.freteAplicado = 0;
        this.descontoAplicado = 0;
        
        this.init();
    }

    init() {
        const itens = this.model.obterItensCarrinho();
        this.view.renderizarResumo(itens);
        this.recalcularTotais();
        this.configurarEventos();
    }

    recalcularTotais() {
        const itens = this.model.obterItensCarrinho();
        const subtotal = this.model.calcularSubtotal(itens);
        this.view.atualizarValores(subtotal, this.freteAplicado, this.descontoAplicado);
    }

    configurarEventos() {
        if (this.view.btnCep) {
            this.view.btnCep.addEventListener('click', () => {
                const cep = this.view.inputCep.value;
                if (!cep) {
                    alert('Por favor, digite um CEP válido.');
                    return;
                }
                this.freteAplicado = this.model.calcularFrete(cep);
                this.recalcularTotais();
            });
        }

        if (this.view.btnCupom) {
            this.view.btnCupom.addEventListener('click', () => {
                const cupomTexto = this.view.inputCupom.value;
                const resultado = this.model.validarCupom(cupomTexto);

                if (resultado.valido) {
                    if (resultado.tipo === 'fixo') {
                        this.descontoAplicado = resultado.desconto;
                    } else if (resultado.tipo === 'frete') {
                        this.descontoAplicado = this.freteAplicado; 
                    }
                    this.view.mostrarFeedbackCupom(`Cupom aplicado! Desconto ativo.`, true);
                } else {
                    this.descontoAplicado = 0;
                    this.view.mostrarFeedbackCupom('Cupom inválido ou expirado.', false);
                }
                this.recalcularTotais();
            });
        }

        if (this.view.btnFinalizar) {
            this.view.btnFinalizar.addEventListener('click', () => {
                const itens = this.model.obterItensCarrinho();
                const cep = this.view.inputCep.value;
                const formaPagto = this.view.obterFormaPagamento();

                if (itens.length === 0) {
                    alert('Seu carrinho está vazio! Volte à loja e escolha alguns brinquedos.');
                    return;
                }

                if (!cep || this.freteAplicado === 0) {
                    alert('Por favor, digite seu CEP e clique em "Aplicar" para calcular o frete.');
                    return;
                }

                if (!formaPagto) {
                    alert('Selecione uma forma de pagamento para continuar.');
                    return;
                }

                alert(`Pedido realizado com sucesso!\nForma escolhida: ${formaPagto.toUpperCase()}\nObrigado por comprar na Royal Pet!`);
                
                this.model.limparCarrinho();
                window.location.href = 'Telainicio.html';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TelaFinalCompraController(new TelaFinalCompraModel(), new TelaFinalCompraView());
});