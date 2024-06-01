function mostrarSeccion(seccionId) {
    const secciones = document.querySelectorAll('.container');
    secciones.forEach(seccion => {
        if (seccion.id === seccionId) {
            seccion.style.display = 'block';
        } else {
            seccion.style.display = 'none';
        }
    });
}

// Mostrar por defecto la primera sección (Cronómetro)
document.addEventListener('DOMContentLoaded', () => {
    mostrarSeccion('reloj');
});

// Código existente para el cronómetro
let startTime;
let elapsedTime = 0;
let cronometroInterval;
let corriendo = false;

function actualizarCronometro(timestamp) {
    if (!startTime) startTime = timestamp;
    const deltaTime = timestamp - startTime;
    startTime = timestamp;
    elapsedTime += deltaTime;

    const totalMilisegundos = Math.floor(elapsedTime);
    const totalSegundos = Math.floor(totalMilisegundos / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    document.getElementById('cronometroDisplay').textContent =
        (horas < 10 ? '0' + horas : horas) + ':' +
        (minutos < 10 ? '0' + minutos : minutos) + ':' +
        (segundos < 10 ? '0' + segundos : segundos);

    if (corriendo) {
        cronometroInterval = requestAnimationFrame(actualizarCronometro);
    }
}

function iniciarCronometro() {
    if (!corriendo) {
        startTime = null;
        cronometroInterval = requestAnimationFrame(actualizarCronometro);
        corriendo = true;
    }
}

function pausarCronometro() {
    if (corriendo) {
        cancelAnimationFrame(cronometroInterval);
        corriendo = false;
    }
}

function reiniciarCronometro() {
    cancelAnimationFrame(cronometroInterval);
    elapsedTime = 0;
    document.getElementById('cronometroDisplay').textContent = '00:00:00';
    corriendo = false;
    document.getElementById('vueltas').innerHTML = '';
}

function vueltaCronometro() {
    const vueltaTiempo = document.getElementById('cronometroDisplay').textContent;
    const li = document.createElement('li');
    li.textContent = vueltaTiempo;
    document.getElementById('vueltas').appendChild(li);
}

// Código existente para el contador de días
function calcularDias() {
    const fechaInicio = new Date(document.getElementById('inicio').value);
    const fechaFinal = new Date(document.getElementById('final').value);
    if (fechaInicio && fechaFinal && fechaFinal >= fechaInicio) {
        const diferencia = Math.ceil((fechaFinal - fechaInicio) / (1000 * 60 * 60 * 24));
        document.getElementById('resultado').value = diferencia + ' días';
    } else {
        document.getElementById('resultado').value = 'Fecha inválida';
    }
}
// Código para el reloj
function actualizarReloj() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');

    const dia = ahora.getDate();
    const mes = ahora.toLocaleString('default', { month: 'long' });
    const año = ahora.getFullYear();
    const diaSemana = ahora.toLocaleDateString('default', { weekday: 'long' });

    document.getElementById('relojDisplay').textContent = `${horas}:${minutos}:${segundos}`;
    document.getElementById('fechaDisplay').textContent = `${diaSemana}, ${dia} de ${mes} de ${año}`;
}

function iniciarReloj() {
    actualizarReloj();
    setInterval(actualizarReloj, 1000);
}
document.addEventListener('DOMContentLoaded', iniciarReloj);
function establecerAlarma() {
    const horaAlarma = document.getElementById('horaAlarma').value;
    const [hora, minutos] = horaAlarma.split(':');
    const horaActual = new Date();
    const horaAlarmaFecha = new Date(horaActual.getFullYear(), horaActual.getMonth(), horaActual.getDate(), hora, minutos);
    
    const ahora = new Date();

    const tiempoRestante = horaAlarmaFecha - ahora;

    if (tiempoRestante > 0) {
        setTimeout(() => {
            document.getElementById('mensajeAlarma').style.display = 'block';
            reproducirSonido(); // Llamada a la función para reproducir el sonido
        }, tiempoRestante);
    } else {
        alert('La hora de la alarma debe ser en el futuro');
    }
}

function reproducirSonido() {
    const audio = new Audio('prueba.mp3');
    audio.play();
}



