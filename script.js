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
