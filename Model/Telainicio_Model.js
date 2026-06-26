export class TelainicioModel {
    obterCarrinho() {
        return JSON.parse(localStorage.getItem('royalPetCart')) || [];
    }

    salvarCarrinho(carrinho) {
        localStorage.setItem('royalPetCart', JSON.stringify(carrinho));
    }

    obterFavoritos() {
        return JSON.parse(localStorage.getItem('royalPetFavorites')) || [];
    }

    salvarFavoritos(favoritos) {
        localStorage.setItem('royalPetFavorites', JSON.stringify(favoritos));
    }

    removerItemCarrinho(index) {
        const carrinho = this.obterCarrinho();
        carrinho.splice(index, 1);
        this.salvarCarrinho(carrinho);
    }

    removerItemFavorito(index) {
        const favoritos = this.obterFavoritos();
        favoritos.splice(index, 1);
        this.salvarFavoritos(favoritos);
    }

    moverFavoritoParaCarrinho(index) {
        const favoritos = this.obterFavoritos();
        const carrinho = this.obterCarrinho();

        const item = favoritos.splice(index, 1)[0];
        if (item) {
            carrinho.push(item);
        }

        this.salvarFavoritos(favoritos);
        this.salvarCarrinho(carrinho);
    }

    moverTodosFavoritosParaCarrinho() {
        const favoritos = this.obterFavoritos();
        const carrinho = this.obterCarrinho();

        if (favoritos.length === 0) return;

        this.salvarCarrinho(carrinho.concat(favoritos));
        this.salvarFavoritos([]);
    }

    calcularTotal(carrinho) {
        return carrinho.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    }
}
