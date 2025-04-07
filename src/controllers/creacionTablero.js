export function crearMapa(contenedor, id, evento) {
    const tablero = JSON.parse(localStorage.getItem("tablero"));
    const tamaño = tablero["tamañoTablero"];
  
    contenedor.style.gridTemplateColumns = `repeat(${tamaño}, 1fr)`;
    contenedor.style.gridTemplateRows = `repeat(${tamaño}, 1fr)`;
  
    for (let i = 0; i < tamaño; i++) {
      for (let j = 0; j < tamaño; j++) {
        let casilla1 = document.createElement("button");
        casilla1.classList.add("buttonGuerra");
        casilla1.id = `${id}${i}-${j}`;
        casilla1.onclick = () => {
          if (evento) {
            evento(casilla1.id);
          }
        };
        contenedor.appendChild(casilla1);
      }
    }
  }
  export function matrizTablero() {
    let matriz = [];
    const tablero = JSON.parse(localStorage.getItem("tablero"));
    for (let i = 0; i < tablero["tamañoTablero"]; i++) {
      matriz.push([]);
      for (let j = 0; j < tablero["tamañoTablero"]; j++) {
        matriz[i].push("a");
      }
    }
    return matriz;
  }
  