function voltarTelaInicio() {
        window.location.href = "Telainicio.html";
        }

const carousel = document.getElementById('ofertas-carousel');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
   
    let autoScrollTimer; // Variável que vai guardar o nosso "cronômetro"
 
    // Função para mover o carrossel (acionada pelo botão ou pelo automático)
    function scrollCarousel(distancia) {
        carousel.scrollBy({ left: distancia, behavior: 'smooth' });
    }
 
 
    // ---LÓGICA DE AUTOPLAY---
 
    function iniciarAutoPlay() {
        // Define um intervalo para rodar a cada 1000 milissegundos (1 segundos)
        autoScrollTimer = setInterval(() => {
            const fimDoCarrossel = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 10;
           
            if (fimDoCarrossel) {
                // Se chegou no fim, volta suavemente para o começo (posição 0)
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Se não chegou no fim, rola 300px para a direita
                scrollCarousel(300);
            }
        }, 1900);
    }
    /*1900*/
    function pausarAutoPlay() {
        clearInterval(autoScrollTimer); // Para o cronômetro
    }
 
    // Inicia o carrossel assim que a página carrega
    iniciarAutoPlay();
 
    // Pausa o carrossel se o usuário passar o mouse por cima (para não atrapalhar o clique)
    carouselWrapper.addEventListener('mouseenter', pausarAutoPlay);
   
    // Volta a rodar o carrossel quando o usuário tira o mouse
    carouselWrapper.addEventListener('mouseleave', iniciarAutoPlay);