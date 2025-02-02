function calcularDiaHabil() {
    let fechaInput = document.getElementById("fecha").value;
    let diasHabil = parseInt(document.getElementById("dias").value);

    // Validar que los días hábiles sean al menos 10
    if (!fechaInput || isNaN(diasHabil) || diasHabil < 10) {
        mostrarResultado("⚠️ Ingresa una cantidad de días hábiles válida (mínimo 10 días).");
        return;
    }

    let fecha = new Date(fechaInput);
    let añoActual = fecha.getFullYear();
    let feriados = obtenerFeriados(añoActual);
    let diasContados = 0;
    let fechaHabil = new Date(fecha);

    // Comenzar a contar a partir del siguiente día
    fechaHabil.setDate(fechaHabil.getDate() + 1);  // Avanzamos al siguiente día

    while (diasContados < diasHabil) {
        // Si cambia de año, recalcular los feriados
        if (fechaHabil.getFullYear() !== añoActual) {
            añoActual = fechaHabil.getFullYear();
            feriados = obtenerFeriados(añoActual);
        }

        // Si el día no es fin de semana ni feriado, contar
        if (!esFeriadoOFinDeSemana(fechaHabil, feriados)) {
            diasContados++;
        }

        // Solo avanzar al siguiente día si no hemos contado el número de días hábiles deseados
        if (diasContados < diasHabil) {
            fechaHabil.setDate(fechaHabil.getDate() + 1);
        }

        // Verificar si hemos pasado al siguiente mes o año
        if (fechaHabil.getDate() === 1) {
            let mesAnterior = fechaHabil.getMonth();
            fechaHabil.setMonth(mesAnterior + 1);
            if (fechaHabil.getMonth() === 0) {
                fechaHabil.setFullYear(fechaHabil.getFullYear() + 1);
            }
        }
    }

    mostrarResultado(`✅️ Día hábil: ${fechaHabil.toLocaleDateString("es-UY")}`);
}
