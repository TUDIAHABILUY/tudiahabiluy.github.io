function calcularDiaHabil() {
    let fechaInput = document.getElementById("fecha").value;
    let diasHabil = parseInt(document.getElementById("dias").value);

    if (!fechaInput || isNaN(diasHabil) || diasHabil <= 0) {
        document.getElementById("resultado").innerText = "⚠️ Ingresa una fecha y cantidad de días válidos.";
        return;
    }

    let fecha = new Date(fechaInput);
    let diasContados = 0;

    const feriadosUruguay = [
        "2025-01-01", "2025-04-17", "2025-05-01", "2025-07-18", "2025-08-25",
        "2025-10-12", "2025-11-02", "2025-12-25"
    ];

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
