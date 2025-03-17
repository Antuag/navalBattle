import Utils from "./Utils.js";
import { Usuario } from "../models/Usuario.js";
import { login } from "./login.js";

class Main {
  static async main() {
    const container = document.getElementById("container");
    await Utils.loadPage("src/views/login.html", container);
    login();

    let btnIniciar = document.getElementById("btnIniciar");
    btnIniciar.addEventListener("click", () => {
      const nickname = document.getElementById("nickname").value;
      const pais = document.getElementById("country").value;
      const puntaje = 0;
      const jugador = new Usuario(nickname, pais, puntaje);
      console.log(jugador);
    });
  }

}

Main.main();
