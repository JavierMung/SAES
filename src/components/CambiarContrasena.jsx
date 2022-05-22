import React, { useState, useRef, useEffect } from 'react'
import '../style/estilo.css'
import { Navigate, NavLink } from "react-router-dom";
function CambiarContrasena() {
    const [contrasena, setContrasena] = useState({
        token: "",
        password: ""
    })
    const [verificar, setVerificar] = useState({
        verificar: ""
    })
    const [regresar, setRegresar] = useState(false)

    const Swal = require('sweetalert2')

    const mostrarAlerta = (err) => {
        Swal.fire({
            title: '¡Error!',
            text: err,
            icon: 'error',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894"
        })
    }
    const CorreoEnviado = (err) => {
        Swal.fire({
            title: '¡Hecho!',
            text: "La contraseña se cambio exitosamente",
            icon: 'success',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894"
        })
    }

    const handleChange = (event) => {
        setContrasena({ ...contrasena, [event.target.name]: event.target.value })
    }
    const Verificar = (event) => {
        console.log(verificar);
        setVerificar({ ...verificar, verificar: event.target.value })
    }

    const Editar = () => {
        if (contrasena.password === verificar.verificar) {
            fetch(`https://saes-escom-app.herokuapp.com/password-reset/confirm/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contrasena),
            })
                .then(res => res.json())
                .then((dat) => {
                    if (dat.status === "OK") {
                        CorreoEnviado()
                        setRegresar(true)
                    } else {
                        mostrarAlerta(dat.detail)

                    }
                    setVerificar({ verificar: "" })
                    setContrasena({ token: "", password: "" })
                })
                .catch(err => {
                    mostrarAlerta(err)
                    setVerificar("")
                    setContrasena({ token: "", password: "" })
                }
                )
        } else {
            mostrarAlerta("La contraseña nueva no coincide")
            setVerificar({verificar:""})
            setContrasena({ token: "", password: "" })
        }
    }
    return (<div className='container letra'>
        <div className='row  '>
            <div className='col-lg-12  align-self-center '>
                <div className="card shadow-lg  position-absolute top-50 start-50 translate-middle" >
                    <div className="card-body" style={{ width: "500px" }}>
                        <p className="card-text">Contraseña Nueva</p>
                        <input type="password" value={contrasena.password} className="form-control" name={"password"} onChange={handleChange} />
                        <p className="card-text">Confirmar Contraseña</p>
                        <input type="password" value={verificar.verificar} className="form-control" name={"verificar"} onChange={Verificar} />
                        <p className="card-text">Token</p>
                        <input className="form-control" value={contrasena.token} name={"token"} onChange={handleChange} type={"text"} />
                        {regresar ? (<><Navigate to={"/"} /></>)
                            : (<></>)}
                        <br />
                        <div className='text-end'>
                            <NavLink className="me-2 btn btn-primary mt-2" to="/">
                                regresar
                            </NavLink>
                            <button type="button" className="btn btn-success mt-2" onClick={Editar} >Enviar</button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>);
}

export default CambiarContrasena;