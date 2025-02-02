function calcularDiaHabil() {
  // ... (código de validación de entrada sin cambios)

  let fecha = new Date(fechaInput);

  // ... (código de inicialización de variables sin cambios)

  while (diasContados < diasHabil) {
    // ... (código para recalcular feriados si cambia el año sin cambios)

    // Si el día no es fin de semana ni feriado, contar
    if (!esFeriadoOFinDeSemana(fechaHabil, feriados)) {
      diasContados++;
      console.log("Contando día: " + fechaHabil.toLocaleDateString("es-UY"));
    }

    // Avanzar al siguiente día *solo si no se ha alcanzado el número de días hábiles*
    if (diasContados < diasHabil) {  // <-- Esta es la corrección
      fechaHabil.setDate(fechaHabil.getDate() + 1);
    }
  }

  mostrarResultado("Día hábil: " + fechaHabil.toLocaleDateString("es-UY"));
}


function esFeriadoOFinDeSemana(fecha, feriados) {
  let fechaString = fecha.getFullYear() + '-' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '-' + fecha.getDate().toString().padStart(2, '0');
  return feriados.includes(fechaString) || fecha.getDay() === 0 || fecha.getDay() === 6;
}

function obtenerFeriados(year) {
  // Feriados fijos
  let feriados = [
    `${year}-01-01`, // Año Nuevo
    `${year}-05-01`, // Día de los Trabajadores
    `${year}-07-18`, // Jura de la Constitución
    `${year}-08-25`, // Declaratoria de la Independencia
    `${year}-12-25`  // Navidad
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
