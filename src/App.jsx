//importamos todas las funciones de react y los componentes de la aplicacion
import { useEffect, useState } from 'react'
import './index.css'
import Formulario from "./Formulario.jsx"
import Tareas from "./Tareas.jsx"


//creamos la funcionalidad de lo que vamos a ver en nuestro front
function App() {

  //definimos el estado de las tareas que inicialmente será un array vacío
  let [tareas, setTareas] = useState([])

  //cuando el componente se monta por primera vez, hacemos una solicitud GET a la api
  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then(respuesta => respuesta.json())
      .then(tareas => setTareas(tareas))
  }, [])

  //creamos una funcion para cuando creemos nuevas tareas
  function crearTarea(tarea) {

    setTareas([...tareas, tarea])
    // console.log(tarea)
  }

  //creamos una funcion para actualizar el estado de las tareas pasandole el id de la tarea que se actualize
  function actualizarEstado(id) {

    fetch(`http://localhost:3000/todo/actualizar/${id}/2`, {
      method: "PUT"
    })
      .then(respuesta => respuesta.json())
      .then(({ resultado }) => {
        // console.log(resultado)
        if (resultado === "ok") {

          //encontramos la tarea que coincida con el id utilizando el map
          setTareas(tareas.map(tarea => {

            //al encontrar la tarea correspondiente, se cambia la propiedad terminada al valor contrario
            if (tarea.id === id) {
              return { ...tarea, terminada: !tarea.terminada }

            }
            return tarea;
          }
          ))
        }
      })
  }


  //creamos una funcion para editar las tareas con el parametro, nuevaTarea, un objeto que tiene la informacion de la neuva tarea
  function editarTarea(nuevaTarea) {

    //verificamos si el id de la tarea coincide con el de la nueva tarea
    setTareas(tareas.map(tarea => {

      if (tarea.id === nuevaTarea.id) {

        //si coincide entonces la actualizamos
        return { ...tarea, tarea: nuevaTarea.tarea, terminada: nuevaTarea.terminada };
      }
      return tarea;
    }));
   
  }

  function borrarTarea(id) {

    //hacemos una solicitud a la URL con el id correspondiente
    fetch(`http://localhost:3000/todo/borrar/${id}`, {
      method: "DELETE"
    })
      .then(respuesta => respuesta.json())
      .then(({ resultado }) => {

        if (resultado == "bien") {

          //filtramos las tareas por el id, entonces obtenemos un array de tareas sin la tarea eliminada
          return setTareas(tareas.filter(tarea => tarea.id != id))
        }
        console.log("error")
      })
  }
  console.log(tareas)

  return (
    <>
      {/* componente que muestra el formulario pasandole la funcion crear tarea como prop */}
      <Formulario crearTarea={crearTarea} />

      {/* lista de tareas, para determinar si hay tareas usamos length */}
      <section className='tareas' key={tareas.id} >
        {tareas.length > 0 ? tareas.map(tarea => 

          // si las hay, se mapea el componente tareas pasando las propiedades necesarias, si no hay tareas se muestra un parrafo
          //cada componente tareas es una tarea individual que se puede editar, marcar como terminada o borrar
          <Tareas key={tarea.id}
            id={tarea.id}
            tarea={tarea.tarea}
            terminada={tarea.terminada}
            borrarTarea={borrarTarea}
            actualizarEstado={actualizarEstado}
            editarTarea={editarTarea} />) : <p>No hay Tareas</p>}

      </section>
    </>
  )

}

export default App

