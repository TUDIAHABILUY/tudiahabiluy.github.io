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
    do {
        fecha.setDate(fecha.getDate() + 1); // Avanzar al siguiente día
    } while (esFeriadoOFinDeSemana(fecha)); // Saltar feriados y fines de semana
    return fecha;
}

// Función principal para calcular el día hábil solicitado
function calcularDiaHabil() {
    const fechaSeleccionada = document.getElementById('fecha').value;
    const diasHabil = parseInt(document.getElementById('dias').value);

    if (!fechaSeleccionada || isNaN(diasHabil) || diasHabil <= 0) {
        document.getElementById('resultado').textContent = 'Por favor, ingresa una fecha válida y una cantidad de días hábiles mayor a 0.';
        return;
    }

    let fecha = new Date(fechaSeleccionada);
    let contador = 0;

    // Si la fecha inicial es un feriado o fin de semana, saltar al primer día hábil
    while (esFeriadoOFinDeSemana(fecha)) {
        fecha = obtenerSiguienteDiaHabil(fecha);
    }

    // Contar los días hábiles
    while (contador < diasHabil) {
        if (!esFeriadoOFinDeSemana(fecha)) {
            contador++;
        }
        fecha = obtenerSiguienteDiaHabil(fecha);
    }

    document.getElementById('resultado').textContent = `El día hábil número ${diasHabil} es: ${fecha.toISOString().split('T')[0]}`;
}
