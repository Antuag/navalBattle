// Función asíncrona que se encarga de cargar el clima de una ciudad
export async function cargarClima() {
  // Clave de API para acceder a los datos de OpenWeatherMap
  const API_KEY = "60c90e172eb6b3e0c4ea4d2956b0189b";

  // Se obtiene el objeto "tablero" almacenado en el localStorage y se convierte en objeto JavaScript
  const tablero = JSON.parse(localStorage.getItem("tablero"));

  // Se obtiene el nombre de la ciudad desde el objeto "tablero"
  const ciudad = tablero["geoPosicion"];

  // Se hace una solicitud a la API del clima con la ciudad obtenida, usando sistema métrico y en idioma español
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${API_KEY}`
  )
    // Se convierte la respuesta en formato JSON
    .then((response) => response.json())
    .then((data) => {
      // Se extraen los datos relevantes de la respuesta
      const nombreCiudad = data.name;                  // Nombre de la ciudad
      const temperatura = data.main.temp;              // Temperatura actual
      const clima = data.weather[0].description;       // Descripción del clima (ej. "nubes dispersas")
      const viento = data.wind.speed;                  // Velocidad del viento
      const humedad = data.main.humidity;              // Porcentaje de humedad

      // Se muestran los datos en los elementos HTML correspondientes
      document.getElementById("city").innerText = nombreCiudad;
      document.getElementById("temperature").innerText = temperatura;
      document.getElementById("weather").innerText = clima;
      document.getElementById("wind").innerText = viento;
      document.getElementById("humidity").innerText = humedad;
    });
}
