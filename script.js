// Función para calcular la diferencia en días entre dos fechas
function calcularDias() {
    // Obtener las fechas de inicio y final del formulario
    var fechainicio = new Date(document.getElementById("inicio").value);
    var fechafin = new Date(document.getElementById("final").value);
    
    // Calcular la diferencia en milisegundos
    var diferencia = fechafin.getTime() - fechainicio.getTime();

    // Calcular los días redondeando hacia arriba
    var dias = Math.ceil(diferencia / (1000 * 3600 * 24));
  
    // Verificar diferentes casos y mostrar el resultado en el campo de resultado
    if (dias === 1) {
        document.getElementById("resultado").value = dias + " día de diferencia";
    } else if (dias === 0) {
        document.getElementById("resultado").value = "No hay diferencia";
    } else if (dias < 0) {
        document.getElementById("resultado").value = "La fecha de inicio debe ser menor a la fecha final";
    } else if (document.getElementById("inicio").value === "" || document.getElementById("final").value === "") {
        document.getElementById("resultado").value = "Por favor, ingrese ambas fechas";
    } else {
        document.getElementById("resultado").value = dias + " días de diferencia";
    }
}

// Función para obtener la fecha actual en formato YYYY-MM-DD
function obtenerFechaActual() {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; // Los meses comienzan desde 0
    var anio = fecha.getFullYear();

    // Asegurarse de que el día y el mes tengan 2 dígitos
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    // Devolver la fecha en formato YYYY-MM-DD
    return anio + '-' + mes + '-' + dia;
}

// Establecer la fecha actual en el campo de fecha de inicio al cargar la página
document.getElementById('inicio').value = obtenerFechaActual();
