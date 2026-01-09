document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.querySelector(".loading-center h1");
  const pantalla = document.getElementById("loading-screen");

  const palabras = ["WELCOME", "TO", "SY", "\"RAH'S", "PORTFOLIO"];

  const tiempoLectura = 600;
  const tiempoTransicion = 400;

  let i = 0;

  function animarPalabra() {
    if (i < palabras.length) {
      // 1. Cambiamos texto
      titulo.textContent = palabras[i];

      // 2. Entrar (Fade In)
      setTimeout(() => {
        titulo.classList.add("visible");
      }, 50);

      // 3. Salir (Fade Out) - AHORA LO HACEMOS SIEMPRE, INCLUIDA LA ÚLTIMA
      setTimeout(() => {
        titulo.classList.remove("visible");
      }, 50 + tiempoLectura);

      // 4. Siguiente ciclo
      i++;
      setTimeout(animarPalabra, 50 + tiempoLectura + tiempoTransicion);
    } else {
      // Ocultamos la pantalla de carga visualmente
      pantalla.classList.add("pantalla-off");

      // --- AQUÍ ESTABA EL ERROR ---
      // Faltaba envolverlo en setTimeout
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 800);
    }
  }

  // Iniciamos
  animarPalabra();
});
