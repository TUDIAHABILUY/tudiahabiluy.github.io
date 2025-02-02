function calcularDiaHabil() {

let fechaInput document.getElementById("fecha").value;

let diasHabil parseInt(document.getElementById("dias").value);

// Validar que los dias hábiles sean al menos 10

if (IfechaInput || isNaN(diasHabil ) || diasHabil < 10) {

mostrarResultado("A Ingresa una cantidad de días hábiles válida (minimo

10 días).");

return;

}

let fecha new Date(fecha Input);

let añoActual fecha.getFullYear();

let feriados obtener Feriados (añoActual);

0: let diasContados

let fechaHabil new Date(fecha);

// Comenzar a contar a partir del siguiente dia

fechaHabil.setDate(fechaHabil.getDate()+ 1); // Avanzamos al siguiente dia

while (diasContados diasHabil) {

// Si cambia de año, recalcular los feriados

if (fechaHabil.getFullYear() != añoActual) {

añoActual fechaHabil.getFullYear();

feriados obtener Feriados (añoActual);

}

// Mostrar la fecha para depuración

console.log(Evaluando: ${fechaHabil.toLocaleDateString("es-UY")}');

// Si el día no es fin de semana ni feriado, contar

if (lesFeriadoOFinDeSemana (fechaHabil, feriados)) {

diasContados++;

console.log("Contando dia: ${fechaHabil.toLocaleDateString("es-

UY")});

// Mostrar dia contado

}

// Solo avanzar al siguiente día si no hemos contado el número de dias

hábiles deseados

if (diasContados diasHabil) {

}

}

}

fechaHabil.setDate(fechaHabil.getDate()+ 1);

mostrarResultado Día hábil: ${fechaHabil.toLocaleDateString("es-UY")));

// Función para verificar si un día es feriado o fin de semana

function esFeriadoOFinDeSemana (fecha, feriados) {

let fechaString fecha.getFullYear()+'' (fecha.getMonth()

'0'); 1).toString().padStart(2, '0') fecha.getDate().toString().padStart(2,

return feriados.includes (fechaString) || fecha.getDay()011 fecha.getDay() === 6;

}

// Función para obtener feriados de Uruguay

function obtener Feriados(year) {

return [

'$(year)-01-01, // Año Nuevo

$(year)-05-01, // Dia de los Trabajadores

"$(year)-07-18, // Jura de la Constitución

$(year)-08-25, // Declaratoria de la Independencia

$(year)-12-25 // Navidad

obtener Carnavallunes(year),

obtener CarnavalMartes (year),

obtener SemanaSanta(year, -3), // Jueves Santo

obtener Semana Santa(year, -2) // Viernes Santo

1:

// Función para obtener Carnaval (lunes y martes 48 y 47 días antes de Pascua)

function obtener CarnavalLunes (year) {

}

return calcular FechaRelativaPascua(year, -48);
