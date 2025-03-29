import { cargarPuntajes } from "./ranking.js";
import { Tablero } from "../models/Tablero.js";
import Utils from "./Utils.js";

export async function crearTablero() {
  let btnConfirmar = document.getElementById("btnConfirmar");
  if (btnConfirmar) {
    // Validar que el botón exista
    btnConfirmar.addEventListener("click", async () => {
      const tamaño = document.getElementById("inTamaño").value;
      const color = document.getElementById("colorBarcos").value;
      const geoPosicion = document.getElementById("geoPosicion").value;
      const tablero = new Tablero(tamaño, color, geoPosicion);
      localStorage.setItem("tablero", JSON.stringify(tablero));
      console.log(tablero);
      await Utils.loadPage("src/views/ranking.html", container, true);
      cargarPuntajes();
      crearMapa();
    });
  } else {
    console.error("btnConfirmar presenta error");
  }
}

export function crearMapa() {

  const tablero = JSON.parse(localStorage.getItem("tablero"));
  const tamaño = tablero["tamañoTablero"];

  if (tamaño < 10 || tamaño > 20) {
    alert("El tamaño del tablero debe ser mínimo de 10x10 y máximo de 20x20");
    return;
  }

  const contenedor = document.getElementById("container");
  if (!contenedor) {
    console.error("No se encontró el elemento #container en la página.");
    return;
  }

  for (let i = 0; i < tamaño; i++) {
    let fila = document.createElement("div");
    fila.classList.add("row");
    fila.id = "fila-" + i;
    contenedor.appendChild(fila);

    for (let j = 0; j < tamaño; j++) {
      let columna = document.createElement("div");
      columna.classList.add("col-1");
      columna.id = `columna-${j}`;

      let casilla = document.createElement("button");
      columna.appendChild(casilla);
      casilla.id = `${i}-${j}`;
      casilla.textContent = "";
      fila.appendChild(columna);
    }
  }
}
