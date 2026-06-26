// gerará o HTML de cada card de produto mantendo as suas classes de estilo e a lógica visual dos corações 
export class BrinquedosView {
    constructor() {
        // Seleciona as duas vitrines como estão estruturadas no HTML 
        this.gridRecomendados = document.querySelector('.product-grid:not(.carousel)');
        this.gridOfertas = document.getElementById('ofertas-carousel');
    }

    renderizarProdutos(produtos) {
        if (this.gridRecomendados) this.gridRecomendados.innerHTML = '';
        if (this.gridOfertas) this.gridOfertas.innerHTML = '';
        
        produtos.forEach(prod => {
            const card = document.createElement('article');
            card.className = 'product-card';
            
            const ehOferta = prod.posicao === 'oferta';
            
            card.innerHTML = `
                ${ehOferta ? '<span class="super-oferta-badge">Super oferta</span>' : ''}
                <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                <div class="product-image">
                    <img src="${prod.img}" alt="${prod.name}">
                </div>
                <button class="add-btn" 
                        data-name="${prod.name}" 
                        data-price="${prod.price}" 
                        data-img="${prod.img}">
                    <i class="fas fa-plus"></i>
                </button>
                <div class="info-area">
                    <p class="product-title">${prod.name}</p>
                    <span class="discount-tag">${prod.desconto || '10% OFF'}</span>
                    <p class="price">R$ ${prod.price.toFixed(2).replace('.', ',')}</p>
                </div>
            `;
            
            if (ehOferta && this.gridOfertas) {
                this.gridOfertas.appendChild(card);
            } else if (!ehOferta && this.gridRecomendados) {
                this.gridRecomendados.appendChild(card);
            }
        });
    }

    mostrarAvisoVisual(nomeProduto) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.position = 'fixed';
            container.style.top = '20px';
            container.style.right = '20px';
            container.style.zIndex = '10000';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.gap = '10px';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.style.background = '#2ecc71';
        toast.style.color = '#ffffff';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '6px';
        toast.style.fontFamily = 'Arial, sans-serif';
        toast.style.fontSize = '0.9rem';
        toast.style.fontWeight = '600';
        toast.style.boxShadow = '0 4px 12px rgba(46, 204, 113, 0.2)';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        toast.innerHTML = `<i class="fas fa-check-circle" style="margin-right: 8px;"></i> ${nomeProduto} adicionado!`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => { toast.remove(); }, 300);
        }, 2500);
    }

    atualizarCoracoesVisuais() {
        const favoritos = JSON.parse(localStorage.getItem('royalPetFavorites')) || [];
        document.querySelectorAll('.product-card').forEach(card => {
            const addBtn = card.querySelector('.add-btn');
            if (!addBtn) return;
            const name = addBtn.getAttribute('data-name');
            const icone = card.querySelector('.wishlist-btn i');
            
            if (favoritos.some(item => item.name === name)) {
                icone.className = 'fas fa-heart';
                icone.style.color = '#e74c3c';
            } else {
                icone.className = 'far fa-heart';
                icone.style.color = '';
            }
        });
    }
}