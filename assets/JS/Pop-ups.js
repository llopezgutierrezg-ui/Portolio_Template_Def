document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DEL DOM ---
    const modal = document.getElementById('modalOverlay');
    const closeBtn = document.querySelector('.close-modal');
    
    // Elementos internos de la tarjeta
    const pImage = modal.querySelector('.card-header img');
    const pTags = modal.querySelector('.tags-container');
    const pMeta = modal.querySelector('.card-meta'); 
    const pTitle = modal.querySelector('.card-body h2');
    const pDesc = modal.querySelector('.card-body p');
    const pFooter = modal.querySelector('.card-footer');

    // Triggers (elementos de la lista que abren el popup)
    const triggers = document.querySelectorAll('.lista_proyecto li');

    let proyectosData = [];

    // --- 1. CARGAR DATOS ---
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            proyectosData = data;
        })
        .catch(error => console.error('Error cargando JSON:', error));

    // --- 2. ABRIR POPUP ---
    triggers.forEach(trigger => {
        trigger.style.cursor = 'pointer';

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            const clickId = trigger.getAttribute('data-id');
            const proyecto = proyectosData.find(p => p.id === clickId);

            if (proyecto) {
                // Rellenar textos e imagen principal
                pTitle.textContent = proyecto.nombre;
                pDesc.textContent = proyecto.descripcion;
                pImage.src = proyecto.imagen;
                if(pMeta) pMeta.textContent = proyecto.categoria;

                // Generar ETIQUETAS
                pTags.innerHTML = ''; 
                if(proyecto.etiquetas){
                    proyecto.etiquetas.forEach(tagTexto => {
                        const span = document.createElement('span');
                        span.classList.add('tag');
                        span.textContent = tagTexto;
                        pTags.appendChild(span);
                    });
                }

                // --- GENERAR ICONOS (Modo Imágenes Propias) ---
                pFooter.innerHTML = ''; 
                if(proyecto.iconos){
                    proyecto.iconos.forEach(rutaIcono => {
                        // 1. Crear el cuadradito contenedor
                        const div = document.createElement('div');
                        div.classList.add('tech-icon');
                        
                        // 2. Crear la imagen
                        const img = document.createElement('img');
                        img.src = rutaIcono;
                        img.alt = "Icono"; // Accesibilidad básica
                        
                        // 3. Meter la imagen en el div y el div en el footer
                        div.appendChild(img);
                        pFooter.appendChild(div);
                    });
                }

                modal.classList.add('show');
            }
        });
    });

    // --- 3. CERRAR POPUP ---
    const closeModal = () => modal.classList.remove('show');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });
});