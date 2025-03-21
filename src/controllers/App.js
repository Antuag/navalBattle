import Utils from "./Utils.js";
import { Usuario } from "../models/Usuario.js";
import { login } from "./login.js";
import { cargarPuntajes } from "./ranking.js"

class App {
  static async main() {
    const container = document.getElementById("container");
    await Utils.loadPage("src/views/login.html", container);
    login();
    App.crearUsuario();
  }
  static crearUsuario() {
    let btnIniciar = document.getElementById("btnIniciar");
    btnIniciar.addEventListener("click", () => {
      const nickname = document.getElementById("nickname").value;
      const pais = document.getElementById("country").value;
      const puntaje = 0;
      const jugador = new Usuario(nickname, pais, puntaje);
      console.log(jugador);
      Utils.loadPage("src/views/ranking.html", container);
      cargarPuntajes();

    });
  }
}

App.main();
