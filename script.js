// ==========================================
// CHERRY'S FLOWER SHOP - JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // VARIABLES GLOBALES
    // ==========================================
    
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scroll-top');
    const faqItems = document.querySelectorAll('.faq-item');
    const productCards = document.querySelectorAll('.product-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // ==========================================
    // NAVEGACIÓN MÓVIL
    // ==========================================
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // ==========================================
    // NAVEGACIÓN ACTIVA AL HACER SCROLL
    // ==========================================
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // ==========================================
    // SCROLL TO TOP BUTTON
    // ==========================================
    
    function handleScrollTopButton() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==========================================
    // SMOOTH SCROLL PARA ENLACES
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // ANIMACIONES AL HACER SCROLL
    // ==========================================
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animaciones escalonadas para cards
                if (entry.target.classList.contains('product-card') || 
                    entry.target.classList.contains('testimonial-card')) {
                    const cards = entry.target.parentElement.children;
                    Array.from(cards).forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observar product cards
    productCards.forEach(card => {
        scrollObserver.observe(card);
    });
    
    // Observar testimonial cards
    testimonialCards.forEach(card => {
        scrollObserver.observe(card);
    });
    
    // Observar todos los elementos con clase scroll-animate
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
    scrollAnimateElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // ==========================================
    // FAQ ACCORDION
    // ==========================================
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Abrir el clickeado si no estaba activo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ==========================================
    // FORMULARIO DE NEWSLETTER
    // ==========================================
    
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Animación de éxito
            showNotification('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.', 'success');
            
            // Limpiar formulario
            emailInput.value = '';
            
            // Aquí iría la lógica para enviar el email al backend
            console.log('Newsletter subscription:', email);
        });
    }
    
    // ==========================================
    // FORMULARIO DE CONTACTO
    // ==========================================
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Animación de envío
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío
            setTimeout(() => {
                showNotification('¡Mensaje enviado con éxito! Te responderemos pronto.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Aquí iría la lógica para enviar al backend
                console.log('Contact form data:', data);
            }, 1500);
        });
    }
    
    // ==========================================
    // SISTEMA DE NOTIFICACIONES
    // ==========================================
    
    function showNotification(message, type = 'success') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                right: 20px;
                background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                animation: slideInRight 0.4s ease, slideOutRight 0.4s ease 2.6s;
                max-width: 350px;
            ">
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // ==========================================
    // PARALLAX EFFECT EN HERO
    // ==========================================
    
    function handleParallax() {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }
    
    // ==========================================
    // CONTADOR DE ANIMACIÓN PARA STATS (OPCIONAL)
    // ==========================================
    
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16);
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // ==========================================
    // LAZY LOADING DE IMÁGENES
    // ==========================================
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Observar imágenes con data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // ==========================================
    // ANIMACIÓN DE ENTRADA PARA SECCIONES
    // ==========================================
    
    function addScrollAnimationToSections() {
        const sections = document.querySelectorAll('.testimonials, .faq, .contact');
        
        sections.forEach(section => {
            const children = section.querySelectorAll('.section-header, .contact-info, .contact-form');
            children.forEach((child, index) => {
                child.classList.add('scroll-animate');
                child.style.transitionDelay = `${index * 0.1}s`;
                scrollObserver.observe(child);
            });
        });
    }
    
    addScrollAnimationToSections();
    
    // ==========================================
    // TYPING EFFECT EN HERO (OPCIONAL)
    // ==========================================
    
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Activar typing effect en hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // typeWriter(heroTitle, originalText, 100); // Descomentar para activar
    }
    
    // ==========================================
    // EVENT LISTENERS PRINCIPALES
    // ==========================================
    
    window.addEventListener('scroll', function() {
        handleHeaderScroll();
        handleScrollTopButton();
        updateActiveNavLink();
        handleParallax();
    });
    
    // ==========================================
    // RESIZE HANDLER
    // ==========================================
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Cerrar menú móvil si se redimensiona a desktop
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }, 250);
    });
    
    // ==========================================
    // ANIMACIONES CSS ADICIONALES
    // ==========================================
    
    // Agregar estilos de animación para notificaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
        
        .loading::after {
            content: '';
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-left: 8px;
            border: 2px solid #fff;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // MOUSE PARALLAX EFFECT EN PRODUCTS
    // ==========================================
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            const img = this.querySelector('.product-image img');
            if (img) {
                img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.product-image img');
            if (img) {
                img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            }
        });
    });
    
    // ==========================================
    // INICIALIZACIÓN COMPLETA
    // ==========================================
    
    console.log('🌸 Cherry\'s Flower Shop initialized successfully!');
    
    // Ejecutar funciones iniciales
    handleHeaderScroll();
    handleScrollTopButton();
    updateActiveNavLink();
    
    // ==========================================
    // EASTER EGG - EFECTO CONFETTI (OPCIONAL)
    // ==========================================
    
    let clickCount = 0;
    const logoIcon = document.querySelector('.logo-icon');
    
    if (logoIcon) {
        logoIcon.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 5) {
                createConfetti();
                clickCount = 0;
            }
        });
    }
    
    function createConfetti() {
        const colors = ['#f5b5b5', '#e89b9b', '#d4a5a5', '#fde8e8'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background-color: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                opacity: 1;
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${2 + Math.random() * 2}s ease-out forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }
    }
    
    // Agregar animación de confetti
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(${Math.random() * 720}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);
    
    // ==========================================
    // PERFORMANCE OPTIMIZATION
    // ==========================================
    
    // Debounce function para eventos de scroll
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function para eventos continuos
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Aplicar throttle a eventos de scroll intensivos
    window.addEventListener('scroll', throttle(handleParallax, 16));
    
});

// ==========================================
// FIN DEL SCRIPT
// ==========================================
