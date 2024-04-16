import { useState } from 'react'

//creamos esta funcion para cada vez que se vaya a crear una nueva tarea
function Formulario({crearTarea}) {

    //almacenamos el valor del texto introducido en el formulario
    let [textoTemporal, setTextoTemporal] = useState("")

    return (
        <>
            <form onSubmit={evento => {
                evento.preventDefault()

                //hacemos una peticion post enviando los datos de la nueva tarea en json
                fetch("https://apitodo-gs7p.onrender.com/todo/crear", {
                    method: "POST",
                    body: JSON.stringify({ tarea: textoTemporal }),
                    headers: { "Content-type": "application/json" }
                })
                    .then(respuesta => respuesta.json())
                    .then(({id}) => {
                        
                        //si la peticion sale bien recibimos un id para la tarea creada
                        if(id){

                            //llamamos a crear tarea pasandole un objeto con el texto de la tarea, terminada en false y el id
                            crearTarea({tarea : textoTemporal, terminada : false, id})

                            //limpiamos el campo
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