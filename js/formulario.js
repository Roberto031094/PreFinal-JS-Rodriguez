const seccionFormulario = document.getElementById('seccionFormulario');

const contenedorFlex = document.createElement('div');
contenedorFlex.style.display = 'flex';
contenedorFlex.style.justifyContent = 'center';
contenedorFlex.style.alignItems = 'center';
seccionFormulario.appendChild(contenedorFlex);

const formulario = document.createElement('form');
formulario.id = 'formPersonaje';
contenedorFlex.appendChild(formulario);

const tituloFormulario = document.createElement('h2');
tituloFormulario.textContent = 'CREA TU PERSONAJE';
formulario.appendChild(tituloFormulario);

// Esta función crea los inputs
function crearCampoFormulario(labelText, inputId, inputPlaceholder, inputPattern) {
    const label = document.createElement('label');
    label.textContent = `${labelText}: `;
    const input = document.createElement('input');
    input.type = 'text';
    input.id = inputId;
    input.placeholder = inputPlaceholder;
    input.pattern = inputPattern;
    label.appendChild(input);
    formulario.appendChild(label);
    formulario.appendChild(document.createElement('br'));
}

// Y esta crea las indicaciones
function crearIndicaciones(texto) {
    const parrafo = document.createElement('p');
    parrafo.textContent = texto;
    formulario.appendChild(parrafo);
    formulario.appendChild(document.createElement('br'));
}

crearCampoFormulario('Nombre del Personaje', 'inputNombre', 'Ingrese el nombre', '[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+');
crearIndicaciones('*Recuerda que solo puedes ingresar letras y espacios.');

crearCampoFormulario('Clase del Personaje', 'inputClase', 'Ingrese la clase', '[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+');
const btnConsultarEstadisticas = document.createElement('button');
btnConsultarEstadisticas.textContent = 'Consultar Estadísticas';
btnConsultarEstadisticas.type = 'button';
formulario.appendChild(btnConsultarEstadisticas);
formulario.appendChild(document.createElement('br'));
crearIndicaciones('*Elige entre caballero, arquero, hechicero o pugilista.');

crearCampoFormulario('Alineamiento del Personaje', 'inputAlineamiento', 'Ingrese el alineamiento', '[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+');
crearIndicaciones('*Puedes elegir estas facciones: orden, neutral o caos.');



const botones = ['Crear Ficha', 'Limpiar', 'Guardar Ficha', 'Cargar Ficha', 'Borrar Ficha'];
botones.forEach((texto) => {
    const boton = document.createElement('button');
    boton.textContent = texto;
    boton.id = 'btn' + texto.replace(/\s+/g, '');
    boton.type = texto === 'Crear Ficha' ? 'submit' : 'button';
    formulario.appendChild(boton);
});

const contenedorImagen = document.createElement('div');
const imagen = document.createElement('img');
imagen.src = './imagenes/sombras.png';
imagen.alt = 'Imagen del Personaje';
imagen.style.maxWidth = '100%';
contenedorImagen.appendChild(imagen);
contenedorFlex.appendChild(contenedorImagen);

const tituloFicha = document.querySelector('.titulo__ficha');
if (tituloFicha) {
    tituloFicha.textContent = 'Ficha de Personaje';
}