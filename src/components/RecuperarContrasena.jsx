import React, { useState, useRef, useEffect } from 'react'
import '../style/estilo.css'
import { Navigate, NavLink } from "react-router-dom";

export const RecuperarContrasena = () => {
    const [datos, setDatos] = useState({
        email: "",
    })
    const [Recuperar, setRecuperar] = useState(false)
    const [loading, setLoading] = useState(false)
    const Swal = require('sweetalert2')
    const email = useRef(null)
    const mostrarAlerta = (err) => {
        Swal.fire({
            title: '¡Error!',
            text: err,
            icon: 'error',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894"
        })
    }
    const verificarCampos = (err) => {
        Swal.fire({
            title: '¡Error!',
            text: "por favor verifica los campos",
            icon: 'error',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894"
        })
    }
    /*
    useEffect(() => {

        fetch(`http://127.0.0.1:8000/password-reset/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        })
            .then(res => res.json())
            .then((dat) => {
                    CorreoEnviado()              
            })

            .catch(err => console.log(err))

    }, [datos])*/

    const CorreoEnviado = (err) => {
        Swal.fire({
            title: '¡Hecho!',
            text: "Se envió el token a tu correo",
            icon: 'success',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894"
        })
    }
    const cambiar = () => {

        if (datos.email !== "") {
            setLoading(true)
            fetch(`https://saes-escom-app.herokuapp.com/password-reset/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            })
                .then(res => res.json())
                .then((dat) => {
                    if (dat.email === undefined) {
                        CorreoEnviado()
                        setRecuperar(true)
                    } else {
                        mostrarAlerta(dat.email[0])
                    }
                    setLoading(false)
                })

                .catch(err => console.log(err))
        }

    }

    const handleChange = (event) => {
        setDatos({ ...datos, [event.target.name]: event.target.value })
    }
    return (
        <div className='container'>
            <div className='row  '>
                <div className='col-lg-12  align-self-center '>
                    <div className="card shadow-lg  position-absolute top-50 start-50 translate-middle" >
                        <div className="card-body" style={{ width: "500px" }}>
                            <h5 className="card-title">Recuperar contraseña</h5>
                            <p className="card-text">Correo electronico</p>
                            
                            <input className="form-control" name='email' onChange={handleChange} ref={email} type={"text"} />

                            

                            <div className='text-end'>
                                <NavLink className="me-2" to="/">
                                    <a type="button" className="btn btn-primary mt-2  ">regresar</a>
                                </NavLink>
                                <button type="button" className="btn btn-success mt-2  " onClick={cambiar}>Enviar</button>
                                {Recuperar ?
                                    (<><Navigate to={"/cambiarContrasena"} /></>)
                                    : (<></>)}
                            </div>
                        </div>
                        <div className='col-8'>
                            {loading ? (<>
                                <div className="spinner-grow text-primary m-1 centrar" role="status">
                                    <span className="visually-hidden ">Loading...</span>
                                </div>

                            </>) : (<></>)}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
