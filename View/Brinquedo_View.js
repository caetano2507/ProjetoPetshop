// gerará o HTML de cada card de produto mantendo as suas classes de estilo e a lógica visual dos corações 
export class BrinquedosView {
    constructor() {
        this.grid = document.getElementById('grid-brinquedos');
    }

    renderizarProdutos(produtos) {
        this.grid.innerHTML = '';
        
        produtos.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            card.innerHTML = `
                <div class="product-img">
                    <img src="${prod.img}" alt="${prod.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${prod.name}</h3>
                    <p class="product-price">R$ ${prod.price.toFixed(2).replace('.', ',')}</p>
                    
                    <div class="actions">
                        <button class="add-btn" 
                                data-name="${prod.name}" 
                                data-price="${prod.price}" 
                                data-img="${prod.img}">
                            Adicionar ao carrinho
                        </button>
                        <button class="fav-btn">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
            
            this.grid.appendChild(card);
        });
    }

    atualizarCoracoesVisuais() {
        const favoritos = JSON.parse(localStorage.getItem('royalPetFavorites')) || [];
        const botoesFav = document.querySelectorAll('.fav-btn');

        botoesFav.forEach(button => {
            const cardInfo = button.closest('.product-info');
            const addBtn = cardInfo.querySelector('.add-btn');
            const name = addBtn.getAttribute('data-name');
            
            const index = favoritos.findIndex(item => item.name === name);
            const icone = button.querySelector('i');

            if (index !== -1) {
                icone.className = 'fas fa-heart';
                icone.style.color = '#e74c3c';
            } else {
                icone.className = 'far fa-heart';
                icone.style.color = '';
            }
        });
    }
}