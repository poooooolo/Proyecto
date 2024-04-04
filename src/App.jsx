import { useEffect, useState } from 'react'
import './index.css'
import Formulario from "./Formulario.jsx"


//creamos la funcionalidad de lo que vamos a ver en nuestro front
function App() {

  let [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then(respuesta => respuesta.json())
      .then(tareas => setTareas(tareas))
  },[])

  function crearTarea(tarea){
    setTareas([...tareas, tarea])
    console.log(tarea)
  }

  // function actualizarTarea(){
  //   fetch("http://localhost:3000/todo/actualizar/:id([a-f0-9]{24})/:operacion(1|2)")
  //   .then(respuesta => respuesta.text())

  // }




  function borrarTarea(id) {
    fetch(`http://localhost:3000/todo/borrar/${id}`, {
      method: "DELETE"
    })
      .then(respuesta => respuesta.json())
      .then(({ resultado }) => {
        console.log(resultado)
        if (resultado == "bien") {
          return setTareas(tareas.filter(tarea => tarea.id != id))
        }
        console.log("error")
      })
  }
console.log(tareas)

  return (
    <>
      <Formulario crearTarea={crearTarea} />
      <section className='tareas'>
        {tareas.map(tarea => (
          <div key={tarea.id} className='tarea'>
            <h2 className='visible'>{tarea.tarea}</h2>
            <input type="text" defaultValue="Aprender React" />
            <button className='boton'>Editar</button>
            <button className='boton' onClick={() => borrarTarea(tarea.id)}>Borrar</button>
            <button className='estado'><span></span></button>
          </div>
        ))}
      </section>
    </>
  )

}

export default App
