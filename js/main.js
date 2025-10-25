// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Selector de idioma
    const selectedLanguage = document.getElementById('selected-language');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');

    // Abrir/cerrar dropdown
    selectedLanguage.addEventListener('click', function(e) {
        e.stopPropagation();
        selectedLanguage.classList.toggle('active');
        languageDropdown.classList.toggle('active');
    });

    // Seleccionar idioma
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedFlag = this.querySelector('.flag').textContent;
            const selectedText = this.querySelector('.lang-text').textContent;
            const newLang = this.dataset.lang;
            
            // Actualizar la bandera seleccionada
            selectedLanguage.querySelector('.flag').textContent = selectedFlag;
            
            // Cerrar dropdown
            selectedLanguage.classList.remove('active');
            languageDropdown.classList.remove('active');
            
            // Cambiar idioma
            changeLanguage(newLang);
            console.log('Idioma seleccionado:', newLang);
        });
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', function() {
        selectedLanguage.classList.remove('active');
        languageDropdown.classList.remove('active');
    });
});

// Contador animado para las estadísticas
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Formatear números grandes
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animar contadores cuando entran en vista
            if (entry.target.classList.contains('hero-stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.problem-item, .impact-item, .solution-content, .hero-stats, .cta-content, .status-card, .metric-item, .benefit, .comparison-item, .faq-item, .timeline-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Efecto parallax suave para el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Cambio de estilo del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Efecto hover para los elementos del stack
document.addEventListener('DOMContentLoaded', function() {
    const stackItems = document.querySelectorAll('.stack-item');
    
    stackItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Agregar efecto de brillo
            this.style.boxShadow = '0 10px 30px rgba(247, 147, 26, 0.3)';
            this.style.transform = 'scale(1.05) translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
});

// Smooth scroll para enlaces internos
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Compensar header fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Efecto de escritura para el título principal con soporte para HTML
function typeWriter(element, htmlContent, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    // Crear un array con el contenido final formateado
    const targetHTML = htmlContent;
    
    function type() {
        if (i < targetHTML.length) {
            element.innerHTML = targetHTML.substring(0, i + 1);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efecto de escritura al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Definir el contenido con los saltos de línea correctos
        const formattedTitle = `
                    <span class="highlight">Cashu</span><br>
                    for<br>
                    <span style="white-space: nowrap;">Community Sovereignty</span>
                `;
        setTimeout(() => {
            typeWriter(heroTitle, formattedTitle.trim(), 50);
        }, 500);
    }
});

// Validación simple para formularios (para páginas futuras)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Estilos dinámicos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-green)' : type === 'error' ? '#ff4757' : 'var(--bitcoin-orange)'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Agregar estilos para notificaciones
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
`;

// Inyectar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Función para copiar texto al portapapeles
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copiado al portapapeles', 'success');
    } catch (err) {
        console.error('Error al copiar:', err);
        showNotification('Error al copiar', 'error');
    }
}

// Preloader simple
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 300);
    }
});

// Lazy loading para imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Stack Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.dot');
    
    console.log('Carousel elements found:', {
        track: !!track,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        dotsCount: dots.length
    });
    
    if (!track || !prevBtn || !nextBtn || dots.length === 0) {
        console.error('Carousel elements not found, aborting carousel initialization');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = dots.length;

    function updateCarousel() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        console.log('Auto-advancing to slide:', currentSlide);
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto-play carousel
    let autoPlay = setInterval(nextSlide, 3000);

    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 3000);
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Función para cambiar idioma
function changeLanguage(lang) {
    // Guardar idioma seleccionado en localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // Obtener todos los elementos con atributos de idioma
    const elementsWithLang = document.querySelectorAll('[data-lang-es], [data-lang-en]');
    
    elementsWithLang.forEach(element => {
        const translation = element.getAttribute(`data-lang-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Actualizar el título del hero con formato HTML
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && lang === 'en') {
        heroTitle.innerHTML = `
            <span class="highlight">Cashu</span><br>
            for<br>
            <span style="white-space: nowrap;">Community Sovereignty</span>
        `;
    } else if (heroTitle && lang === 'es') {
        heroTitle.innerHTML = `
            <span class="highlight">Cashu</span><br>
            para<br>
            <span style="white-space: nowrap;">Soberanía Comunitaria</span>
        `;
    }
    
    console.log(`Idioma cambiado a: ${lang}`);
}

// Cargar idioma guardado al iniciar
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'es';
    const selectedLanguage = document.getElementById('selected-language');
    
    // Establecer bandera según idioma guardado
    if (savedLang === 'en') {
        selectedLanguage.querySelector('.flag').textContent = '🇬🇧';
        changeLanguage('en');
    } else {
        selectedLanguage.querySelector('.flag').textContent = '🇪🇸';
        changeLanguage('es');
    }
});

// Debug: Log cuando el script se carga
console.log('Cashu4CS - JavaScript cargado correctamente ✨');
console.log('Bitcoin 🧡 Lightning ⚡ Cashu 💜');