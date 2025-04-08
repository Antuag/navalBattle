export function cargarPuntajes() {
  fetch("http://127.0.0.1:5000/ranking")
    .then((response) => response.json())
    .then((data) => {
      const tablaRanking = document.getElementById("tablaRanking");
      tablaRanking.innerHTML = ""; // Limpia tabla anterior por si acaso

      // Ordenar de mayor a menor puntaje
      data.sort((a, b) => b.score - a.score);

      const medallas = ["🥇", "🥈", "🥉"];

      data.forEach((usuario, index) => {
        const fila = document.createElement("tr");

        // Columna de posición con medalla si está en top 3
        const columnaPosicion = document.createElement("td");
        columnaPosicion.textContent = medallas[index] || index + 1;

        // Columna de bandera
        const pais = usuario.country_code.toUpperCase();
        const columnaPais = document.createElement("td");
        const imgBandera = document.createElement("img");
        imgBandera.src = `https://flagsapi.com/${pais}/flat/32.png`;
        imgBandera.alt = pais;
        imgBandera.classList.add("img-fluid", "rounded");
        columnaPais.appendChild(imgBandera);

        // Columna de nombre
        const columnaNombre = document.createElement("td");
        columnaNombre.textContent = usuario.nick_name;

        // Columna de puntaje
        const columnaPuntaje = document.createElement("td");
        columnaPuntaje.textContent = usuario.score;

        // Agrega columnas a la fila
        fila.appendChild(columnaPosicion);
        fila.appendChild(columnaPais);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaPuntaje);

        // Agrega fila a la tabla
        tablaRanking.appendChild(fila);
      });
    })
    .catch((error) =>
      console.error("Error al obtener los datos del jugador", error)
    );
}

