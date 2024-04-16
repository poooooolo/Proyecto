import { useState } from "react"

//le pasamos todas estas props para identificar la tarea, mostrar su contenido, determinar si está terminada, y 
//proporcionar funcionalidades para editar, borrar y actualizar el estado de la tarea
function Tareas({ id, tarea, terminada, borrarTarea, actualizarEstado, editarTarea }) {

    //indicamos su la tarea está siendo editada
    let [editando, setEditando] = useState(false)

    //almacenamos el valor actual del texto de la tarea mientras se edita
    let [nuevaTarea, setNuevaTarea] = useState(tarea)

    let guardar = () => {

        //establecemos la edicion en false para indicar que se ha terminado de editar la tarea y se van a guardar los cambios
        setEditando(false)

        //enviamos una solicitud al servidor con el id correspondiente
        fetch(`https://apitodo-gs7p.onrender.com/todo/actualizar/${id}/1`, {
            method: "PUT",
            body: JSON.stringify({ tarea: nuevaTarea }), //enviamos la nueva tarea en formato json
            headers: { "Content-type": "application/json" }
        })
            .then(respuesta => respuesta.json())
            .then(({ resultado }) => {
                // console.log(resultado)

                //si la actualizacion se realizo bien
                if (resultado === "ok") {

                    //llamamos a editar tarea pasandole un objeto con la tarea actualizada, terminada en false y el id de la tarea
                    editarTarea({ tarea: nuevaTarea, terminada: false, id })
                }
            })
    }

    return (
        <div className='tarea' key={tarea.id}>
            {editando ?
                (<input type="text" className="visible" value={nuevaTarea} onChange={evento => setNuevaTarea(evento.target.value)} />)
                :
                (<h2 className={editando ? "" : "visible"}>{tarea}</h2>)}

            <button className='boton' onClick={() => {
                if (editando) {
                    guardar()
                }
                else {
                    setEditando(true)
                }
            }
            }>{editando ? "Guardar" : "Editar"}</button>
            <button className='boton' onClick={() => borrarTarea(id)}>Borrar</button>
            <button className={`estado ${terminada ? "terminada" : null}`} onClick={() => actualizarEstado(id)}><span></span></button>
        </div>
    )
}
export default Tareas

