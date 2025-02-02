/* Resetear márgenes y bordes predeterminados */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 30px;
}

h1 {
    font-size: 2rem;
    color: #004d40;
    margin-bottom: 10px;
}

h2 {
    font-size: 1.5rem;
    color: #00796b;
    margin-bottom: 20px;
    text-align: center;
}

.container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
}

fieldset {
    border: 1px solid #00796b;
    padding: 15px;
    border-radius: 8px;
    background-color: #e0f2f1;
}

legend {
    font-weight: bold;
    color: #004d40;
}

label {
    font-size: 1rem;
    display: block;
    margin-bottom: 10px;
    color: #004d40;
}

input[type="date"],
input[type="number"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #00796b;
    border-radius: 5px;
    font-size: 1rem;
}

button {
    background-color: #00796b;
    color: white;
    font-size: 1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
}

#resultado {
    margin-top: 20px;
    font-size: 1rem;
    font-weight: bold;
    color: #004d40;
    text-align: center;
}
