// Lista de feriados en Uruguay (como fechas en formato ISO)
const feriados = [
    "2025-01-01", "2025-01-06", "2025-03-01", "2025-03-02", "2025-03-03", "2025-03-04", 
    "2025-04-14", "2025-04-15", "2025-04-16", "2025-04-17", "2025-04-18", "2025-04-19", "2025-04-20", 
    "2025-05-01", "2025-05-18", "2025-06-19", "2025-07-18", "2025-08-25", "2025-10-12", 
    "2025-11-02", "2025-12-25"
];

// Función para verificar si una fecha es feriado o fin de semana
function esFeriadoOFinDeSemana(fecha) {
    const dia = fecha.getDay();
    const fechaIso = fecha.toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
    
    // Si es sábado (6) o domingo (0) o es un feriado
    return dia === 0 || dia === 6 || feriados.includes(fechaIso);
}

// Función para calcular los días hábiles después de sumar días corridos
function calcularDiaHabil() {
    const fechaSeleccionada = document.getElementById('fecha').value;
    const diasCorridos = parseInt(document.getElementById('dias').value, 10); // Convertimos a entero

    // Verificar que los datos sean correctos
    if (!fechaSeleccionada || isNaN(diasCorridos) || diasCorridos <= 0) {
        document.getElementById('resultado').textContent = 'Por favor, ingresa todos los datos correctamente.';
        return;
    }

    let fecha = new Date(fechaSeleccionada); // Convertimos la fecha seleccionada a objeto Date
    let fechaFinal = new Date(fecha); // Copiamos la fecha seleccionada
    let diasContados = 0;

    // Sumamos los días corridos
    fechaFinal.setDate(fecha.getDate() + diasCorridos);

    // Ahora recorremos el rango de fechas entre la fecha seleccionada y la fecha final
    let diasHabil = 0;
    for (let currentDate = new Date(fecha); currentDate <= fechaFinal; currentDate.setDate(currentDate.getDate() + 1)) {
        if (!esFeriadoOFinDeSemana(currentDate)) {
            diasHabil++; // Si no es un feriado o fin de semana, contamos como día hábil
        }
    }

    const fechaResultado = fechaFinal.toISOString().split('T')[0]; // Obtenemos la fecha final en formato YYYY-MM-DD
    document.getElementById('resultado').textContent = `Si sumas ${diasCorridos} días corridos, el día hábil final es: ${fechaResultado}. Total de días hábiles: ${diasHabil}`;
}
