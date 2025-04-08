import Utils from "./Utils.js"; // Importa funciones utilitarias (como loadPage)
import { Tablero } from "../models/Tablero.js"; // Importa la clase Tablero
import { configuracionPosBarcos, seleccionBarcos } from "./confBarcosJugador.js"; // Funciones para configurar los barcos del jugador

// Función principal que crea el tablero cuando el usuario confirma los datos
export async function crearTablero() {
  let btnConfirmar = document.getElementById("btnConfirmar"); // Obtiene el botón con ID "btnConfirmar"

  // Verifica si el botón existe
  if (btnConfirmar) {
    // Asigna un evento al botón para cuando se hace clic
    btnConfirmar.addEventListener("click", async () => {
      const tamaño = document.getElementById("inTamaño").value; // Obtiene el valor del input para el tamaño del tablero
      const geoPosicion = document.getElementById("geoPosicion").value; // Obtiene la ubicación ingresada por el usuario

      // Verifica que la geolocalización no esté vacía
      if (geoPosicion == "") {
        alert("La geoPosicion no puede estar vacia"); // Muestra alerta si está vacía
        return;
      }

      // Valida que el tamaño esté entre 10 y 20
      if (tamaño < 10 || tamaño > 20) {
        alert("El tamaño del tablero debe ser minimo de 10x10 y maximo de 20x20"); // Muestra mensaje de error
      } else {
        // Si los datos son válidos, crea una nueva instancia del tablero
        const tablero = new Tablero(tamaño, geoPosicion);

        // Guarda el tablero en localStorage como string JSON
        localStorage.setItem("tablero", JSON.stringify(tablero));

        console.log(tablero); // Imprime el objeto tablero en consola

        // Carga la siguiente vista (crearBarcos.html) dentro del contenedor
        await Utils.loadPage("src/views/crearBarcos.html", container, true);

        // Agrega la clase "barcos" al body (para estilos o lógica CSS/JS)
        document.body.classList.add('barcos');

        // Inicializa configuración y selección de barcos
        configuracionPosBarcos();
        seleccionBarcos();
      }
    });
  } else {
    // Si no se encuentra el botón, lanza error por consola
    console.error("btnConfirmar presenta error");
  }
}
