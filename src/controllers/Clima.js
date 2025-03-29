// 🔥 Usa tu clave real aquí
const API_KEY = '60c90e172eb6b3e0c4ea4d2956b0189b';
const ciudad = 'sevilla';

async function obtenerClima() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${API_KEY}`;
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);

        const datos = await respuesta.json();

        // Extraer datos importantes
        const nombreCiudad = datos.name;
        const temperatura = datos.main.temp;
        const clima = datos.weather[0].description;
        const viento = datos.wind.speed;

        // Mostrar en pantalla
        document.getElementById('city').innerText = nombreCiudad;
        document.getElementById('temperature').innerText = temperatura;
        document.getElementById('weather').innerText = clima;
        document.getElementById('wind').innerText = viento;

        console.log('Datos actualizados:', datos);
    } catch (error) {
        console.error('Error al obtener el clima:', error);
    }
}

// Llamado inicial y actualización cada 10 segundos
obtenerClima();
