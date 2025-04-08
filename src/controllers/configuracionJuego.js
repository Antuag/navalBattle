import Utils from "./Utils.js";
import { Tablero } from "../models/Tablero.js";
import { configuracionPosBarcos, seleccionBarcos} from "./confBarcosJugador.js";

export async function crearTablero() {
  let btnConfirmar = document.getElementById("btnConfirmar");
  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", async () => {
      const tamaño = document.getElementById("inTamaño").value;
      const geoPosicion = document.getElementById("geoPosicion").value;

      if (geoPosicion == "") {
        alert("La geoPosicion no puede estar vacia");
        return;
      }

      if (tamaño < 10 || tamaño > 20) {
        alert(
          "El tamaño del tablero debe ser minimo de 10x10 y maximo de 20x20"
        );
      } else {
        const tablero = new Tablero(tamaño, geoPosicion);
        localStorage.setItem("tablero", JSON.stringify(tablero));
        console.log(tablero);
        await Utils.loadPage("src/views/crearBarcos.html", container, true);
        document.body.classList.add('barcos');
        configuracionPosBarcos();
        seleccionBarcos();

      }
    });
  } else {
    console.error("btnConfirmar presenta error");
  }


}