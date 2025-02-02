function calcularDiaHabil() {
    let fechaInput = document.getElementById("fecha").value;
    let diasInput = parseInt(document.getElementById("dias").value);
    let resultado = document.getElementById("resultado");

    if (!fechaInput || isNaN(diasInput) || diasInput <= 0) {
        resultado.textContent = "Por favor ingresa una fecha y un número válido de días.";
        return;
    }

    let fecha = new Date(fechaInput);
    let diasAgregados = 0;

    const feriadosUruguay = [
        "01-01", // Año Nuevo
        "06-01", // Día de Reyes
        "19-04", // Desembarco de los 33 Orientales
        "01-05", // Día del Trabajador
        "18-07", // Jura de la Constitución
        "25-08", // Declaratoria de la Independencia
        "02-11", // Día de los Difuntos
        "25-12"  // Navidad
    ];

    while (diasAgregados < diasInput) {
        fecha.setDate(fecha.getDate() + 1);
        let diaSemana = fecha.getDay();
        let fechaFormato = ("0" + fecha.getDate()).slice(-2) + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2);

        if (diaSemana !== 0 && diaSemana !== 6 && !feriadosUruguay.includes(fechaFormato)) {
            diasAgregados++;
        }
    }

    resultado.textContent = `El día hábil será: ${fecha.toLocaleDateString("es-ES")}`;
}

