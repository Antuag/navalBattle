// Función para crear un mapa (tablero visual) en el contenedor indicado
export function crearMapa(contenedor, id, evento) {
  const tablero = JSON.parse(localStorage.getItem("tablero")); // Obtiene los datos del tablero almacenado en localStorage
  const tamaño = tablero["tamañoTablero"]; // Obtiene el tamaño del tablero

  // Define las columnas y filas del grid CSS en el contenedor, según el tamaño del tablero
  contenedor.style.gridTemplateColumns = `repeat(${tamaño}, 1fr)`;
  contenedor.style.gridTemplateRows = `repeat(${tamaño}, 1fr)`;

  // Doble bucle para recorrer todas las posiciones del tablero
  for (let i = 0; i < tamaño; i++) {
    for (let j = 0; j < tamaño; j++) {
      let casilla1 = document.createElement("button"); // Crea un botón por cada celda
      casilla1.classList.add("buttonGuerra"); // Le agrega la clase "buttonGuerra" para estilos
      casilla1.id = `${id}${i}-${j}`; // Le asigna un ID con el prefijo recibido, más coordenadas i-j

      // Si se define una función de evento, la asigna al evento de clic del botón
      casilla1.onclick = () => {
        if (evento) {
          evento(casilla1.id); // Llama a la función pasando el ID de la casilla
        }
      };

      // Agrega el botón al contenedor (el tablero visual)
      contenedor.appendChild(casilla1);
    }
  }
}

// Función que genera una matriz vacía para representar el tablero lógicamente
export function matrizTablero() {
  let matriz = []; // Se declara la matriz vacía
  const tablero = JSON.parse(localStorage.getItem("tablero")); // Obtiene el tablero desde localStorage

  // Doble bucle para llenar la matriz con valores "a" (que indica espacio libre o agua)
  for (let i = 0; i < tablero["tamañoTablero"]; i++) {
    matriz.push([]); // Agrega una nueva fila vacía
    for (let j = 0; j < tablero["tamañoTablero"]; j++) {
      matriz[i].push("a"); // Agrega una celda con valor "a" en esa posición
    }
  }

  return matriz; // Devuelve la matriz generada
}
