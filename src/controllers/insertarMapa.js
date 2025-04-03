//Con esta funcion insertamos el mapa en la creacion de los barcos, con el fin de acomodarlos en sus lugares

export function insertarMapa() {
  const tablero = JSON.parse(localStorage.getItem("tablero"));
  const tamaño = tablero["tamañoTablero"];
  let contenedor = document.getElementById("tableroGuerra3");

  contenedor.style.gridTemplateColumns = `repeat(${tamaño}, 1fr)`;
  contenedor.style.gridTemplateRows = `repeat(${tamaño}, 1fr)`;

  for (let i = 0; i < tamaño; i++) {
    for (let j = 0; j < tamaño; j++) {
      let casilla = document.createElement("button");
      casilla.classList.add("buttonGuerra");
      casilla.id = `t3-${i}-${j}`;
      contenedor.appendChild(casilla);
      casilla.addEventListener("click", () => {
        console.log(casilla.id);
      });
    }
  }
}

export function seleccionBarcos() {
  const selectBarco = document.getElementById("selectBarco");
  const imgBarco = document.getElementById("imgBarco");

  selectBarco.addEventListener("change", function () {
    let barcoSeleccionado = this.value;
    let tamañoBarco =
      this.options[this.selectedIndex].getAttribute("data-size");

    // Cambiar la imagen de vista previa
    imgBarco.src = `src/styles/img/${barcoSeleccionado}.jpeg`;

    // Guardar el tamaño del barco 
    localStorage.setItem("tamañoBarco", tamañoBarco);
  });
}
