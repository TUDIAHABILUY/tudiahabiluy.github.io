function calcularDiaHabil() {
    // ... (resto del código sin cambios)

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

        // Avanzar al siguiente día (solo una vez por iteración)
        fechaHabil.setDate(fechaHabil.getDate() + 1);
    }

    mostrarResultado(`✅️ Día hábil: ${fechaHabil.toLocaleDateString("es-UY")}`);
}

// ... (resto del código sin cambios)

// Función para verificar si un día es feriado o fin de semana
function esFeriadoOFinDeSemana(fecha, feriados) {
    let fechaString = fecha.getFullYear() + '-' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '-' + fecha.getDate().toString().padStart(2, '0');
    return feriados.includes(fechaString) || fecha.getDay() === 0 || fecha.getDay() === 6;
}

// Función para obtener los feriados de Uruguay
function obtenerFeriados(year) {
    return [
        `${year}-01-01`, // Año Nuevo
        `${year}-05-01`, // Día de los Trabajadores
        `${year}-07-18`, // Jura de la Constitución
        `${year}-08-25`, // Declaratoria de la Independencia
        `${year}-12-25`, // Navidad
        obtenerCarnavalLunes(year), // Lunes de Carnaval
        obtenerCarnavalMartes(year), // Martes de Carnaval
        obtenerSemanaSanta(year, -3), // Jueves Santo
        obtenerSemanaSanta(year, -2)  // Viernes Santo
    ];
}

// Función para obtener el lunes de Carnaval
function obtenerCarnavalLunes(year) {
    return calcularFechaRelativaPascua(year, -48); // 48 días antes de Pascua
}

// Función para obtener el martes de Carnaval
function obtenerCarnavalMartes(year) {
    return calcularFechaRelativaPascua(year, -47); // 47 días antes de Pascua
}

// Función para obtener Jueves y Viernes Santo
function obtenerSemanaSanta(year, diasAntes) {
    return calcularFechaRelativaPascua(year, diasAntes);
}

// Función auxiliar para calcular fechas relativas a Pascua
function calcularFechaRelativaPascua(year, diasAntes) {
    let pascua = obtenerPascua(year);
    let fechaRelativa = new Date(pascua);
    fechaRelativa.setDate(fechaRelativa.getDate() + diasAntes);
    return fechaRelativa.getFullYear() + '-' + (fechaRelativa.getMonth() + 1).toString().padStart(2, '0') + '-' + fechaRelativa.getDate().toString().padStart(2, '0');
}

// Algoritmo para calcular la fecha de Pascua
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
