import { useState } from 'react'

function Formulario({crearTarea}) {

    //almacenamos el valor del texto introducido en el formulario
    let [textoTemporal, setTextoTemporal] = useState("")

    return (
        <>
            <form onSubmit={evento => {
                evento.preventDefault()

                fetch("http://localhost:3000/todo/crear", {
                    method: "POST",
                    body: JSON.stringify({ tarea: textoTemporal }),
                    headers: { "Content-type": "application/json" }
                })
                    .then(respuesta => respuesta.json())
                    .then(({id}) => {
                        if(id){
                            crearTarea({tarea : textoTemporal, terminada : false, id})
                            return setTextoTemporal("")
                        }
                        console.log("error")
                    })

            }}>

                <input type="text" placeholder="¿Qué hay que hacer?" value={textoTemporal} onChange={evento => setTextoTemporal(evento.target.value)} />
                <input type="submit" value="Crear tarea" />
            </form>
        </>
    )
}

export default Formulario;