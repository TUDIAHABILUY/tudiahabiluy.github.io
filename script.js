// Lista de feriados en Uruguay
const feriados = [
    '2025-01-01', '2025-01-06', '2025-03-01', '2025-03-02', '2025-03-03', '2025-03-04', 
    '2025-04-14', '2025-04-20', '2025-05-01', '2025-05-18', '2025-06-19', '2025-07-18', 
    '2025-08-25', '2025-10-12', '2025-11-02', '2025-12-25'
];

// Función para comprobar si es fin de semana o feriado
function esFeriadoOFinDeSemana(fecha) {
    const dia = fecha.getDay(); // 0: domingo, 6: sábado
    const fechaStr = fecha.toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD

    // Verificamos si es sábado, domingo o un feriado
    return dia === 0 || dia === 6 || feriados.includes(fechaStr);
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

    // Si la fecha seleccionada es un fin de semana (sábado o domingo), ajustamos la fecha
    if (fecha.getDay() === 6) { // Sábado
        fecha.setDate(fecha.getDate() + 2); // Avanzamos al lunes
    } else if (fecha.getDay() === 0) { // Domingo
        fecha.setDate(fecha.getDate() + 1); // Avanzamos al lunes
    } else {
        // Si no es fin de semana, el primer día hábil es el día siguiente, siempre que no sea feriado
        fecha.setDate(fecha.getDate() + 1);
    }

    // Ahora verificamos si el lunes es feriado, si es así, avanzamos al siguiente día hábil
    while (esFeriadoOFinDeSemana(fecha)) {
        fecha.setDate(fecha.getDate() + 1); // Avanzamos un día
    }

    // Ahora contamos los días hábiles, excluyendo fines de semana y feriados
    while (diasContados < diasHabil) {
        if (!esFeriadoOFinDeSemana(fecha)) {
            diasContados++;
        }
        if (diasContados < diasHabil) {
            fecha.setDate(fecha.getDate() + 1); // Aumentamos un día
        }
    }

    const fechaResultado = fecha.toISOString().split('T')[0]; // Obtenemos la fecha en formato YYYY-MM-DD
    document.getElementById('resultado').textContent = `El día hábil número ${diasHabil} es: ${fechaResultado}`;
}
