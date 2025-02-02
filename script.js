function calcularDiaHabil() {
    let fechaInput = document.getElementById("fecha").value;
    let diasHabil = parseInt(document.getElementById("dias").value);

    // Validación
    if (!fechaInput || isNaN(diasHabil) || diasHabil < 1) {
        mostrarResultado("Ingresa una fecha y una cantidad de días hábiles válida (mínimo 1 día).");
        return;
    }

    let fecha = new Date(fechaInput);

    // Validación de fecha
    if (isNaN(fecha.getTime())) {
        mostrarResultado("Ingresa una fecha válida.");
        return;
    }

    let anioActual = fecha.getFullYear();
    let feriados = obtenerFeriados(anioActual);
    let diasContados = 0;
    let fechaHabil = new Date(fecha);

    // Comenzamos a contar desde el siguiente día (incrementando 1 día)
    fechaHabil.setDate(fechaHabil.getDate() + 1);

    while (diasContados < diasHabil) {
        if (fechaHabil.getFullYear() !== anioActual) {
            anioActual = fechaHabil.getFullYear();
            feriados = obtenerFeriados(anioActual);
        }

        // Si el día no es ni fin de semana ni feriado, contamos el día
        if (!esFeriadoOFinDeSemana(fechaHabil, feriados)) {
            diasContados++;
        }

        // Si no hemos contado suficientes días, seguimos avanzando
        if (diasContados < diasHabil) {
            fechaHabil.setDate(fechaHabil.getDate() + 1);
        }
    }

    mostrarResultado("Día hábil: " + fechaHabil.toLocaleDateString("es-UY"));
}


function esFeriadoOFinDeSemana(fecha, feriados) {
    const fechaString = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
    return feriados.some(feriado => {
        const feriadoDate = new Date(feriado);
        return feriadoDate.getFullYear() === fecha.getFullYear() &&
               feriadoDate.getMonth() === fecha.getMonth() &&
               feriadoDate.getDate() === fecha.getDate();
    }) || fecha.getDay() === 0 || fecha.getDay() === 6;
}

function obtenerFeriados(year) {
    const feriados = [
        `${year}-01-01`, // Año Nuevo
        `${year}-05-01`, // Día de los Trabajadores
        `${year}-07-18`, // Jura de la Constitución
        `${year}-08-25`, // Declaratoria de la Independencia
        `${year}-12-25`  // Navidad
    ];

    // Feriados moviles (Carnaval y Semana Santa)
    feriados.push(obtenerCarnaval(year));
    const semanaSanta = obtenerSemanaSanta(year);
    feriados.push(semanaSanta[0]); //Jueves Santo
    feriados.push(semanaSanta[1]); //Viernes Santo

    return feriados;
}

function obtenerCarnaval(year) {
    const fechaPascua = calcularFechaPascua(year);
    const fechaCarnaval = new Date(fechaPascua);
    fechaCarnaval.setDate(fechaCarnaval.getDate() - 48); // 48 días antes del domingo de pascua
    return formatDate(fechaCarnaval);
}

function obtenerSemanaSanta(year) {
    const fechaPascua = calcularFechaPascua(year);
    const juevesSanto = new Date(fechaPascua);
    juevesSanto.setDate(juevesSanto.getDate() - 3);
    const viernesSanto = new Date(fechaPascua);
    viernesSanto.setDate(viernesSanto.getDate() - 2);
    return [formatDate(juevesSanto), formatDate(viernesSanto)];
}

function calcularFechaPascua(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const j = c % 4;
    const k = (32 + 2 * e + 2 * i - h - j) % 7;
    const l = Math.floor((a + 11 * h + 22 * k) / 451);
    const m = (h + k - 7 * l + 114) % 31;
    const mes = Math.floor((h + k - 7 * l + 114) / 31);
    const dia = m + 1;

    return new Date(year, mes - 1, dia); // Meses en JavaScript empiezan desde 0
}

function formatDate(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
}

function mostrarResultado(mensaje) {
    document.getElementById("resultado").textContent = mensaje;
}
