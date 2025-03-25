// Función para obtener y mostrar puntajes
export function cargarPuntajes() {
  fetch("http://127.0.0.1:5000/ranking")
    .then((response) => response.json())
    .then((data) => {
      let tablaRanking = document.getElementById("tablaRanking");
      data.forEach((usuario) => {
        let fila = document.createElement("tr");
        let pais = usuario.country_code.toUpperCase()
        

        let columnaPais = document.createElement("td");
        let imgBandera = document.createElement("img");
        imgBandera.src = `https://flagsapi.com/${pais}/flat/32.png`;
        columnaPais.appendChild(imgBandera);
        

        let columnaNombre = document.createElement("td");
        columnaNombre.textContent = usuario.nick_name;

        let columnaPuntaje = document.createElement("td");
        columnaPuntaje.textContent = usuario.score;

        fila.appendChild(columnaPais);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaPuntaje);
        tablaRanking.appendChild(fila);
      });
    })
    .catch((error) =>
      console.error("Error al obtener los datos del jugador", error)
    );
}

// Evento para cargar usuarios al hacer clic en el botón
