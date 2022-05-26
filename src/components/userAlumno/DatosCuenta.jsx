import React, { useEffect, useState, useRef } from 'react'
import '../../style/estilo.css'
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

export const DatosCuenta = () => {
    const cookies = new Cookies()
    const Swal = require('sweetalert2')
    const navigate = useNavigate();
    const inputNueva = useRef(null)
    const inputActual = useRef(null)

    const inputVerificar = useRef(null)
    const [loading, setLoading] = useState(true)
    const [datos, setDatos] = useState({

        id: cookies.get('usuarioId'),
        contrasenia_actual: "",
        contrasenia_nueva: ""

    })

    
    const [verificar, setVerificar] = useState({
        verificar: ""
    })
    const mostrarAlerta = (err) => {
        Swal.fire({
            title: '¡Error!',
            text: err,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "#00b894"
        })
    }



    useEffect(() => {
        if (!cookies.get('token')) {
            navigate('/');

        } else {
            setLoading(false)
        }
    }, [])

 
    const error = (err) => {
        Swal.fire({
            title: '¡Error!',
            text: err,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "#00b894"
        })
    }


    const exito = () => {
        Swal.fire({
            title: '¡Éxito!',
            text: "Contraseña cambiada correctamente",
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "#00b894"
        })
    }
    const terminarAlerta = () => {
        Swal.fire({
            title: '¿Seguro que desea cambiar la contraseña?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "#00b894",
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                editar()
            } else if (result.isDenied) {
                Swal.fire({
                    title: '¡Hecho!',
                    text: "Los cambios no fueron guardados",
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: "#00b894"
                })
            }
        })
    }
    const handleChange = (event) => {
        if(event.target.value!==" "){
            setDatos({
                ...datos,
                [event.target.name]: event.target.value,
            });
        }

    }

    const Verificar = (event) => {
        if(event.target.value!==" "){
        setVerificar({ ...verificar, verificar: event.target.value })
        }

    }

    useEffect(() => {
        if (!cookies.get('token')) {
            navigate('/');
        }
    }, [])

    const editar = async () => {
        if (verificar.verificar==="" || datos.contrasenia_nueva=== "" || datos.contrasenia_actual==="") {
            
            error("Llena todos los campos")
            if(verificar.verificar===""){
                inputVerificar.current.classList.add('inputIncorrecto')
            }
            if(datos.contrasenia_nueva=== ""){
                inputNueva.current.classList.add('inputIncorrecto')
            }
            if(datos.contrasenia_actual===""){
                inputActual.current.classList.add('inputIncorrecto')
            }
        }else if( verificar.verificar === datos.contrasenia_nueva ){
            inputNueva.current.classList.remove('inputIncorrecto')
            inputVerificar.current.classList.remove('inputIncorrecto')
            inputNueva.current.classList.add('inputCorrecto')
            inputVerificar.current.classList.add('inputCorrecto')
        try {
            const respuesta = await fetch(`https://saes-escom-app.herokuapp.com/users/modify-password/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos)
            })
            if (respuesta.status !== 200) {
                error("Contraseña invalida")
                inputActual.current.classList.remove('inputCorrecto')
                inputActual.current.classList.add('inputIncorrecto')
            } else exito();

        } catch (err) {
            error(err)
        }
        }
         else {
         
                
          
                inputNueva.current.classList.add('inputIncorrecto')
                inputVerificar.current.classList.add('inputIncorrecto')
                inputNueva.current.classList.remove('inputCorrecto')
                inputVerificar.current.classList.remove('inputCorrecto')
            
            mostrarAlerta("La contraseña no es la misma")
        }
    }

    return (<>
        <div className='row  m-0 justify-content-center '>
            <div className='col-10 align mt-2'>

                {loading ? (<>
                    <div className='text-center'>
                        <Loading />
                    </div>
                </>) : (<>
                    <div className="card shadow-lg letra" >
                        <div className="card-body text-start">
                            <div className='mt-2 text-start ms-4 '><h1 className='border-bottom pb-3'>CAMBIAR CONTRASEÑA </h1></div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Contraseña Actual</span>
                                <input ref={inputActual} type="password" name={"contrasenia_actual"} value={datos.contrasenia_actual} className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Contraseña Nueva</span>
                                <input ref={inputNueva} type="password" name={"contrasenia_nueva"} value={datos.contrasenia_nueva} className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Contraseña Nueva</span>
                                <input ref={inputVerificar} type="password" name={"verificar"} value={verificar.verificar} className="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={Verificar} />
                            </div>

                        </div>
                        <button type="button" onClick={terminarAlerta} className="btn btn-success">Guardar</button>
                    </div>
                </>)}


            </div>
        </div>

    </>)
}

