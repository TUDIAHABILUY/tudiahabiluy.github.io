// Lista de feriados en Uruguay
const feriados = new Set([
    '2025-01-01', '2025-01-06', '2025-03-01', '2025-03-02', '2025-03-03', '2025-03-04', 
    '2025-04-14', '2025-04-15', '2025-04-16', '2025-04-17', '2025-04-18', '2025-04-19', '2025-04-20', 
    '2025-05-01', '2025-05-18', '2025-06-19', '2025-07-18', '2025-08-25', '2025-10-12', 
    '2025-11-02', '2025-12-25'
]);

// Función para verificar si una fecha es feriado o fin de semana
function esFeriadoOFinDeSemana(fecha) {
    const dia = fecha.getDay(); // 0 = domingo, 6 = sábado
    const fechaStr = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    return dia === 0 || dia === 6 || feriados.has(fechaStr);
}

// Función para obtener el siguiente día hábil después de una fecha dada
function obtenerSiguienteDiaHabil(fecha) {
    let nuevaFecha = new Date(fecha); // Crear una copia de la fecha
    do {
        nuevaFecha.setDate(nuevaFecha.getDate() + 1); // Avanzar al siguiente día
    } while (esFeriadoOFinDeSemana(nuevaFecha)); // Saltar feriados y fines de semana
    return nuevaFecha;
}

// Función para calcular el día hábil
function calcularDiaHabil() {
    let fechaSeleccionada = document.getElementById('fecha').value;
    let diasHabil = parseInt(document.getElementById('dias').value, 10);

    if (!fechaSeleccionada || isNaN(diasHabil) || diasHabil <= 0) {
        alert('Por favor, ingresa una fecha válida y un número de días hábiles mayor a 0.');
        return;
    }

    let fecha = new Date(fechaSeleccionada);
    
    // Paso 1: Ajuste inicial según el día seleccionado
    let diaSeleccionado = fecha.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado

    if (diaSeleccionado === 5 || diaSeleccionado === 6) { // Si es viernes o sábado
        // Si es viernes o sábado, comenzar el lunes siguiente
        fecha.setDate(fecha.getDate() + (8 - diaSeleccionado)); // Ajusta al lunes siguiente
    } else {
        // Si es domingo o cualquier otro día, avanzar al siguiente día
        fecha.setDate(fecha.getDate() + 1);
    }

    // Paso 2: Contar los días hábiles
    let contador = 0;
    while (contador < diasHabil) {
        fecha = obtenerSiguienteDiaHabil(fecha); // Avanzar al siguiente día hábil
        contador++;
    }

    document.getElementById('resultado').textContent = `El día hábil número ${diasHabil} es: ${fecha.toISOString().split('T')[0]}`;
}
