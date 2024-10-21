document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    // Initialize nav toggle button if it doesn't exist
    if (!navToggle) {
        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.innerHTML = '☰';
        toggle.setAttribute('aria-label', 'Toggle navigation');
        nav.parentNode.insertBefore(toggle, nav);
    }

    // Toggle menu
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        navToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            navToggle.innerHTML = '☰';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('active');
            navToggle.innerHTML = '☰';
        }
    });

    // Prevent menu from closing when clicking inside
    nav.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Helper function to detect if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Trigger animations when the element is in the viewport
function triggerAnimations() {
    const elementsToAnimate = document.querySelectorAll('section, header, footer');
    
    elementsToAnimate.forEach((element) => {
        if (isInViewport(element)) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', triggerAnimations);
