function calcularDiaHabil() {
    let fechaInput = document.getElementById("fecha").value;
    let diasHabil = parseInt(document.getElementById("dias").value);

    if (!fechaInput || isNaN(diasHabil) || diasHabil <= 0) {
        document.getElementById("resultado").innerText = "⚠️ Ingresa una fecha y cantidad de días válidos.";
        return;
    }

    let fecha = new Date(fechaInput);
    let diasContados = 0;

    function calcularFeriados(year) {
        return [
            `${year}-01-01`, // Año Nuevo
            `${year}-05-01`, // Día del Trabajador
            `${year}-07-18`, // Jura de la Constitución
            `${year}-08-25`, // Declaratoria de la Independencia
            `${year}-12-25`, // Navidad
            obtenerCarnaval(year), // Carnaval (variable)
            obtenerSemanaSanta(year) // Turismo (Semana Santa)
        ];
    }

    function obtenerCarnaval(year) {
        let pascua = obtenerPascua(year);
        let carnaval = new Date(pascua);
        carnaval.setDate(pascua.getDate() - 48); // Lunes de Carnaval
        return carnaval.toISOString().split('T')[0];
    }

    function obtenerSemanaSanta(year) {
        let pascua = obtenerPascua(year);
        let juevesTurismo = new Date(pascua);
        juevesTurismo.setDate(pascua.getDate() - 3); // Jueves Santo
        return juevesTurismo.toISOString().split('T')[0];
    }

    function obtenerPascua(year) {
        let a = year % 19;
        let b = Math.floor(year / 100);
        let c = year % 100;
        let d = Math.floor(b / 4);
        let e = b % 4;
        let f = Math.floor((b + 8) / 25);
        let g = Math.floor((b - f + 1) / 3);
        let h = (19 * a + b - d - g + 15) % 30;
        let i = Math.floor(c / 4);
        let k = c % 4;
        let l = (32 + 2 * e + 2 * i - h - k) % 7;
        let m = Math.floor((a + 11 * h + 22 * l) / 451);
        let mes = Math.floor((h + l - 7 * m + 114) / 31);
        let dia = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(year, mes - 1, dia);
    }

    let feriadosUruguay = calcularFeriados(fecha.getFullYear());

    while (diasContados < diasHabil) {
        fecha.setDate(fecha.getDate() + 1);

        let esFeriado = feriadosUruguay.includes(fecha.toISOString().split('T')[0]);
        let esFinDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6;

        if (!esFeriado && !esFinDeSemana) {
            diasContados++;
        }
    }

    let resultadoTexto = `📅 Día hábil: ${fecha.toLocaleDateString("es-UY")}`;
    document.getElementById("resultado").innerText = resultadoTexto;
}
