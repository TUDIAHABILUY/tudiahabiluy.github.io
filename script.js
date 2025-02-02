function calcularDiaHabil() {
    let fechaInput = document.getElementById("fecha").value;
    let diasHabil = parseInt(document.getElementById("dias").value);

    // Validación (sin la restricción de la fecha actual ni la validación de fecha)
    if (!fechaInput || isNaN(diasHabil) || diasHabil < 1) {
        mostrarResultado("Ingresa una fecha y una cantidad de días hábiles válida (mínimo 1 día).");
        return;
    }

    let fecha = new Date(fechaInput);
    let anioActual = fecha.getFullYear();
    let feriados = obtenerFeriados(anioActual);
    let diasContados = 0;
    let fechaHabil = new Date(fecha);

    // Comenzar a contar desde el *siguiente* día
    fechaHabil.setDate(fechaHabil.getDate() + 1);

    while (diasContados < diasHabil) {
        if (fechaHabil.getFullYear() !== anioActual) {
            anioActual = fechaHabil.getFullYear();
            feriados = obtenerFeriados(anioActual);
        }

        if (!esFeriadoOFinDeSemana(fechaHabil, feriados)) {
            diasContados++;
            console.log("Contando día: " + fechaHabil.toLocaleDateString("es-UY"));
        }

        if (diasContados < diasHabil) {
            fechaHabil.setDate(fechaHabil.getDate() + 1);
        }

        console.log("diasContados: " + diasContados);
        console.log("fechaHabil: " + fechaHabil.toLocaleDateString("es-UY"));
    }

    mostrarResultado("Día hábil: " + fechaHabil.toLocaleDateString("es-UY"));
}

function esFeriadoOFinDeSemana(fecha, feriados) {
    let fechaString = fecha.getFullYear() + '-' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '-' + fecha.getDate().toString().padStart(2, '0');
    let esFeriado = feriados.some(feriado => {
        let feriadoDate = new Date(feriado);
        return feriadoDate.getFullYear() === fecha.getFullYear() &&
               feriadoDate.getMonth() === fecha.getMonth() &&
               feriadoDate.getDate() === fecha.getDate();
    });
    return esFeriado || fecha.getDay() === 0 || fecha.getDay() === 6;
}

function obtenerFeriados(year) {
  // Feriados fijos
  let feriados = [
    ${year}-01-01, // Año Nuevo
    ${year}-05-01, // Día de los Trabajadores
    ${year}-07-18, // Jura de la Constitución
    ${year}-08-25, // Declaratoria de la Independencia
    ${year}-12-25  // Navidad
  ];

  // Feriados moviles (Carnaval y Semana Santa)
    feriados.push(obtenerCarnaval(year));
    let semanaSanta = obtenerSemanaSanta(year);
    feriados.push(semanaSanta[0]); //Jueves Santo
    feriados.push(semanaSanta[1]); //Viernes Santo

  return feriados;
}

function obtenerCarnaval(year) {
    let fechaPascua = calcularFechaPascua(year);
    let fechaCarnaval = new Date(fechaPascua);
    fechaCarnaval.setDate(fechaCarnaval.getDate() - 48); // 48 días antes del domingo de pascua
    return formatDate(fechaCarnaval);
}

function obtenerSemanaSanta(year) {
    let fechaPascua = calcularFechaPascua(year);
    let juevesSanto = new Date(fechaPascua);
    juevesSanto.setDate(juevesSanto.getDate() - 3);
    let viernesSanto = new Date(fechaPascua);
    viernesSanto.setDate(viernesSanto.getDate() - 2);
    return [formatDate(juevesSanto), formatDate(viernesSanto)];
}

// Función para calcular la fecha de Pascua (Algoritmo de Meeus/Jones/Butcher)
function calcularFechaPascua(year) {
    let a = year % 19;
    let b = Math.floor(year / 100);
    let c = year % 100;
    let d = Math.floor(b / 4);
    let e = b % 4;
    let f = Math.floor((b + 8) / 25);
    let g = Math.floor((b - f + 1) / 3);
    let h = (19 * a + b - d - g + 15) % 30;
    let i = Math.floor(c / 4);
    let j = c % 4;
    let k = (32 + 2 * e + 2 * i - h - j) % 7;
    let l = Math.floor((a + 11 * h + 22 * k) / 451);
    let m = (h + k - 7 * l + 114) % 31;
    let mes = Math.floor((h + k - 7 * l + 114) / 31);
    let dia = m + 1;

    return new Date(year, mes - 1, dia); // Meses en JavaScript empiezan desde 0
}

function formatDate(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
}


function mostrarResultado(mensaje) {
  document.getElementById("resultado").textContent = mensaje;
}
