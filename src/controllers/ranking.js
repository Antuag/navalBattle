document.addEventListener("DOMContentLoaded", function () {
  let btnCargar = document.getElementById("cargarRanking");
  let tablaRanking = document.getElementById("tablaRanking");

  // Función para obtener y mostrar usuarios
  function cargarPuntajes() {
    fetch("http://127.0.0.1:5000/ranking")
      .then((response) => response.json())
      .then((data) => {
        tablaRanking.innerHTML = ""; // Limpiar contenido previo
        data.forEach((usuario) => {
          let fila = document.createElement("tr");

          let columnaPais = document.createElement("td");
          columnaPais.textContent = usuario.country_code;

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
      .catch((error) => console.error("Error al obtener los puntajes:", error));
  }

  // Evento para cargar usuarios al hacer clic en el botón
  btnCargar.addEventListener("click", cargarPuntajes);
});
