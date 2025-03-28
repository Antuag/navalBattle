import Utils from "./Utils.js";
import { Usuario } from "../models/Usuario.js";
import { login } from "./login.js";
import { cargarPuntajes } from "./ranking.js";
import { Tablero } from "../models/Tablero.js";
class App {
  static async main() {
    const container = document.getElementById("container");
    await Utils.loadPage("src/views/login.html", container);
    login();
    App.crearUsuario();
  }

  static crearUsuario() {
    let btnIniciar = document.getElementById("btnIniciar");
    btnIniciar.addEventListener("click", async () => {
      const nickname = document.getElementById("nickname").value;
      const pais = document.getElementById("country").value;
      const puntaje = 0;
      const jugador = new Usuario(nickname, pais, puntaje);
      console.log(jugador);
      await Utils.loadPage("src/views/opcionesJuego.html", container, true);
      App.crearTablero(); // Llamar a crearTablero después de cargar opcionesJuego.html
    });
  }

  static crearTablero() {
    let btnConfirmar = document.getElementById("btnConfirmar");
    if (btnConfirmar) {
      // Validar que el botón exista
      btnConfirmar.addEventListener("click", async () => {
        const tamaño = document.getElementById("inTamaño").value;
        const color = document.getElementById("colorBarcos").value;
        const geoPosicion = document.getElementById("geoPosicion").value;
        const tablero = new Tablero(tamaño, color, geoPosicion);
        console.log(tablero);
        await Utils.loadPage("src/views/ranking.html", container, true);
        await cargarPuntajes();
      });
    } else {
      console.error("btnConfirmar presenta error");
    }
  }
}

App.main();
