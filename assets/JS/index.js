document.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    const hero = document.getElementById("hero");
    
    // Obtenemos la altura del Hero
    const heroHeight = hero.offsetHeight;

    // Si hemos bajado más que la altura del Hero (restamos 50px para que cambie un poco antes)
    if (window.scrollY > (heroHeight - 50)) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos la sección de skills
    const skillsSection = document.getElementById('skills-section');

    // 2. Comprobamos que exista para evitar errores
    if(skillsSection) {
        // 3. Creamos un "Observador" que vigila cuando la sección entra en pantalla
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Si la sección es visible...
                if (entry.isIntersecting) {
                    // ...añadimos la clase que activa el CSS
                    skillsSection.classList.add('skills-visible');
                    // (Opcional) Dejamos de observar para que no se repita la animación
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Se activa al ver el 20% de la sección

        // 4. Empezamos a observar
        observer.observe(skillsSection);
    }
});