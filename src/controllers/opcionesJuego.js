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

  if (tamaño < 10 && tamaño > 20) {
    alert("El tamaño del tablero debe ser minimo de 10x10 y maximo de 20x20");
    return;
  }

  for (let i = 0; i < tamaño; i++) {
    let fila = document.createElement("div");
    let contenedor = document.getElementById("container");
    contenedor.appendChild(fila);
    fila.classList.add("row");
    fila.id = "fila " + i;
    document.getElementById("tamañoNum").value = "";

    for (let j = 0; j < tamaño; j++) {
      let columna = document.createElement("div");
      fila.appendChild(columna);
      columna.classList.add("col-1");
      columna.id = "columna " + j;
      let casillas = document.createElement("button");
      contador++;
      columna.appendChild(casillas);
      casillas.id = i + "-" + j;
      casillas.maxLength = 1;
    }
  }
}
