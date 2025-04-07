import { Usuario } from "../models/Usuario.js";
import Utils from "./Utils.js";
import { crearTablero } from "./configuracionJuego.js";
import { cargarPuntajes } from "./ranking.js";

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
    const pais = document.getElementById("country");
    const codigoPais = pais.selectedOptions[0].value;
    if (nickname == "") {
      alert("El nickname no puede estar vacío");
      return;
    }
    if (codigoPais == "Selecciona un país" || codigoPais == "") {
      alert("Debes seleccionar un país");
      return;
    }
    console.log(codigoPais);

    const jugador = new Usuario(nickname, codigoPais);
    localStorage.setItem("jugador", JSON.stringify(jugador));
    console.log(jugador);

    await Utils.loadPage("src/views/opcionesJuego.html", container, true);
    crearTablero();
  });
}

export function cargarUsuario() {
  const jugador = JSON.parse(localStorage.getItem("jugador"));
  const nickname = jugador["nick_name"];
  const pais = jugador["country_code"];
  const puntaje = jugador["score"];
  if(!nickname || !pais || !puntaje) {
    return;
  }
  document.getElementById("nickname").innerText = nickname;
  document.getElementById("country").innerText = pais;
  document.getElementById("score").innerText = puntaje;
  
  
}

export function cargarRanking() { 
  let btnRanking = document.getElementById("btnRanking");
  btnRanking.addEventListener("click", async () => {
    await Utils.loadPage("src/views/ranking.html", container, true);
    cargarPuntajes();
  });
}
