export class TelainicioView {
    constructor() {
        this.cartSidebar = document.getElementById('sidebar-cart');
        this.openCartIcon = document.getElementById('open-cart-icon');
        this.closeCartBtn = document.getElementById('close-cart');
        this.cartItemsContainer = document.getElementById('cart-items-container');
        this.cartCountBadge = document.getElementById('cart-badge');
        this.cartTotalEl = document.getElementById('cart-total-value');

        this.favoritesSidebar = document.getElementById('sidebar-favorites');
        this.openFavoritesIcon = document.getElementById('open-heart-icon');
        this.closeFavoritesBtn = document.getElementById('close-favorites');
        this.favoritesItemsContainer = document.getElementById('favorites-items-container');
        this.favoritesCountBadge = document.getElementById('heart-badge');
        this.favoritesFooter = document.getElementById('favorites-footer');
        this.addAllToCartBtn = document.getElementById('add-all-to-cart-btn');
    }

    vincularControleAbas() {
        if (this.openCartIcon && this.cartSidebar) {
            this.openCartIcon.addEventListener('click', () => this.cartSidebar.classList.add('open'));
        }

        if (this.closeCartBtn && this.cartSidebar) {
            this.closeCartBtn.addEventListener('click', () => this.cartSidebar.classList.remove('open'));
        }

        if (this.openFavoritesIcon && this.favoritesSidebar) {
            this.openFavoritesIcon.addEventListener('click', () => this.favoritesSidebar.classList.add('open'));
        }

        if (this.closeFavoritesBtn && this.favoritesSidebar) {
            this.closeFavoritesBtn.addEventListener('click', () => this.favoritesSidebar.classList.remove('open'));
        }
    }

    renderizarCarrinho(carrinho, total, onRemover) {
        if (!this.cartItemsContainer) return;

        this.cartItemsContainer.innerHTML = '';
        this.atualizarBadge(this.cartCountBadge, carrinho.length);

        if (carrinho.length === 0) {
            this.cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Seu carrinho esta vazio.</p>';
        }

        carrinho.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item-card';
            itemDiv.innerHTML = `
                <div class="cart-item-info">
                    <img class="cart-item-img-fixed" src="${item.img}" alt="${item.name}">
                    <div class="cart-item-details">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-price">R$ ${Number(item.price).toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <div class="action-buttons-container">
                    <button class="remove-item-btn" type="button" title="Remover item">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;

            itemDiv.querySelector('.remove-item-btn').addEventListener('click', () => onRemover(index));
            this.cartItemsContainer.appendChild(itemDiv);
        });

        if (this.cartTotalEl) {
            this.cartTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
    }

    renderizarFavoritos(favoritos, onRemover, onMover) {
        if (!this.favoritesItemsContainer) return;

        this.favoritesItemsContainer.innerHTML = '';
        this.atualizarBadge(this.favoritesCountBadge, favoritos.length);

        if (this.favoritesFooter) {
            this.favoritesFooter.style.display = favoritos.length > 0 ? 'block' : 'none';
        }

        if (favoritos.length === 0) {
            this.favoritesItemsContainer.innerHTML = '<p class="empty-cart-msg">Sua lista de favoritos esta vazia.</p>';
        }

        favoritos.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item-card';
            itemDiv.innerHTML = `
                <div class="cart-item-info">
                    <img class="cart-item-img-fixed" src="${item.img}" alt="${item.name}">
                    <div class="cart-item-details">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-price">R$ ${Number(item.price).toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <div class="action-buttons-container">
                    <button class="add-to-cart-from-fav" type="button" title="Adicionar ao carrinho">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                    <button class="remove-item-btn" type="button" title="Remover favorito">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;

            itemDiv.querySelector('.remove-item-btn').addEventListener('click', () => onRemover(index));
            itemDiv.querySelector('.add-to-cart-from-fav').addEventListener('click', () => onMover(index));
            this.favoritesItemsContainer.appendChild(itemDiv);
        });
    }

    atualizarBadge(badge, quantidade) {
        if (!badge) return;

        badge.textContent = quantidade;
        badge.style.display = quantidade > 0 ? 'flex' : 'none';
    }
}
