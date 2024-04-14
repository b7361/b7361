var autoGenerateInterval;
var numerosGenerados = [];

function generarNumeroAleatorio() {
  var min = 1; // Valor mínimo
  var max = 90; // Valor máximo

  var numeroAleatorio;
  do {
    numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (numerosGenerados.includes(numeroAleatorio));

  numerosGenerados.push(numeroAleatorio);
  document.getElementById('resultado').innerText = " " + numeroAleatorio;

  // Marcar el número aleatorio en rojo
  var numeros = document.getElementsByClassName("numero");
  for (var i = 0; i < numeros.length; i++) {
    if (parseInt(numeros[i].innerText) === numeroAleatorio) {
      numeros[i].classList.add("clicked");
    }
  }

  // Leer el número en voz alta
  leerNumeroEnVoz(numeroAleatorio);
}

function toggleAutoGenerate() {
  var autoGenerate = document.getElementById("autoGenerate").checked;

  if (autoGenerate) {
    autoGenerateInterval = setInterval(generarNumeroAleatorio, 3055); // Genera cada 4 segundos
    generarNumeroAleatorio(); // Genera el primer número al activar la generación automática
  } else {
    clearInterval(autoGenerateInterval);
  }
}

function detenerGeneracionAutomatica() {
  clearInterval(autoGenerateInterval);
  document.getElementById("autoGenerate").checked = false; // Desmarcar la casilla de verificación
}

function leerNumeroEnVoz(numero) {
  var mensaje = " " + numero;
  var voz = new SpeechSynthesisUtterance(mensaje);
  voz.lang = 'es-ES'; // Establece el idioma en español
  window.speechSynthesis.speak(voz);
}

// Función para inicializar los números del 1 al 90
function initNumeros() {
  var numerosDiv = document.getElementById("numeros");
  for (var i = 1; i <= 90; i++) {
    var numero = document.createElement("div");
    numero.innerText = i;
    numero.classList.add("numero");
    numero.onclic = function() {
      var num = parseInt(this.innerText);
      document.getElementById('resultado').innerText = "Número aleatorio: " + num;
      var numeros = document.getElementsByClassName("numero");
      for (var j = 0; j < numeros.length; j++) {
        if (parseInt(numeros[j].innerText) === num) {
          numeros[j].classList.add("clicked");
        } else {
          numeros[j].classList.remove("clicked");
        }
      }
    };
    numerosDiv.appendChild(numero);
  }
}

// Llamamos a la función de inicialización al cargar la página
initNumeros();
