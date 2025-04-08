import Utils from "./Utils.js";
import { login, crearUsuario, cargarRanking } from "./login.js";

class App {
  static async main() {
    const container = document.getElementById("container");
    await Utils.loadPage("src/views/login.html", container);
    login();
    crearUsuario();
    cargarRanking();
    
  }
}

App.main();
