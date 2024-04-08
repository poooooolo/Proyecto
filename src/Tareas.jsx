import { useState } from "react"

function Tareas({ id, tarea, terminada, borrarTarea, actualizarEstado, editarTarea }) {

    let [editando, setEditando] = useState(false)
    let [nuevaTarea, setNuevaTarea] = useState(tarea)

    let guardar = () => {
        setEditando(false)
        fetch(`http://localhost:3000/todo/actualizar/${id}/1`, {
            method: "PUT",
            body: JSON.stringify({ tarea: nuevaTarea }),
            headers: { "Content-type": "application/json" }
        })
            .then(respuesta => respuesta.json())
            .then(({ resultado }) => {
                console.log(resultado)
                if (resultado === "ok") {
                    editarTarea({ tarea: nuevaTarea, terminada: false, id })
                    setEditando(false)
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

