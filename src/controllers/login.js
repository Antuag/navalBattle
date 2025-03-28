import { Usuario } from "../models/Usuario.js";
import Utils from "./Utils.js";
import { crearTablero } from "./opcionesJuego.js";

export function login() {
  let paises = document.getElementById("country");

  // Función para obtener y mostrar países
  function cargarPaises() {
    fetch("http://127.0.0.1:5000/countries")
      .then((response) => response.json())
      .then((data) => {
        // Recorrer los países y añadirlos al option
        data.forEach((pais) => {
          // Obtener clave y valor del json que tiene los paises
          let code = Object.keys(pais)[0]; // codigo ejm: "AD"
          let name = pais[code]; // Nombre ejm: "andorra"
          let option = document.createElement("option");
          option.value = code;
          option.textContent = name;
          paises.appendChild(option);
        });
      })
      .catch((error) => console.error("Error al obtener los países:", error));
  }
  cargarPaises();
  
}

export function crearUsuario() {
    let btnIniciar = document.getElementById("btnIniciar");
    btnIniciar.addEventListener("click", async () => {
      const nickname = document.getElementById("nickname").value;
      const pais = document.getElementById("country").value;
      const puntaje = 0;
      const jugador = new Usuario(nickname, pais, puntaje);
      localStorage.setItem("jugador", JSON.stringify(jugador));
      console.log(jugador);
      await Utils.loadPage("src/views/opcionesJuego.html", container, true);
      crearTablero();

    });
}


  

