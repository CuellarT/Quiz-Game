import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import preguntas from "./preguntas";
function App() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [desactivarBotones, setDesactivarBotones] = useState(false);
  const [mostrarRespuestas,setMostraRespuestas] = useState(false);

  const titulo = "QUIZ-GAME";

  function handleAnswerSubmit(isCorrect, e) {
    /* añadir puntuacion*/
    if (isCorrect) setPuntuacion(puntuacion + 1);
    /* añadir estilos de pregunta */
    e.target.classList.add(isCorrect ? "btn-success" : "btn-danger");
    e.target.classList.remove("btn-light");
    /* cambiar a la siguiente pregunta*/
    setTimeout(() => {
      if (preguntaActual == preguntas.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
      }
    }, 1000);
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante == 0) setDesactivarBotones(true);
    }, 1750);
    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished)
    return (
      <div>
        <span>
          obtuviste {puntuacion} de {preguntas.length}
        </span>
        <button className="btn btn-primary" onClick={() => (window.location.href = "/")}>
          Volver a Jugar
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsFinished(false);
            setMostraRespuestas(true);
          }}
        >
          Ver respuesta

        </button>
      </div>
    );

  if (mostrarRespuestas) {
    return (
      <div>
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span> Pregunta {preguntaActual + 1} de </span>
            {preguntas.length}
          </div>
          <div className="titulo-pregunta">
            {preguntas[preguntaActual].titulo}
          </div>
        <div>
          {
            preguntas[preguntaActual].opciones.filter(
              (opcion) => opcion.isCorrect
            )[0].textoRespuesta
          }
        </div>
        <button
          onClick={() => {
            if (preguntaActual === preguntas.length - 1) {
              window.location.href = "/";
            } else {
              setPreguntaActual(preguntaActual + 1);
            }
          }}
        >
          {preguntaActual === preguntas.length - 1
            ? "Volver a Jugar"
            : "Siguiente"}
        </button>
      </div>
      </div>
      
    );
  }
  return (
    <div>
      <h1 className="text-center">{titulo}</h1>

      <div className="card">
        <div className="card-body">
          <div className="Lado-izquierdo">
            <div className="numero de pregunta">
              <span> PREGUNTA {preguntaActual + 1} DE </span>
              {preguntas.length}
            </div>
            <div className="titulo-pregunta">
              {preguntas[preguntaActual].titulo}
            </div>
            <div>
              {
                !desactivarBotones ? (
                  <span> Tiempo restante: {tiempoRestante}</span>
                ):(
                  <button onClick={() => {
                    setTiempoRestante(10);
                    setDesactivarBotones(false);
                    setPreguntaActual(preguntaActual + 1);
                  }}>
                    continuar
                  </button>
                )
              }
            </div>
          </div>
          <div id="Lado-derecho">
            {preguntas[preguntaActual].opciones.map((respuesta) => (
              <button
                disabled={desactivarBotones}
                key={respuesta.textoRespuesta}
                type="button"
                className="btn btn-light"
                onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
              >
                {respuesta.textoRespuesta}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
