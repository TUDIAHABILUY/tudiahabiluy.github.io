// Lista de feriados en Uruguay (como fechas en formato ISO)
const feriados = [
    "2025-01-01", // Año Nuevo
    "2025-01-06", // Día de Reyes
    "2025-03-01", // Transmisión de mando
    "2025-03-02", // Carnaval
    "2025-03-03", // Carnaval
    "2025-03-04", // Carnaval
    "2025-04-14", // Semana de Turismo (lunes)
    "2025-04-15", // Semana de Turismo (martes)
    "2025-04-16", // Semana de Turismo (miércoles)
    "2025-04-17", // Semana de Turismo (jueves)
    "2025-04-18", // Semana de Turismo (viernes)
    "2025-05-01", // Día de los Trabajadores
    "2025-05-18", // Batalla de las Piedras
    "2025-06-19", // Natalicio de Artigas
    "2025-07-18", // Jura de la Constitución
    "2025-08-25", // Declaratoria de la Independencia
    "2025-10-12", // Día de la Raza
    "2025-11-02", // Día de los Difuntos
    "2025-12-25"  // Navidad
];

// Función para verificar si una fecha es feriado o fin de semana
function esFeriadoOFinDeSemana(fecha) {
    const dia = fecha.getDay();
    const fechaIso = fecha.toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
    
    // Si es sábado (6) o domingo (0) o es un feriado
    return dia === 0 || dia === 6 || feriados.includes(fechaIso);
}

// Función para calcular los días hábiles
function calcularDiaHabil() {
    const fechaSeleccionada = document.getElementById('fecha').value;
    const diasHabil = parseInt(document.getElementById('dias').value);

    if (!fechaSeleccionada || isNaN(diasHabil)) {
        document.getElementById('resultado').textContent = 'Por favor, ingresa todos los datos correctamente.';
        return;
    }

    let fecha = new Date(fechaSeleccionada); // Convertimos la fecha seleccionada a objeto Date
    let diasContados = 0;

    while (diasContados < diasHabil) {
        fecha.setDate(fecha.getDate() + 1); // Aumentamos un día
        if (!esFeriadoOFinDeSemana(fecha)) {
            diasContados++;
        }
    }

    const fechaResultado = fecha.toISOString().split('T')[0]; // Obtenemos la fecha en formato YYYY-MM-DD
    document.getElementById('resultado').textContent = `El día hábil número ${diasHabil} es: ${fechaResultado}`;
}
