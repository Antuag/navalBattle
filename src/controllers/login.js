export class Usuario {
  constructor(nickname, pais, puntaje) {
    this.nickname = nickname;
    this.pais = pais;
    this.puntaje = puntaje;
  }
}
export function login() {
  let paises = document.getElementById("country");
  let btnIniciar = document.getElementById("btnIniciar");

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
  
  // Función para registrar usuario
  function registro() {
    let nickname = document.getElementById("nickname").value;
    let pais = document.getElementById("country").value;
    let puntaje = 0;
    let jugador = new Usuario(nickname, pais, puntaje);
    console.log(jugador);
  }

  btnIniciar.addEventListener("click", registro);
}
