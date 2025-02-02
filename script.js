// Lista de feriados en Uruguay
const feriados = [
    '2025-01-01', '2025-01-06', '2025-03-01', '2025-03-02', '2025-03-03', '2025-03-04', 
    '2025-04-14', '2025-04-20', '2025-05-01', '2025-05-18', '2025-06-19', '2025-07-18', 
    '2025-08-25', '2025-10-12', '2025-11-02', '2025-12-25'
];

// Función para verificar si una fecha es feriado o fin de semana
function esFeriadoOFinDeSemana(fecha) {
    const dia = fecha.getDay(); // 0 = domingo, 6 = sábado
    const fechaStr = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    return dia === 0 || dia === 6 || feriados.includes(fechaStr);
}

// Función para obtener el siguiente día hábil
function obtenerSiguienteDiaHabil(fecha) {
    do {
        fecha.setDate(fecha.getDate() + 1); // Avanza al siguiente día
    } while (esFeriadoOFinDeSemana(fecha)); // Si es feriado o fin de semana, sigue avanzando
    return fecha;
}

// Función principal para calcular el día hábil solicitado
function calcularDiaHabil() {
    const fechaSeleccionada = document.getElementById('fecha').value;
    const diasHabil = parseInt(document.getElementById('dias').value);

    if (!fechaSeleccionada || isNaN(diasHabil)) {
        document.getElementById('resultado').textContent = 'Por favor, ingresa todos los datos correctamente.';
        return;
    }

    let fecha = new Date(fechaSeleccionada);

    // Si la fecha seleccionada es viernes, sábado o domingo, el primer día hábil será el lunes siguiente
    if (fecha.getDay() === 5 || fecha.getDay() === 6 || fecha.getDay() === 0) {
        fecha = obtenerSiguienteDiaHabil(new Date(fecha.setDate(fecha.getDate() + (8 - fecha.getDay()) % 7)));
    } else {
        // Si es un día hábil normal (lunes a jueves), avanzamos directamente al siguiente día hábil
        fecha = obtenerSiguienteDiaHabil(new Date(fecha.setDate(fecha.getDate() + 1)));
    }

    // Contamos los días hábiles hasta llegar al número deseado
    for (let i = 1; i < diasHabil; i++) {
        fecha = obtenerSiguienteDiaHabil(fecha);
    }

    document.getElementById('resultado').textContent = `El día hábil número ${diasHabil} es: ${fecha.toISOString().split('T')[0]}`;
}
