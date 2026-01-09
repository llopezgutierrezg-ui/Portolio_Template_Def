document.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const hero = document.getElementById("hero");

  // Obtenemos la altura del Hero
  const heroHeight = hero.offsetHeight;

  // Si hemos bajado más que la altura del Hero (restamos 50px para que cambie un poco antes)
  if (window.scrollY > heroHeight - 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Seleccionamos la sección de skills
  const skillsSection = document.getElementById("skills-section");

  // 2. Comprobamos que exista para evitar errores
  if (skillsSection) {
    // 3. Creamos un "Observador" que vigila cuando la sección entra en pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Si la sección es visible...
          if (entry.isIntersecting) {
            // ...añadimos la clase que activa el CSS
            skillsSection.classList.add("skills-visible");
            // (Opcional) Dejamos de observar para que no se repita la animación
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    ); // Se activa al ver el 20% de la sección

    // 4. Empezamos a observar
    observer.observe(skillsSection);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".menu a");

  // Toggle para abrir/cerrar
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Cerrar menú al hacer click en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const scrollPill = document.querySelector(".js-scroll-pill");
  const aboutSection = document.querySelector("#about-section");
  let isDesktop = window.innerWidth > 900;

  // Función para verificar el tamaño de pantalla
  window.addEventListener("resize", () => {
    isDesktop = window.innerWidth > 900;
    if (!isDesktop) {
      // Resetear posición si pasamos a móvil
      scrollPill.style.transform = "translateX(-50%)";
    }
  });

  function moveButtonOnScroll() {
    // Si es móvil, no hacemos nada (el CSS se encarga)
    if (!isDesktop || !scrollPill || !aboutSection) return;

    // Posición actual del scroll
    const scrollY = window.scrollY;
    // Altura de la ventana
    const windowHeight = window.innerHeight;
    // Dónde empieza la sección About respecto al topo de la página
    const aboutTop = aboutSection.offsetTop;

    // Calculamos cuándo la sección About empieza a entrar en la pantalla por abajo
    const triggerPoint = aboutTop - windowHeight;

    if (scrollY > triggerPoint) {
      // Calculamos cuánto hemos hecho scroll desde que apareció la sección
      const scrolledPastTrigger = scrollY - triggerPoint;

      // Objetivo: El centro del placeholder gris.
      // Cálculo aproximado: Padding superior (80px) + Mitad de altura del placeholder (~30vh).
      // Definimos un tope máximo de movimiento hacia abajo (aprox 300px)
      const maxMovement = 150;

      // Movemos el botón hacia abajo, un poco más lento que el scroll (factor 0.7),
      // hasta llegar al tope máximo.
      let moveY = Math.min(scrolledPastTrigger * 0.7, maxMovement);

      // Aplicamos la transformación. Mantenemos el centrado X y aplicamos el movimiento Y.
      scrollPill.style.transform = `translate(-50%, ${moveY}px)`;
    } else {
      // Si estamos arriba del todo, posición inicial
      scrollPill.style.transform = `translate(-50%, 0px)`;
    }
  }

  // Escuchar el evento scroll. Usar passive: true mejora el rendimiento.
  window.addEventListener("scroll", moveButtonOnScroll, { passive: true });
  // Ejecutar una vez al inicio para colocarlo bien si la página carga scrolleada
  moveButtonOnScroll();
});
