// src/scripts/navbar.js
export function initNavbar() {
    // Control del navbar al hacer scroll
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");
    const scrollThreshold = 100;
    let ticking = false;

    function updateNavbar() {
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop <= scrollThreshold && navbar) {
            navbar.style.transform = "translateY(0)";
            navbar.classList.remove("shadow-lg");
        } else if (
            scrollTop > lastScrollTop &&
            scrollTop > scrollThreshold &&
            navbar
        ) {
            navbar.style.transform = "translateY(-100%)";
        } else if (scrollTop < lastScrollTop && navbar) {
            navbar.style.transform = "translateY(0)";
            navbar.classList.add("shadow-lg");
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener("scroll", requestTick);

    // Control del menú
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");
    const menuItems = menu?.querySelectorAll("li");

    function closeMenu() {
        if (!menu || !menuItems) return;
        menu.classList.replace("scale-y-100", "scale-y-0");
        menuItems.forEach((li) => {
            li.classList.remove("opacity-100", "translate-y-0");
            li.classList.add("opacity-0", "translate-y-2");
        });

        setTimeout(() => {
            menu.classList.add("hidden");
        }, 500);
    }

    function openMenu() {
        if (!menu || !menuItems) return;
        menu.classList.remove("hidden");
        menu.classList.add("flex");

        setTimeout(() => {
            menu.classList.replace("scale-y-0", "scale-y-100");
            menuItems.forEach((li) => {
                li.classList.remove("opacity-0", "translate-y-2");
                li.classList.add("opacity-100", "translate-y-0");
            });
        }, 50);
    }

    menuBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains("scale-y-100");
        isOpen ? closeMenu() : openMenu();
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
        const isClickInsideMenu = menu?.contains(e.target);
        const isClickOnMenuButton =
            e.target === menuBtn || menuBtn?.contains(e.target);

        if (
            !isClickInsideMenu &&
            !isClickOnMenuButton &&
            menu?.classList.contains("scale-y-100")
        ) {
            closeMenu();
        }
    });

    // Cerrar menú al cambiar el tamaño de la ventana
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
}

// Ejecutar la inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initNavbar);
