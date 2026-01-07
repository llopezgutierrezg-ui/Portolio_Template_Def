document.addEventListener("DOMContentLoaded", () => {
    const titulo = document.querySelector(".loading-center h1");
    const pantalla = document.getElementById("loading-screen");
    
    const palabras = ["WELCOME", "TO", "SY", "\"RAH'S", "PORTFOLIO"];
    
    // TIEMPOS AJUSTADOS PARA 7 SEGUNDOS TOTALES
    // (0.4s entra + 0.6s lee + 0.4s sale = 1.4s por palabra x 5 = 7s)
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
            // FIN: Cuando acaba la última palabra...
            
            // 1. Desvanecemos toda la pantalla blanca suavemente
            pantalla.classList.add("pantalla-off");
            
            // 2. Esperamos a que termine el desvanecimiento y cambiamos de web
            /*
            
            REVISAR ESTO


            
            
            (() => {
                window.location.href = "index.html"; 
            }, 800); // 800ms coincide con la transición CSS*/
        }
    }

    // Iniciamos
    animarPalabra();
});