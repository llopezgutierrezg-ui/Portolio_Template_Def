document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DEL DOM ---
    const modal = document.getElementById('modalOverlay');
    const closeBtn = document.querySelector('.close-modal');
    
    // Elementos internos del Modal (NUEVA ESTRUCTURA)
    // Buscamos el contenedor donde se inyectará la foto/video/textarea
    const pMediaContainer = modal.querySelector('.media-content'); 
    
    // Botones de navegación (Flechas)
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    // Textos y etiquetas
    const pTags = modal.querySelector('.tags-container');
    const pMeta = modal.querySelector('.card-meta'); 
    const pTitle = modal.querySelector('.card-body h2');
    
    // Intentamos buscar la clase nueva, si no existe, usamos la genérica 'p'
    const pDesc = modal.querySelector('.project-description') || modal.querySelector('.card-body p');
    
    const pFooter = modal.querySelector('.card-footer');

    // Triggers (elementos de la lista que abren el popup)
    const triggers = document.querySelectorAll('.lista_proyecto li');

    // VARIABLES DE ESTADO
    let proyectosData = [];
    let currentMediaArray = []; // Array de imágenes/videos del proyecto actual
    let currentIndex = 0;       // Posición actual del carrusel

    // --- 1. CARGAR DATOS ---
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            proyectosData = data;
        })
        .catch(error => console.error('Error cargando JSON:', error));


    // --- FUNCIÓN AUXILIAR: RENDERIZAR MEDIA (FOTO O VIDEO) ---
    const renderMedia = (index) => {
        // Limpiamos el contenedor
        pMediaContainer.innerHTML = '';
        
        // Obtenemos la ruta del archivo actual
        const mediaSource = currentMediaArray[index];
        
        // Detectamos si es video buscando la extensión
        const isVideo = mediaSource.toLowerCase().endsWith('.mp4') || 
                        mediaSource.toLowerCase().endsWith('.webm') ||
                        mediaSource.toLowerCase().endsWith('.mov');

        let element;

        if (isVideo) {
            // Creamos etiqueta VIDEO
            element = document.createElement('video');
            element.src = mediaSource;
            element.autoplay = true;
            element.muted = true; // Necesario para autoplay
            element.loop = true;
            element.controls = true; // Controles de play/pausa
            element.playsInline = true;
        } else {
            // Creamos etiqueta IMG
            element = document.createElement('img');
            element.src = mediaSource;
            element.alt = "Proyecto media";
        }

        // Añadimos al contenedor
        pMediaContainer.appendChild(element);
    };

    // --- FUNCIÓN AUXILIAR: GESTIONAR FLECHAS ---
    const updateArrows = () => {
        // Si hay más de 1 imagen, mostramos flechas. Si no, las ocultamos.
        if (currentMediaArray.length > 1) {
            if(prevBtn) prevBtn.style.display = 'flex';
            if(nextBtn) nextBtn.style.display = 'flex';
        } else {
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
        }
    };


    // --- 2. ABRIR POPUP (EVENTO CLICK) ---
    triggers.forEach(trigger => {
        trigger.style.cursor = 'pointer';

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            const clickId = trigger.getAttribute('data-id');
            const proyecto = proyectosData.find(p => p.id === clickId);

            if (proyecto) {
                // A. TEXTOS
                pTitle.textContent = proyecto.nombre;
                // Usamos innerHTML para respetar saltos de línea si vienen en el JSON
                pDesc.innerHTML = proyecto.descripcion; 
                if(pMeta) pMeta.textContent = proyecto.categoria;


                // --- B. LÓGICA PRINCIPAL: ¿ES FRENESÍ O UN PROYECTO NORMAL? ---
                
                if (clickId === 'frenesi') {
                    // CASO ESPECIAL: FRENESÍ (Solo Text Area)
                    
                    // 1. Limpiamos contenedor
                    pMediaContainer.innerHTML = '';
                    
                    // 2. Ocultamos flechas (no hay galería)
                    if(prevBtn) prevBtn.style.display = 'none';
                    if(nextBtn) nextBtn.style.display = 'none';

                    // 3. Creamos el Probador de Fuente
                    const textArea = document.createElement('textarea');
                    textArea.className = 'type-tester-input'; // Clase definida en CSS
                    textArea.placeholder = 'Type here to test the font...';
                    textArea.value = 'WRITE SOMETHING HERE'; // Texto inicial
                    textArea.spellcheck = false;

                    // Evitar que pulsar teclas mueva cosas raras
                    textArea.addEventListener('keydown', (ev) => ev.stopPropagation());

                    pMediaContainer.appendChild(textArea);

                } else {
                    // CASO NORMAL: CARRUSEL DE FOTOS/VIDEOS
                    
                    // 1. Preparamos el array de medios (si es string lo convertimos a array)
                    if (Array.isArray(proyecto.imagen)) {
                        currentMediaArray = proyecto.imagen;
                    } else {
                        currentMediaArray = [proyecto.imagen];
                    }
                    
                    // 2. Reiniciamos índice
                    currentIndex = 0;
                    
                    // 3. Renderizamos
                    renderMedia(currentIndex);
                    updateArrows();
                }


                // C. ETIQUETAS
                pTags.innerHTML = ''; 
                if(proyecto.etiquetas){
                    proyecto.etiquetas.forEach(tagTexto => {
                        const span = document.createElement('span');
                        span.classList.add('tag');
                        span.textContent = tagTexto;
                        pTags.appendChild(span);
                    });
                }

                // D. ICONOS DEL FOOTER
                pFooter.innerHTML = ''; 
                if(proyecto.iconos){
                    proyecto.iconos.forEach(rutaIcono => {
                        const div = document.createElement('div');
                        div.classList.add('tech-icon');
                        
                        const img = document.createElement('img');
                        img.src = rutaIcono;
                        img.alt = "Icono";
                        
                        div.appendChild(img);
                        pFooter.appendChild(div);
                    });
                }

                modal.classList.add('show');
            }
        });
    });


    // --- 3. FUNCIONALIDAD DEL CARRUSEL (BOTONES NEXT/PREV) ---
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar cerrar el modal
            if (currentMediaArray.length > 1) {
                currentIndex++;
                // Loop infinito: si llega al final, vuelve al 0
                if (currentIndex >= currentMediaArray.length) {
                    currentIndex = 0;
                }
                renderMedia(currentIndex);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentMediaArray.length > 1) {
                currentIndex--;
                // Loop infinito: si baja de 0, va al último
                if (currentIndex < 0) {
                    currentIndex = currentMediaArray.length - 1;
                }
                renderMedia(currentIndex);
            }
        });
    }


    // --- 4. CERRAR POPUP ---
    const closeModal = () => {
        modal.classList.remove('show');
        // Pequeño timeout para limpiar el vídeo y que deje de sonar
        setTimeout(() => {
            pMediaContainer.innerHTML = ''; 
        }, 300);
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
        
        // Extra: Teclas derecha/izquierda para mover galería
        if (modal.classList.contains('show')) {
            if (e.key === 'ArrowRight' && nextBtn && nextBtn.style.display !== 'none') nextBtn.click();
            if (e.key === 'ArrowLeft' && prevBtn && prevBtn.style.display !== 'none') prevBtn.click();
        }
    });
});