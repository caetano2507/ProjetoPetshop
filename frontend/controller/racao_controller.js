// =========================================================================
// 1. NAVEGAÇÃO EXTERNA (LOGO)
// =========================================================================
function voltarTelaInicio() {
    window.location.href = "Telainicio.html";
}
 
// =========================================================================
// 2. LÓGICA PRINCIPAL DA PÁGINA
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // --- VARIÁVEIS E SELETORES DO CARROSSEL ---
    const carousel = document.getElementById('ofertas-carousel');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    let autoScrollTimer;
 
    // --- FUNÇÕES DO CARROSSEL ---
    function scrollCarousel(distancia) {
        if (carousel) {
            carousel.scrollBy({ left: distancia, behavior: 'smooth' });
        }
    }
 
    function iniciarAutoPlay() {
        if (!carousel) return;
        
        autoScrollTimer = setInterval(() => {
            const fimDoCarrossel = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 15;
            
            if (fimDoCarrossel || (carousel.scrollLeft === 0 && carousel.scrollWidth <= carousel.offsetWidth)) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollCarousel(270);
            }
        }, 1900);
    }
 
    function pausarAutoPlay() {
        clearInterval(autoScrollTimer);
    }
 
    if (carousel && carouselWrapper) {
        iniciarAutoPlay();
        carouselWrapper.addEventListener('mouseenter', pausarAutoPlay);
        carouselWrapper.addEventListener('mouseleave', iniciarAutoPlay);
    }
 
    // Identifica a página atual para separar as listas no LocalStorage
    const paginaAtual = window.location.pathname.split("/").pop(); 
 
    // =========================================================================
    // 3. SISTEMA DE FAVORITOS (REDIRECIONA PARA A TELA DO DIEGO)
    // =========================================================================
    const botoesFavorito = document.querySelectorAll('.wishlist-btn');
    let favoritosSalvos = JSON.parse(localStorage.getItem('favoritos_' + paginaAtual)) || [];
 
    botoesFavorito.forEach((botao, index) => {
        const icone = botao.querySelector('i');
        
        if (icone && favoritosSalvos.includes(index)) {
            icone.classList.remove('far');
            icone.classList.add('fas');
            icone.style.color = '#e74c3c';
        }
 
        botao.addEventListener('click', () => {
            if (!icone) return;
 
            if (icone.classList.contains('far')) {
                icone.classList.remove('far');
                icone.classList.add('fas');
                icone.style.color = '#e74c3c';
                
                if (!favoritosSalvos.includes(index)) {
                    favoritosSalvos.push(index);
                }
 
                botao.style.transform = 'scale(1.2)';
                setTimeout(() => botao.style.transform = 'scale(1)', 200);
 
                localStorage.setItem('favoritos_' + paginaAtual, JSON.stringify(favoritosSalvos));
 
                // REDIRECIONA PARA A TELA DE FAVORITOS DO (DIEGO)
                setTimeout(() => {
                    window.location.href = "favoritos.html"; 
                }, 500);
            } else {
                icone.classList.remove('fas');
                icone.classList.add('far');
                icone.style.color = '';
                
                favoritosSalvos = favoritosSalvos.filter(id => id !== index);
                localStorage.setItem('favoritos_' + paginaAtual, JSON.stringify(favoritosSalvos));
            }
        });
    });
 
    // =========================================================================
    // 4. SISTEMA DO CARRINHO (REDIRECIONA PARA A TELA DO DIEGO)
    // =========================================================================
    const botoesCarrinho = document.querySelectorAll('.add-btn');
    let carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho_' + paginaAtual)) || [];
 
    botoesCarrinho.forEach((botao, index) => {
        const icone = botao.querySelector('i');
        
        if (icone && carrinhoSalvo.includes(index)) {
            icone.classList.remove('fa-plus');
            icone.classList.add('fa-check');
            botao.style.backgroundColor = '#2ecc71'; 
            botao.style.color = 'white';
        }
 
        botao.addEventListener('click', () => {
            if (!icone) return;
 
            if (icone.classList.contains('fa-plus')) {
                icone.classList.remove('fa-plus');
                icone.classList.add('fa-check'); 
                botao.style.backgroundColor = '#2ecc71'; 
                botao.style.color = 'white';
                
                if (!carrinhoSalvo.includes(index)) {
                    carrinhoSalvo.push(index);
                }
 
                botao.style.transform = 'scale(1.2)';
                setTimeout(() => botao.style.transform = 'scale(1)', 200);
 
                localStorage.setItem('carrinho_' + paginaAtual, JSON.stringify(carrinhoSalvo));
 
                // REDIRECIONA PARA A TELA DE CARRINHO DO (DIEGO)
                setTimeout(() => {
                    window.location.href = "carrinho.html"; 
                }, 500);
 
            } else {
                icone.classList.remove('fa-check');
                icone.classList.add('fa-plus');
                botao.style.backgroundColor = ''; 
                botao.style.color = '';
                
                carrinhoSalvo = carrinhoSalvo.filter(id => id !== index);
                localStorage.setItem('carrinho_' + paginaAtual, JSON.stringify(carrinhoSalvo));
            }
        });
    });
 
});
 