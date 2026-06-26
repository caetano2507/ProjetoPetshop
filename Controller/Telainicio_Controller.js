import { TelainicioModel } from '../Model/Telainicio_Model.js';
import { TelainicioView } from '../View/Telainicio_View.js';

class TelainicioController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.view.vincularControleAbas();
        this.atualizarInterface();
        this.configurarEventos();
    }

    atualizarInterface() {
        const carrinho = this.model.obterCarrinho();
        const favoritos = this.model.obterFavoritos();
        const totalCarrinho = this.model.calcularTotal(carrinho);

        this.view.renderizarCarrinho(
            carrinho,
            totalCarrinho,
            (index) => this.handleRemoverCarrinho(index)
        );

        this.view.renderizarFavoritos(
            favoritos,
            (index) => this.handleRemoverFavorito(index),
            (index) => this.handleMoverParaCarrinho(index)
        );
    }

    configurarEventos() {
        if (this.view.addAllToCartBtn) {
            this.view.addAllToCartBtn.addEventListener('click', () => {
                this.model.moverTodosFavoritosParaCarrinho();
                this.sincronizarInterface();
            });
        }

        window.addEventListener('storage', () => {
            this.atualizarInterface();
        });

        window.addEventListener('focus', () => {
            this.atualizarInterface();
        });
    }

    handleRemoverCarrinho(index) {
        this.model.removerItemCarrinho(index);
        this.sincronizarInterface();
    }

    handleRemoverFavorito(index) {
        this.model.removerItemFavorito(index);
        this.sincronizarInterface();
    }

    handleMoverParaCarrinho(index) {
        this.model.moverFavoritoParaCarrinho(index);
        this.sincronizarInterface();
    }

    sincronizarInterface() {
        this.atualizarInterface();
        window.dispatchEvent(new Event('storage'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TelainicioController(new TelainicioModel(), new TelainicioView());
});
