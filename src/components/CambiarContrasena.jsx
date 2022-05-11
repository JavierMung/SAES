import React, { useState, useRef, useEffect } from 'react'
import '../style/estilo.css'
import { Navigate, NavLink } from "react-router-dom";
function CambiarContrasena() {
    const[contrasena, setContrasena] = useState({
        token : "",
        password : ""
       })
    const [verificar, setVerificar] = useState({
        verificar:""
    })   
    const[regresar, setRegresar] = useState(false)

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

    const handleChange = (event)=>{
        setContrasena({...contrasena, [event.target.name]: event.target.value})
    }
    const Verificar = (event)=>{
        console.log(verificar);
        setVerificar({...verificar,verificar:event.target.value})
    }

    const Editar = ()=>{
        console.log(contrasena.contrasena);
        console.log(verificar.verificar);
        if(contrasena.password===verificar.verificar){
            fetch(`https://saes-escom-app.herokuapp.com/password-reset/confirm/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contrasena),
            })
                .then(res => res.json())
                .then((dat) => {
                    if(dat.status==="OK"){
                        CorreoEnviado()
                    }else{
                        mostrarAlerta(dat.detail)
                    }

                    setVerificar("")
                    setContrasena({token:"",password:""})
                    setRegresar(true)
                })

                .catch(err => console.log(err))
        }
    }
    return (<div className='container letra'>
        <div className='row  '>
            <div className='col-lg-12  align-self-center '>
                <div className="card shadow-lg  position-absolute top-50 start-50 translate-middle" >
                    <div className="card-body" style={{ width: "500px" }}>
                        <p className="card-text">Contraseña nueva</p>
                        <input className="form-control" name={"password"} type={"password"} onChange={handleChange}/>
                        <p className="card-text">Confirmar contraseña</p>
                        <input className="form-control" name={"verificar"} type={"password"}  onChange={Verificar}/>
                        <p className="card-text">Token</p>
                        <input className="form-control" name={"token"} onChange={handleChange} type={"text"} />
                        {regresar?(<><Navigate to={"/"} /></>)
                                    : (<></>)}

                        <br />
                        <div className='text-end'>
                            <NavLink className="me-2" to="/">
                                <a type="button" className="btn btn-primary mt-2  ">regresar</a>
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