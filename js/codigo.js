// Evento para el botón Consultar Estadísticas
btnConsultarEstadisticas.addEventListener('click', () => {
    fetch('./json/perfil.json')                                      // Fetch
    .then(response => {                                              // Promesa
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON.');
        }
        return response.json();
    })
    .then(datosClases => {
        const totalClases = datosClases.length;
        const mitadClases = Math.ceil(totalClases / 2);

        let estadisticas = '<div style="display: flex; justify-content: center;">'; 
        estadisticas += '<div style="margin-right: 20px; text-align: left;">';
        datosClases.slice(0, mitadClases).forEach(personaje => {
            estadisticas += `<strong>Clase:</strong> ${personaje.clase}<br>`;
            estadisticas += '<ul>';
            Object.keys(personaje.estadisticas).forEach(key => {
                estadisticas += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${personaje.estadisticas[key]}</li>`;
            });
            estadisticas += '</ul><br>';
        });
        estadisticas += '</div>';

        estadisticas += '<div style="text-align: left;">';
        datosClases.slice(mitadClases).forEach(personaje => {
            estadisticas += `<strong>Clase:</strong> ${personaje.clase}<br>`;
            estadisticas += '<ul>';
            Object.keys(personaje.estadisticas).forEach(key => {
                estadisticas += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${personaje.estadisticas[key]}</li>`;
            });
            estadisticas += '</ul><br>';
        });
        estadisticas += '</div>';
        estadisticas += '</div>';

        Swal.fire({                                           // Librería #1
            title: 'Estadísticas de Clases',
            html: estadisticas,
            icon: 'info',
            customClass: {
                popup: 'swal-wide'
            }
        });
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo cargar el archivo JSON.',
            icon: 'error'
        });
    });
});

// Evento para el botón Crear Ficha
formulario.addEventListener('submit', (event) => {   //FOS
    event.preventDefault();

    const nombre = inputNombre.value.trim();
    const clase = inputClase.value.trim().toLowerCase();
    const alineamiento = inputAlineamiento.value.trim().toLowerCase();
    const alineamientosValidos = ['orden', 'neutral', 'caos'];

    if (!nombre || !clase || !alineamiento) {
        Toastify({                                             // Librería #2
            text: "Por favor, complete todos los campos.",
            duration: 3000
        }).showToast();
        return;
    }

    if (!nombre.match(inputNombre.pattern)) {
        Toastify({
            text: "Nombre inválido. Por favor, ingrese solo letras y espacios.",
            duration: 6000
        }).showToast();
        return;
    }

    if (!alineamientosValidos.includes(alineamiento)) {
        Toastify({
            text: "Alineamiento inválido. Por favor, ingrese orden, neutral o caos.",
            duration: 6000
        }).showToast();
        return;
    }

    // Obtener los datos del archivo JSON
    fetch('./json/perfil.json')
        .then(response => response.json())
        .then(datosClases => {                                              // Método para encontrar los datos de la clase
            const personaje = datosClases.find(p => p.clase === clase);

            if (!personaje) {
                Toastify({
                    text: "Clase inválida. Por favor, ingrese caballero, arquero, hechicero o pugilista.",
                    duration: 6000
                }).showToast();
                return;
            }

            Swal.fire({
                title: 'Datos Enviados',
                text: 'Ficha generada exitosamente',
                icon: 'success',
            });

            // Evento para validar y mostrar la ficha
            const handleAlert = () => {
                const [nombrePersonaje, clasePersonaje, alineamientoPersonaje, estadisticasContainer, imagenPersonaje] = [   // Destructuring de Array
                    document.getElementById('nombrePersonaje'),
                    document.getElementById('clasePersonaje'),
                    document.getElementById('alineamientoPersonaje'),
                    document.getElementById('estadisticasContainer'),
                    document.getElementById('imagenPersonaje')
                ];

                setTimeout(() => {                             // Función Asincrónica para el console.log
                    console.log({
                        nombre,
                        clase,
                        alineamiento,
                        estadisticas: personaje.estadisticas
                    });
                }, 3000);

                nombrePersonaje.innerHTML = `<strong>Nombre:</strong> ${nombre}`;
                clasePersonaje.innerHTML = `<strong>Clase:</strong> ${clase}`;
                alineamientoPersonaje.innerHTML = `<strong>Alineamiento:</strong> ${alineamiento}`;
                estadisticasContainer.innerHTML = '<strong>Estadísticas:</strong>';

                const listaEstadisticas = document.createElement('ul');

                Object.keys(personaje.estadisticas).forEach(key => {   // Ciclo ForEach
                    const statItem = document.createElement('li');
                    statItem.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${personaje.estadisticas[key]}`;
                    listaEstadisticas.appendChild(statItem);
                });

                estadisticasContainer.appendChild(listaEstadisticas);

                imagenPersonaje.innerHTML = `<img src="imagenes/${clase}.png" alt="${clase}">`;
            };

            window.setTimeout(handleAlert, 0);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            Toastify({
                text: "Error al obtener los datos de las clases.",
                duration: 6000
            }).showToast();
        });
});

//******************************** LocalStorage ***************************************//

// Get y evento del botón "Limpiar"
const btnLimpiar = document.getElementById('btnLimpiar');

btnLimpiar.addEventListener('click', () => {
    inputNombre.value = '';
    inputClase.value = '';
    inputAlineamiento.value = '';
});

// Get y evento del botón "Guardar Ficha"
const btnGuardarFicha = document.getElementById('btnGuardarFicha');

btnGuardarFicha.addEventListener('click', () => {
    const nombre = inputNombre.value.trim();
    const clase = inputClase.value.trim().toLowerCase();
    const alineamiento = inputAlineamiento.value.trim().toLowerCase();

    !nombre || !clase ? Toastify({                                         // Operador ternario
        text: 'Por favor, complete todos los campos antes de guardar.',
        duration: 3000
    }).showToast() : (() => {
        localStorage.setItem('nombrePersonaje', nombre);
        localStorage.setItem('clasePersonaje', clase);
        localStorage.setItem('alineamientoPersonaje', alineamiento);

        Toastify({
            text: 'Ficha guardada correctamente en localStorage.',
            duration: 3000
        }).showToast();
    })();
});

// Get y evento del botón "Cargar Ficha"
const btnCargarFicha = document.getElementById('btnCargarFicha');

btnCargarFicha.addEventListener('click', () => {
    const nombreGuardado = localStorage.getItem('nombrePersonaje');
    const claseGuardada = localStorage.getItem('clasePersonaje');
    const alineamientoGuardado = localStorage.getItem('alineamientoPersonaje');

    if (nombreGuardado === null || claseGuardada === null || alineamientoGuardado === null) {
        Toastify({
            text: 'No hay ficha guardada en localStorage.',
            duration: 3000
        }).showToast();
        return;
    }

    inputNombre.value = nombreGuardado;
    inputClase.value = claseGuardada;
    inputAlineamiento.value = alineamientoGuardado;

    Toastify({
        text: 'Ficha cargada desde localStorage.',
        duration: 3000
    }).showToast();
});

// Get y evento del botón "Borrar Ficha"
const btnBorrarFicha = document.getElementById('btnBorrarFicha');

btnBorrarFicha.addEventListener('click', () => {
    const nombreGuardado = localStorage.getItem('nombrePersonaje');
    const claseGuardada = localStorage.getItem('clasePersonaje');
    const alineamientoGuardado = localStorage.getItem('alineamientoPersonaje');

    if (nombreGuardado === null && claseGuardada === null && alineamientoGuardado === null) {
        Toastify({
            text: 'No hay ficha guardada en localStorage para borrar.',
            duration: 3000
        }).showToast();
        return;
    }

    localStorage.removeItem('nombrePersonaje');
    localStorage.removeItem('clasePersonaje');
    localStorage.removeItem('alineamientoPersonaje');

    Toastify({
        text: 'Ficha eliminada de localStorage.',
        duration: 3000
    }).showToast();
});