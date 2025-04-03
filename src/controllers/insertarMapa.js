import { cargarClima, tamañoTablero } from "./opcionesJuego.js";
import { cargarUsuario } from "./login.js";
import Utils from "./Utils.js";

export function insertarMapa() {
  const tablero = JSON.parse(localStorage.getItem("tablero"));
  const tamaño = tablero["tamañoTablero"];
  let contenedor = document.getElementById("tableroGuerra3");
  const btnContinuar = document.getElementById("btnContinuar");

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

  btnContinuar.addEventListener("click", async function () {
    console.log("Continuar presionado");
    await Utils.loadPage("src/views/estiloTablero.html", container, true);
    await Utils.loadPage("src/views/climaUsuario.html", container, false);
    tamañoTablero();
    cargarClima();
    cargarUsuario();
  });
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
