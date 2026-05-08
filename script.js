document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ROLAGEM SUAVE (SMOOTH SCROLL) ---
    // Seleciona todos os links que começam com "#"
    const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener("click", function (evento) {
            evento.preventDefault(); // Evita o pulo imediato padrão do navegador
            
            const targetId = this.getAttribute("href"); // Pega o ID (ex: #pesquisa)
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calcula a posição da seção, descontando a altura do cabeçalho fixo (80px)
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // --- 2. ANIMAÇÃO DOS CONTADORES NUMÉRICOS ---
    const statItems = document.querySelectorAll('.stat-item h3');

    statItems.forEach(item => {
        // Extrai apenas os números do texto original (ex: "+100" vira 100)
        const targetValue = parseInt(item.innerText.replace(/\D/g, ''));
        
        // Zera o texto inicial para a animação
        item.innerText = '+0';
        
        let currentValue = 0;
        // Define o incremento baseando-se no valor final para que todos terminem juntos
        const increment = targetValue / 40; 

        const updateCounter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                // Garante que o valor final seja exatamente o alvo
                item.innerText = '+' + targetValue;
                clearInterval(updateCounter); // Para o temporizador
            } else {
                // Arredonda para cima enquanto conta
                item.innerText = '+' + Math.ceil(currentValue);
            }
        }, 40); // Atualiza a cada 40 milissegundos
    });

    // --- 3. MENU HAMBURGUER PARA MOBILE ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

});