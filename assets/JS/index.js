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