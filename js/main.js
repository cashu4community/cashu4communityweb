// Navegación móvil mejorada
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    // Toggle menu mobile
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Cerrar menú al redimensionar ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Prevenir scroll en menú móvil activo con escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
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

// Efecto de escritura mejorado para el título principal con soporte para HTML
function typeWriter(element, htmlContent, speed = 80) {
    element.innerHTML = '';
    element.style.opacity = '1';
    
    // Parser HTML para manejar tags correctamente
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Extraer texto y estructura
    const textNodes = [];
    const nodeStructure = [];
    
    function extractText(node, parentTags = []) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            if (text.trim()) {
                textNodes.push(...text.split(''));
                nodeStructure.push(...text.split('').map(char => ({
                    char,
                    tags: [...parentTags]
                })));
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'BR') {
                textNodes.push('\n');
                nodeStructure.push({ char: '\n', tags: [...parentTags] });
            } else {
                const newTags = [...parentTags, node.tagName.toLowerCase()];
                const attrs = {};
                for (let attr of node.attributes) {
                    attrs[attr.name] = attr.value;
                }
                if (Object.keys(attrs).length > 0) {
                    newTags[newTags.length - 1] = { tag: node.tagName.toLowerCase(), attrs };
                }
                
                for (let child of node.childNodes) {
                    extractText(child, newTags);
                }
            }
        }
    }
    
    extractText(tempDiv);
    
    let currentIndex = 0;
    
    function buildHTML(upToIndex) {
        let html = '';
        let openTags = [];
        
        for (let i = 0; i <= upToIndex && i < nodeStructure.length; i++) {
            const item = nodeStructure[i];
            
            // Cerrar tags que ya no son necesarios
            while (openTags.length > item.tags.length) {
                const tag = openTags.pop();
                html += `</${typeof tag === 'string' ? tag : tag.tag}>`;
            }
            
            // Abrir nuevos tags
            for (let j = openTags.length; j < item.tags.length; j++) {
                const tag = item.tags[j];
                openTags.push(tag);
                if (typeof tag === 'string') {
                    html += `<${tag}>`;
                } else {
                    const attrStr = Object.entries(tag.attrs)
                        .map(([key, value]) => `${key}="${value}"`)
                        .join(' ');
                    html += `<${tag.tag} ${attrStr}>`;
                }
            }
            
            // Agregar el carácter
            if (item.char === '\n') {
                html += '<br>';
            } else {
                html += item.char;
            }
        }
        
        // Cerrar tags restantes
        while (openTags.length > 0) {
            const tag = openTags.pop();
            html += `</${typeof tag === 'string' ? tag : tag.tag}>`;
        }
        
        return html;
    }
    
    function type() {
        if (currentIndex < nodeStructure.length) {
            element.innerHTML = buildHTML(currentIndex);
            currentIndex++;
            
            // Velocidad variable: más lento en espacios y puntuación
            const char = nodeStructure[currentIndex - 1]?.char || '';
            const currentSpeed = char.match(/[\s\.,;:!?]/) ? speed * 2 : speed;
            
            setTimeout(type, currentSpeed);
        } else {
            // Agregar clase para animación final
            element.classList.add('typing-complete');
        }
    }
    
    type();
}

// Aplicar efecto de escritura mejorado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Ocultar inicialmente
        heroTitle.style.opacity = '0';
        
        // Definir el contenido con los saltos de línea correctos
        const formattedTitle = `
            <span class="highlight">Cashu</span><br>
            <span data-lang-es="para" data-lang-en="for">for</span><br>
            <span>Community<br>Sovereignty</span>
        `;
        
        // Iniciar animación después de un delay
        setTimeout(() => {
            typeWriter(heroTitle, formattedTitle.trim(), 60);
        }, 800);
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

    // Touch/swipe support for mobile - Mejorado
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;
    let isScrolling = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isScrolling = false;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Detectar si es scroll vertical
        if (Math.abs(diffY) > Math.abs(diffX)) {
            isScrolling = true;
        } else {
            // Prevenir scroll horizontal si es swipe del carousel
            e.preventDefault();
        }
    }, { passive: false });

    track.addEventListener('touchend', (e) => {
        if (isScrolling) return;
        
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        // Reset values
        startX = 0;
        endX = 0;
        startY = 0;
        endY = 0;
    }, { passive: true });
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
            // Para elementos con <br>, usar innerHTML en lugar de textContent
            if (translation.includes('<br>')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Actualizar el título del hero con formato HTML
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && lang === 'en') {
        heroTitle.innerHTML = `
            <span class="highlight">Cashu</span><br>
            for<br>
            <span>Community<br>Sovereignty</span>
        `;
    } else if (heroTitle && lang === 'es') {
        heroTitle.innerHTML = `
            <span class="highlight">Cashu</span><br>
            para<br>
            <span>Soberanía Comunitaria</span>
        `;
    }
    
    // Aplicar saltos de línea según el dispositivo después del cambio de idioma
    applyCarouselLineBreaks();
    
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

// Responsive utilities and device detection
function getDeviceType() {
    const width = window.innerWidth;
    if (width <= 360) return 'mobile-tiny';
    if (width <= 600) return 'mobile-small';
    if (width <= 800) return 'mobile';
    if (width <= 1024) return 'tablet';
    if (width <= 1200) return 'laptop';
    return 'desktop';
}

// Función para aplicar saltos de línea en carousel solo en móvil
function applyCarouselLineBreaks() {
    const deviceType = getDeviceType();
    const carouselItems = document.querySelectorAll('.carousel-item p');
    
    if (deviceType === 'mobile-tiny' || deviceType === 'mobile-small' || deviceType === 'mobile') {
        // Textos con saltos de línea para móvil
        const mobileTexts = [
            {
                es: "Nodos neutrinos administrados<br>por cada comunidad para<br>máxima autonomía",
                en: "Neutrino nodes managed<br>by each community for<br>maximum autonomy"
            },
            {
                es: "Cada comunidad tendrá su propia<br>instancia LNbits personalizada<br>y soberana",
                en: "Each community will have<br>its own customized and<br>sovereign LNbits instance"
            },
            {
                es: "Mints Cashu con implementación<br>Mintd para transacciones<br>privadas, seguras y<br>resistentes a censura",
                en: "Cashu mints with Mintd<br>implementation for private, secure<br>and censorship-resistant transactions"
            },
            {
                es: "Acceso móvil optimizado<br>a LNbits desde cualquier<br>dispositivo utilizando LaChispa",
                en: "Optimized mobile access<br>to LNbits from any device<br>using LaChispa"
            },
            {
                es: "Administración intuitiva del mint<br>con herramientas de gestión<br>completas utilizando Orchard",
                en: "Intuitive mint administration<br>with comprehensive management<br>tools using Orchard"
            }
        ];
        
        carouselItems.forEach((item, index) => {
            if (mobileTexts[index]) {
                const currentLang = localStorage.getItem('selectedLanguage') || 'es';
                item.innerHTML = mobileTexts[index][currentLang];
            }
        });
    } else {
        // Textos sin saltos de línea para desktop
        const desktopTexts = [
            {
                es: "Nodos neutrinos administrados por cada comunidad para máxima autonomía",
                en: "Neutrino nodes managed by each community for maximum autonomy"
            },
            {
                es: "Cada comunidad tendrá su propia instancia LNbits personalizada y soberana",
                en: "Each community will have its own customized and sovereign LNbits instance"
            },
            {
                es: "Mints Cashu con implementación Mintd para transacciones privadas, seguras y resistentes a censura",
                en: "Cashu mints with Mintd implementation for private, secure and censorship-resistant transactions"
            },
            {
                es: "Acceso móvil optimizado a LNbits desde cualquier dispositivo utilizando LaChispa",
                en: "Optimized mobile access to LNbits from any device using LaChispa"
            },
            {
                es: "Administración intuitiva del mint con herramientas de gestión completas utilizando Orchard",
                en: "Intuitive mint administration with comprehensive management tools using Orchard"
            }
        ];
        
        carouselItems.forEach((item, index) => {
            if (desktopTexts[index]) {
                const currentLang = localStorage.getItem('selectedLanguage') || 'es';
                item.textContent = desktopTexts[index][currentLang];
            }
        });
    }
}

// Adjust carousel autoplay based on device
function adjustCarouselBehavior() {
    const deviceType = getDeviceType();
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        // Slower autoplay on mobile for better UX
        const autoplaySpeed = deviceType === 'mobile' ? 5000 : 3000;
        
        // Update autoplay timing if carousel exists
        const track = document.getElementById('carousel-track');
        if (track && track.autoplayInterval) {
            clearInterval(track.autoplayInterval);
            track.autoplayInterval = setInterval(() => {
                const event = new CustomEvent('nextSlide');
                carouselContainer.dispatchEvent(event);
            }, autoplaySpeed);
        }
    }
}

// Optimize images for mobile
function optimizeImagesForDevice() {
    const deviceType = getDeviceType();
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (deviceType === 'mobile') {
            // Add loading="lazy" for better performance on mobile
            img.setAttribute('loading', 'lazy');
        }
    });
}

// Handle orientation changes
function handleOrientationChange() {
    // Small delay to ensure layout has updated
    setTimeout(() => {
        // Recalculate carousel if it exists
        const carouselTrack = document.getElementById('carousel-track');
        if (carouselTrack) {
            const currentSlide = parseInt(carouselTrack.dataset.currentSlide) || 0;
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Adjust other responsive elements
        adjustCarouselBehavior();
    }, 100);
}

// Initialize responsive features
document.addEventListener('DOMContentLoaded', function() {
    optimizeImagesForDevice();
    adjustCarouselBehavior();
    applyCarouselLineBreaks();
    
    // Listen for orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Listen for resize events with debouncing
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            adjustCarouselBehavior();
            optimizeImagesForDevice();
            applyCarouselLineBreaks();
        }, 250);
    });
});

// Smooth scroll enhancement for mobile
function enhancedSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const deviceType = getDeviceType();
                const headerHeight = deviceType === 'mobile' ? 65 : 70;
                const offsetTop = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize enhanced smooth scroll
document.addEventListener('DOMContentLoaded', enhancedSmoothScroll);

// Debug: Log cuando el script se carga
console.log('Cashu4Community - JavaScript cargado correctamente ✨');
console.log('Bitcoin 🧡 Lightning ⚡ Cashu 💜');
console.log(`Dispositivo detectado: ${getDeviceType()}`);