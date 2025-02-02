function calcularDiaHabil() {
    let fechaInput = document.getElementById("fecha").value;
    let diasHabil = parseInt(document.getElementById("dias").value);

    if (!fechaInput || isNaN(diasHabil) || diasHabil <= 0) {
        mostrarResultado("⚠️ Ingresa una fecha y cantidad de días válidos.", "");
        return;
    }

    let fecha = new Date(fechaInput);
    let fechaCorrido = new Date(fecha);
    fechaCorrido.setDate(fechaCorrido.getDate() + diasHabil);

    let feriados = obtenerFeriados(fecha.getFullYear());
    let diasContados = 0;

    while (diasContados < diasHabil) {
        fecha.setDate(fecha.getDate() + 1);
        if (!esFeriadoOFinDeSemana(fecha, feriados)) {
            diasContados++;
        }
    }

    mostrarResultado(
        `✅️ Día hábil: ${fecha.toLocaleDateString("es-UY")}`,
        `☑️ Día corrido: ${fechaCorrido.toLocaleDateString("es-UY")}`
    );
}

// Función para verificar si un día es feriado o fin de semana
function esFeriadoOFinDeSemana(fecha, feriados) {
    return feriados.includes(fecha.toISOString().split('T')[0]) || fecha.getDay() === 0 || fecha.getDay() === 6;
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
    let pascua = obtenerPascua(year);
    pascua.setDate(pascua.getDate() - 48);
    return pascua.toISOString().split('T')[0];
}

function obtenerCarnavalMartes(year) {
    let pascua = obtenerPascua(year);
    pascua.setDate(pascua.getDate() - 47);
    return pascua.toISOString().split('T')[0];
}

// Función para obtener Jueves y Viernes Santo (días antes de Pascua)
function obtenerSemanaSanta(year, diasAntes) {
    let pascua = obtenerPascua(year);
    pascua.setDate(pascua.getDate() + diasAntes);
    return pascua.toISOString().split('T')[0];
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

// Función para mostrar los resultados en la página
function mostrarResultado(mensajeHabil, mensajeCorrido) {
    document.getElementById("resultado").innerText = mensajeHabil;
    document.getElementById("resultado_corrido").innerText = mensajeCorrido;
}
