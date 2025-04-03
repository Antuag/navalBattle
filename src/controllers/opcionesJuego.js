import { Tablero } from "../models/Tablero.js";
import Utils from "./Utils.js";
import { ataquesBarcos } from "./ataques.js";
import { insertarMapa, seleccionBarcos } from "./insertarMapa.js";

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

        insertarMapa();
        seleccionBarcos();
      }
    });
  } else {
    console.error("btnConfirmar presenta error");
  }
}

export async function tamañoTablero() {
  const tablero = JSON.parse(localStorage.getItem("tablero"));
  const tamaño = tablero["tamañoTablero"];
  let contenedor1 = document.getElementById("tableroGuerra1");
  let contenedor2 = document.getElementById("tableroGuerra2");

  // con esto se manejan las columnas y filas de los tableros, por medio de la variable tamaño
  [contenedor1, contenedor2].forEach((contenedor) => {
    contenedor.style.gridTemplateColumns = `repeat(${tamaño}, 1fr)`;
    contenedor.style.gridTemplateRows = `repeat(${tamaño}, 1fr)`;
  });

  for (let i = 0; i < tamaño; i++) {
    for (let j = 0; j < tamaño; j++) {
      let casilla1 = document.createElement("button");
      casilla1.classList.add("buttonGuerra");
      casilla1.id = `t1-${i}-${j}`;
      casilla1.addEventListener("click", () => {
        ataquesBarcos(casilla1.id);
      });

      let casilla2 = document.createElement("button");
      casilla2.classList.add("buttonGuerra");
      casilla2.id = `t2-${i}-${j}`;
      casilla2.addEventListener("click", () => {
        ataquesBarcos(casilla2.id);
      });

      contenedor1.appendChild(casilla1);
      contenedor2.appendChild(casilla2);
    }
  }
}

export async function cargarClima() {
  const API_KEY = "60c90e172eb6b3e0c4ea4d2956b0189b";
  const tablero = JSON.parse(localStorage.getItem("tablero"));
  const ciudad = tablero["geoPosicion"];

  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const nombreCiudad = data.name;
      const temperatura = data.main.temp;
      const clima = data.weather[0].description;
      const viento = data.wind.speed;
      const humedad = data.main.humidity;

      document.getElementById("city").innerText = nombreCiudad;
      document.getElementById("temperature").innerText = temperatura;
      document.getElementById("weather").innerText = clima;
      document.getElementById("wind").innerText = viento;
      document.getElementById("humidity").innerText = humedad;
    });
}
