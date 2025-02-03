
const feriados = [
    "2025-01-01", "2025-01-06", "2025-03-01", "2025-03-02", "2025-03-03", "2025-03-04",
    "2025-04-14", "2025-04-15", "2025-04-16", "2025-04-17", "2025-04-18",
    "2025-05-01", "2025-05-18", "2025-06-19", "2025-07-18", "2025-08-25",
    "2025-10-12", "2025-11-02", "2025-12-25"
];

function calcularDiaHabil() {
    const fechaSeleccionada = document.getElementById('fecha').value;
    const diasHabil = parseInt(document.getElementById('dias').value);

    if (!fechaSeleccionada || isNaN(diasHabil) || diasHabil <= 0) {
        document.getElementById('resultado').textContent = 'Por favor, ingresa todos los datos correctamente.';
        return;
    }

    let fecha = new Date(fechaSeleccionada);

    let fechaFormateada = fecha.toISOString().split('T')[0];
 document.getElementById('fecha-inicial').textContent = fechaFormateada;
  
    fecha.setDate(fecha.getDate() + 1); 

    let diasContados = 0;

 
    while (diasContados < diasHabil) {
        
        let fechaEvaluada = new Date(fecha);


        if (esDiaHabil(fechaEvaluada)) {
            diasContados++; 
        }

        if (diasContados < diasHabil) {
            fecha.setDate(fecha.getDate() + 1); 
        }
    }

    document.getElementById('resultado').textContent =
        `${fecha.toISOString().split('T')[0]}`;
}

function esDiaHabil(fecha) {
    // Ajusto la fecha a la zona horaria local antes de evaluar
    let fechaLocal = new Date(fecha.getTime() + fecha.getTimezoneOffset() * 60000);

    const dia = fechaLocal.getDay(); 
    const fechaIso = fechaLocal.toISOString().split('T')[0]; 

    return dia >= 1 && dia <= 5 && !feriados.includes(fechaIso);
}
