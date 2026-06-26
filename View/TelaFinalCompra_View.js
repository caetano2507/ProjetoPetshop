//Esse arquivo vai cuidar estritamente de capturar os elementos do DOM
export class TelaFinalCompraView {
    constructor() {
        this.listaItens = document.getElementById('lista-itens');
        this.inputCep = document.getElementById('input-cep');
        this.btnCep = document.getElementById('btn-cep');
        this.valorFreteEl = document.getElementById('valor-frete');
        this.inputCupom = document.getElementById('input-cupom');
        this.btnCupom = document.getElementById('btn-cupom');
        this.feedbackCupom = document.getElementById('feedback-cupom');
        this.subtotalEl = document.getElementById('valor-subtotal');
        this.totalEl = document.getElementById('valor-total');
        this.btnFinalizar = document.getElementById('btn-finalizar');
    }

    renderizarResumo(itens) {
        if (!this.listaItens) return;
        this.listaItens.innerHTML = '';

        if (itens.length === 0) {
            this.listaItens.innerHTML = '<p style="color: #747d8c; text-align: center; padding: 10px;">O seu carrinho está vazio.</p>';
            return;
        }

        itens.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.style.display = 'flex';
            itemDiv.style.justifyContent = 'space-between';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.marginBottom = '12px';
            itemDiv.style.paddingBottom = '12px';
            itemDiv.style.borderBottom = '1px dashed #eaedf2';

            itemDiv.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${item.img}" alt="${item.name}" style="width: 40px; height: 40px; object-fit: contain; border-radius: 4px;">
                    <span style="font-size: 14px; font-weight: 500; color: #2c3e50;">${item.name}</span>
                </div>
                <span style="font-size: 14px; font-weight: 600; color: #2c3e50;">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            `;
            this.listaItens.appendChild(itemDiv);
        });
    }

    atualizarValores(subtotal, frete, desconto) {
        const total = Math.max(0, (subtotal + frete) - desconto);

        if (this.subtotalEl) this.subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        if (this.valorFreteEl) {
            this.valorFreteEl.textContent = frete > 0 ? `R$ ${frete.toFixed(2).replace('.', ',')}` : 'R$ 0,00';
        }
        if (this.totalEl) this.totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    mostrarFeedbackCupom(mensagem, ehSucesso) {
        if (!this.feedbackCupom) return;
        this.feedbackCupom.textContent = mensaje;
        this.feedbackCupom.style.color = ehSucesso ? '#2ecc71' : '#e74c3c';
    }

    obterFormaPagamento() {
        const selecionado = document.querySelector('input[name="forma-pagto"]:checked');
        return selecionado ? selecionado.value : null;
    }
}