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
    });
  } else {
    console.error("btnConfirmar presenta error");
  }
}
