// src/scripts/carousel.js
export function initCarousel() {
    const container = document.getElementById("cardsContainer");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const indicators = document.querySelectorAll(".indicator");

    if (!container || !prevBtn || !nextBtn) return; // Evita errores si los elementos no están presentes

    let currentIndex = 0;
    const totalItems = 3;

    function getItemsPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }

    function updateCarousel(index) {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, totalItems - itemsPerView);
        currentIndex = Math.max(0, Math.min(index, maxIndex));

        const translateX = -(currentIndex * (100 / itemsPerView));
        if (container) {
            container.style.transform = `translateX(${translateX}%)`;
        }

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle("bg-amber-600", i === currentIndex);
            indicator.classList.toggle("bg-gray-300", i !== currentIndex);
        });
    }

    prevBtn.addEventListener("click", () => {
        updateCarousel(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
        updateCarousel(currentIndex + 1);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            updateCarousel(index);
        });
    });

    // Handle window resize
    window.addEventListener("resize", () => {
        updateCarousel(currentIndex);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll(".group");
    cards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-8px) scale(1.02)";
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)";
        });
    });

    // Add click animations to buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", function (e) {
            // Create ripple effect
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;

            this.style.position = "relative";
            this.style.overflow = "hidden";
            this.appendChild(ripple);

            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Inicializa el carrusel
    updateCarousel(currentIndex);
}
