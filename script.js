const preguntas = [
  {
    enfermedad: "Diabetes Tipo 2",
    afirmacion: "La diabetes tipo 2 se puede prevenir o retrasar con hábitos saludables.",
    respuesta: true,
    explicacion: "¡Correcto! Una dieta balanceada y ejercicio diario reducen drásticamente el riesgo."
  },
  {
    enfermedad: "Hipertensión",
    afirmacion: "Si no tengo síntomas, significa que mi presión arterial está bien.",
    respuesta: false,
    explicacion: "Falso. La hipertensión es el 'asesino silencioso' porque suele no presentar síntomas."
  }
];

let indicePreguntaActual = 0;

// Función para inicializar e imprimir la trivia en el contenedor
function cargarPregunta() {
  const contenedor = document.getElementById("contenedor-juego");
  
  if (indicePreguntaActual >= preguntas.length) {
    contenedor.innerHTML = `
      <h3 style="color: #1A365D;">¡Has completado el Bio-Desafío!</h3>
      <p style="margin-top: 10px;">Gracias por aprender más sobre la prevención en salud.</p>
      <button class="btn-juego" onclick="reiniciarJuego()" style="margin-top: 15px; border-color: #2B6CB0; color: #2B6CB0;">Jugar de nuevo</button>
    `;
    return;
  }

  const datosPregunta = preguntas[indicePreguntaActual];

  // Construir la estructura visual interna de la pregunta de manera limpia
  contenedor.innerHTML = `
    <p style="text-transform: uppercase; font-size: 0.85rem; font-weight: bold; color: #2B6CB0; margin-bottom: 5px;">Enfermedad: ${datosPregunta.enfermedad}</p>
    <div class="juego-pregunta">"${datosPregunta.afirmacion}"</div>
    <div class="botones-juego-contenedor">
      <button class="btn-juego" id="btn-verdadero" onclick="verificarRespuesta(true)">Verdadero</button>
      <button class="btn-juego" id="btn-falso" onclick="verificarRespuesta(false)">Falso</button>
    </div>
    <div id="feedback-juego"></div>
  `;
}

// Función lógica para verificar la respuesta del usuario
function verificarRespuesta(eleccionUsuario) {
  const preguntaActual = preguntas[indicePreguntaActual];
  const btnVerdadero = document.getElementById("btn-verdadero");
  const btnFalso = document.getElementById("btn-falso");
  const feedback = document.getElementById("feedback-juego");

  // Bloquear los botones para que no sigan votando en la misma pregunta
  btnVerdadero.disabled = true;
  btnFalso.disabled = true;

  // Evaluar la respuesta agregando dinámicamente las clases del CSS
  if (eleccionUsuario === preguntaActual.respuesta) {
    if (eleccionUsuario === true) btnVerdadero.classList.add("correcto");
    else btnFalso.classList.add("correcto");
    
    feedback.innerHTML = `<p class="juego-feedback" style="color: #2F855A; background-color: #C6F6D5;">${preguntaActual.explicacion}</p>`;
  } else {
    if (eleccionUsuario === true) btnVerdadero.classList.add("incorrecto");
    else btnFalso.classList.add("incorrecto");
    
    feedback.innerHTML = `<p class="juego-feedback" style="color: #9B2C2C; background-color: #FED7D7;">La respuesta correcta era: ${preguntaActual.respuesta ? 'Verdadero' : 'Falso'}. <br> ${preguntaActual.explicacion}</p>`;
  }

  // Dar una pequeña pausa de 3.5 segundos para leer el feedback y avanzar automáticamente
  setTimeout(() => {
    indicePreguntaActual++;
    cargarPregunta();
  }, 3500);
}

function reiniciarJuego() {
  indicePreguntaActual = 0;
  cargarPregunta();
}

// Iniciar el juego automáticamente cuando cargue la página
window.onload = cargarPregunta;
