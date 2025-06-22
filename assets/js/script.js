document.addEventListener('DOMContentLoaded', function() {

    // 1. Controle do Navbar com Efeito "Frosted Glass" no Scroll
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            // Adiciona a classe 'scrolled' quando o scroll passar de 50px
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Inicialização do Scrollspy do Bootstrap
    const mainNav = document.body.querySelector('#main-navbar');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#main-navbar',
            offset: 100, // Ajusta o gatilho do item ativo para 100px do topo
        });
    }

    // 3. Funcionalidade de Expansão de Certificados
    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;

            // Cria o elemento de overlay
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';

            // Cria o elemento da imagem a ser expandida
            const expandedImg = document.createElement('img');
            expandedImg.src = imgSrc;

            // Adiciona a imagem ao overlay e o overlay ao corpo da página
            overlay.appendChild(expandedImg);
            document.body.appendChild(overlay);

            // Força um reflow antes de adicionar a classe para garantir a transição
            setTimeout(() => overlay.classList.add('show'), 10);

            // Event listener para fechar o overlay ao clicar nele
            overlay.addEventListener('click', () => {
                overlay.classList.remove('show');
                // Remove o elemento do DOM após a transição de saída
                overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
            });
        });
    });

    // 4. Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 800, // Duração da animação em milissegundos
        once: true,    // Animar os elementos apenas uma vez
        offset: 50,    // Ponto de gatilho da animação em pixels
    });

    // 5. Efeito de digitação contínua (Typewriter)
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const textToType = typewriterElement.innerHTML;
        typewriterElement.innerHTML = ''; // Limpa o texto inicial
        let i = 0;
        let isDeleting = false;

        function loopTypewriter() {
            const currentText = textToType;
            let speed = 150; // Velocidade padrão

            if (isDeleting) {
                speed /= 2; // Apaga mais rápido
            }

            if (!isDeleting && i < currentText.length) {
                typewriterElement.innerHTML += currentText.charAt(i);
                i++;
            } else if (isDeleting && i > 0) {
                typewriterElement.innerHTML = currentText.substring(0, i - 1);
                i--;
            } else if (!isDeleting && i === currentText.length) {
                speed = 2000; // Pausa no final do texto
                isDeleting = true;
            } else if (isDeleting && i === 0) {
                isDeleting = false;
            }

            setTimeout(loopTypewriter, speed);
        }
        setTimeout(loopTypewriter, 500); // Inicia após um breve atraso
    }

    // 6. Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                // Não interfere com abas (pills) do Bootstrap
                if (this.getAttribute('data-bs-toggle') !== 'pill') {
                     document.querySelector(this.getAttribute('href')).scrollIntoView({
                         behavior: 'smooth'
                     });
                }
            }
        });
    });
});

// 7. Configuração do Particles.js
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#4a5568" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.4, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#718096", "opacity": 0.2, "width": 1 },
        "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": false },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }
        }
    },
    "retina_detect": true
});