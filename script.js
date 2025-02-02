function calcularDiaHabil() {
    let fechaInput = document.getElementById("fecha").value;
    let diasHabil = parseInt(document.getElementById("dias").value);

    if (!fechaInput || isNaN(diasHabil) || diasHabil <= 0) {
        mostrarResultado("⚠️ Ingresa una fecha y cantidad de días válidos.");
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

        // Ajuste para asegurarse de que al cambiar de mes o año, avance correctamente
        if (fechaHabil.getDate() === 1 && fechaHabil.getMonth() === 0) {
            fechaHabil.setFullYear(fechaHabil.getFullYear() + 1);
        }
    }

    mostrarResultado(`✅️ Día hábil: ${fechaHabil.toLocaleDateString("es-UY")}`);
}

// Función para verificar si un día es feriado o fin de semana
function esFeriadoOFinDeSemana(fecha, feriados) {
    let fechaString = fecha.getFullYear() + '-' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '-' + fecha.getDate().toString().padStart(2, '0');
    return feriados.includes(fechaString) || fecha.getDay() === 0 || fecha.getDay() === 6;
}

// Función para obtener feriados del año
function obtenerFeriados(year) {
    return [
        `${year}-01-01`, // Año Nuevo
        `${year}-05-01`, // Día de los Trabajadores
        `${year}-07-18`, // Jura de la Constitución
        `${year}-08-25`, // Declaratoria de la Independencia
        `${year}-12-25`, // Navidad
        obtenerCarnavalLunes(year), 
        obtenerCarnavalMartes(year),
        obtenerSemanaSanta(year, -3), // Jueves Santo
        obtenerSemanaSanta(year, -2)  // Viernes Santo
    ];
}

// Función para obtener Carnaval (lunes y martes 48 y 47 días antes de Pascua)
function obtenerCarnavalLunes(year) {
    return calcularFechaRelativaPascua(year, -48);
}

function obtenerCarnavalMartes(year) {
    return calcularFechaRelativaPascua(year, -47);
}

// Función para obtener Jueves y Viernes Santo (días antes de Pascua)
function obtenerSemanaSanta(year, diasAntes) {
    return calcularFechaRelativaPascua(year, diasAntes);
}

// Función auxiliar para calcular fechas relativas a Pascua sin modificar el objeto Date original
function calcularFechaRelativaPascua(year, diasAntes) {
    let pascua = obtenerPascua(year);
    let fechaRelativa = new Date(pascua);
    fechaRelativa.setDate(fechaRelativa.getDate() + diasAntes);
    return fechaRelativa.getFullYear() + '-' + (fechaRelativa.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaRelativa.getDate().toString().padStart(2, '0');
}

// Algoritmo de Meeus para calcular la fecha de Pascua
function obtenerPascua(year) {
    let a = year % 19, b = Math.floor(year / 100), c = year % 100;
    let d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    let g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    let i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
    let m = Math.floor((a + 11 * h + 22 * l) / 451);
    let mes = Math.floor((h + l - 7 * m + 114) / 31);
    let dia = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, mes - 1, dia);
}

// Función para mostrar el resultado en la página
function mostrarResultado(mensajeHabil) {
    document.getElementById("resultado").innerText = mensajeHabil;
}
