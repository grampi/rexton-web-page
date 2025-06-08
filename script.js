// Płynne przewijanie do sekcji po kliknięciu w link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Zmiana stylu nagłówka podczas przewijania
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Menu mobilne z poprawioną obsługą dotykową
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const body = document.querySelector('body');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Zapobiega przewijaniu strony, gdy menu jest otwarte
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Zamykanie menu po kliknięciu w link
document.querySelectorAll('nav ul li a').forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Zamknij menu po kliknięciu poza obszarem menu
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !e.target.closest('nav') &&
        !e.target.closest('.hamburger')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Lepsze animacje na urządzeniach mobilnych - wykrywanie wydajności
let useHighPerformanceAnimations = true;

// Prosta detekcja urządzeń o niskiej wydajności
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Sprawdź, czy urządzenie ma niską pamięć RAM (przybliżenie)
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        useHighPerformanceAnimations = false;
    }
}

// Animacje elementów po przewinięciu z optymalizacją wydajności
const animateOnScroll = function () {
    const elements = document.querySelectorAll('.service-card, .about-image, .about-text, .testimonial-card, .portfolio-item, .contact-info, .contact-form');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 50) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Inicjalizacja animacji z uwzględnieniem wydajności
window.addEventListener('load', function () {
    // Ustawienie mniejszej liczby animacji na słabszych urządzeniach
    if (useHighPerformanceAnimations) {
        document.querySelectorAll('.service-card, .about-image, .about-text, .testimonial-card, .portfolio-item, .contact-info, .contact-form').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        });
    } else {
        // Tylko proste animacje dla słabszych urządzeń
        document.querySelectorAll('.service-card, .about-image, .about-text').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.4s ease';
        });
    }

    animateOnScroll();
});

// Używaj throttling dla zdarzenia scroll, aby poprawić wydajność
let scrollTimeout;
window.addEventListener('scroll', function () {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(function () {
        animateOnScroll();
        scrollTimeout = null;
    }, 100); // Throttle do 10 razy na sekundę
});

// Obsługa przycisku "do góry"
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
    }
});

backToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Filtry portfolio
document.querySelectorAll('.portfolio-filter').forEach(filter => {
    filter.addEventListener('click', function () {
        document.querySelector('.portfolio-filter.active').classList.remove('active');
        this.classList.add('active');

        // Tu można dodać logikę filtrowania projektów
    });
});