// Vai gerenciar os dados do carrinho salvos no localStorage e a validação de regras como cupons e frete
export class TelaFinalCompraModel {
    obterItensCarrinho() {
        return JSON.parse(localStorage.getItem('royalPetCart')) || [];
    }

    limparCarrinho() {
        localStorage.removeItem('royalPetCart');
    }

    calcularSubtotal(itens) {
        return itens.reduce((total, item) => total + item.price, 0);
    }

    validarCupom(cupomTexto) {
        const cupom = cupomTexto.trim().toUpperCase();
        if (cupom === 'ROYAL10') {
            return { valido: true, desconto: 10, tipo: 'fixo' };
        } else if (cupom === 'PETFREE') {
            return { valido: true, desconto: 100, tipo: 'frete' };
        }
        return { valido: false, desconto: 0, tipo: null };
    }

    calcularFrete(cep) {
        if (!cep.trim()) return 0;
        return Math.floor(Math.random() * (25 - 8 + 1)) + 8;
    }
}