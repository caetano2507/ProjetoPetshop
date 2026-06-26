// Organiza o carregamento inicial dos produtos vindos do backend e gerencia os cliques do Carrinho e dos favoritos
import { BrinquedosModel } from '../Model/Brinquedos_Model.js';
import { BrinquedosView } from '../View/Brinquedos_View.js';

class BrinquedosController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    async init() {
        try {
            const produtos = await this.model.listarBrinquedos();
            this.view.renderizarProdutos(produtos);
            this.view.atualizarCoracoesVisuais();
            this.configurarEventos();
        } catch (error) {
            console.error("Erro na Inicialização:", error);
        }
    }

    configurarEventos() {
        document.body.addEventListener('click', (e) => {
            const botaoAdd = e.target.closest('.add-btn');
            const botaoFav = e.target.closest('.wishlist-btn');

            if (botaoAdd) {
                e.stopPropagation();
                this.handleAdicionarCarrinho(botaoAdd);
            }
            if (botaoFav) {
                e.stopPropagation();
                this.handleAlternarFavorito(botaoFav);
            }
        });

        window.addEventListener('storage', () => {
            this.view.atualizarCoracoesVisuais();
        });
    }

    handleAdicionarCarrinho(btn) {
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        const img = btn.getAttribute('data-img');

        let carrinho = JSON.parse(localStorage.getItem('royalPetCart')) || [];
        carrinho.push({ name, price, img });
        
        localStorage.setItem('royalPetCart', JSON.stringify(carrinho));
        
        this.view.mostrarAvisoVisual(name);
        window.dispatchEvent(new Event('storage'));

        if (window.parent && window.parent.document) {
            const openCartIconEl = window.parent.document.getElementById('open-cart-icon');
            if (openCartIconEl) openCartIconEl.click(); 
        }
    }

    handleAlternarFavorito(btn) {
        const card = btn.closest('.product-card');
        const addBtn = card.querySelector('.add-btn');
        
        const name = addBtn.getAttribute('data-name');
        const price = parseFloat(addBtn.getAttribute('data-price'));
        const img = addBtn.getAttribute('data-img');

        let favoritos = JSON.parse(localStorage.getItem('royalPetFavorites')) || [];
        const index = favoritos.findIndex(item => item.name === name);

        if (index === -1) {
            favoritos.push({ name, price, img });
        } else {
            favoritos.splice(index, 1);
        }

        localStorage.setItem('royalPetFavorites', JSON.stringify(favoritos));
        this.view.atualizarCoracoesVisuais();
        window.dispatchEvent(new Event('storage'));
    }
}

// Inicializa corretamente usando o operador 'new'
document.addEventListener('DOMContentLoaded', () => {
    new BrinquedosController(new BrinquedosModel(), new BrinquedosView());
});