export async function cargarClima() {
    const API_KEY = "60c90e172eb6b3e0c4ea4d2956b0189b";
    const tablero = JSON.parse(localStorage.getItem("tablero"));
    const ciudad = tablero["geoPosicion"];
  
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const nombreCiudad = data.name;
        const temperatura = data.main.temp;
        const clima = data.weather[0].description;
        const viento = data.wind.speed;
        const humedad = data.main.humidity;
  
        document.getElementById("city").innerText = nombreCiudad;
        document.getElementById("temperature").innerText = temperatura;
        document.getElementById("weather").innerText = clima;
        document.getElementById("wind").innerText = viento;
        document.getElementById("humidity").innerText = humedad;
      });
  }
  