import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';
import '../../style/estilo.css'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export const Menu = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [token, setToken] = useState({ token: "" })

    useEffect(() => {
        if (!cookies.get('token')) {
            navigate('/');
        } else {
            setToken({ token: cookies.get('token') })
        }
    }, [])

    const navlink = ({ isActive }) => {
        return ({
            fontWeight: isActive ? 'bold' : 'normal',
            backgroundColor: isActive ? 'rgb(221, 180, 0)' : '',
            borderRadius: isActive ? '15px' : '0px',


        })
    }

    const mostrarAlerta = () => {
        Swal.fire({
            title: '!Sesión cerrada!',
            text: "presiona para continuar",
            icon: 'success',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894" 
        })
    }

    const mostrarError = (err) => {
        Swal.fire({
            title: '!Algo anda mal :c!',
            text: err,
            icon: 'failed',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894" 
        })
    }
    



    const cerrarSesion = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/users/logout/',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(token),
                })

            cookies.remove('token')
            cookies.remove('usuario')
            cookies.remove('usuarioId')
            mostrarAlerta()
        } catch (err) {
            mostrarError(err)
        }
        navigate('/');
    }


    return (
        <div>
            <div className='row m-0 letra'>
                <div className='col-sm-12 '>
                    <div className='foto centrar'></div>
                </div>
                <div className='col-sm-12 col-xl-12 text-center pt-3  '>
                    <span>{cookies.get('usuario')} - </span>
                    <span>Alumno</span>

                </div>
                <div className='col-sm-12 col-xl-12 text-end mt-3  '>
                    <button data-bs-toggle="tooltip" data-bs-placement="top" title="cerrar sesion" type="button" onClick={cerrarSesion} className="btn btn-warning cerrarSesion">Cerrar Sesion <FontAwesomeIcon className='ms-2 mt-1 ' icon={faSignOut} /> </button>
                </div>
                <div className='col-sm-12  text-end mt-3'>
                    <NavLink style={navlink} className="nav-link cambio active text-light" to="/alumno/datosCuenta">cambiar contraseña </NavLink>
                </div>
            </div>
            <div className='row align-items-center m-0  acciones  shadow-lg  mt-3 letra' >
                <div className="accordion accordion-flush  " id="accordionFlushExample" >
                    <div className="accordion-item " >
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Periodo actual
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <NavLink style={navlink} className="nav-link cambio text-dark active text-light" to="/alumno/calificaciones">Calificaciones </NavLink>
                                <NavLink style={navlink} className="nav-link text-dark active text-light" to="/alumno/horario">Horario</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item" >
                        <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                ETS
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <NavLink style={navlink} className="nav-link text-dark active text-light" to={{
                                    pathname: "/alumno/inscribirETS",
                                    state: [
                                        { nombre: "calculo", turno: "vespertino", profesor: "Alejandro T.", creditos: "4.25", salón: "1002" },
                                        { nombre: "fisica", turno: "matutino", profesor: "Victoria M.", creditos: "2.5", salón: "2005" },
                                        { nombre: "Electronica", turno: "matutino", profesor: "Victoria M.", creditos: "4.5", salón: "2005" },
                                        { nombre: "Electronica", turno: "matutino", profesor: "Victoria M.", creditos: "4.5", salón: "2005" },
                                        { nombre: "Electronica", turno: "matutino", profesor: "Victoria M.", creditos: "4.5", salón: "2005" },
                                        { nombre: "Electronica", turno: "matutino", profesor: "Victoria M.", creditos: "4.5", salón: "2005" },
                                        { nombre: "Electronica", turno: "matutino", profesor: "Victoria M.", creditos: "4.5", salón: "2005" },

                                    ]
                                }} >Inscribir</NavLink>
                                <NavLink style={navlink} className="nav-link text-dark active text-light" to="/alumno/calificacionesETS">Calificaciones</NavLink>

                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Historial academico
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body"><NavLink style={navlink} className="nav-link text-dark active  text-light" to="/alumno/kardex">Kardex </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingFor">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFor" aria-expanded="false" aria-controls="flush-collapseFor">
                                Datos generales
                            </button>
                        </h2>
                        <div id="flush-collapseFor" className="accordion-collapse collapse" aria-labelledby="flush-headingFor" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <NavLink style={navlink} className="nav-link text-dark active  text-light " to="/alumno/datosmedicos">Datos medicos </NavLink>
                                <NavLink style={navlink} className="nav-link text-dark active  text-light " to="/alumno/datospersonales">Datos personales </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingFive">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFor">
                                Saberes adquiridos
                            </button>
                        </h2>
                        <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <NavLink style={navlink} className="nav-link text-dark active  text-light " to="/alumno/inscribirSaberes" >Inscribir </NavLink>
                                <NavLink style={navlink} className="nav-link text-dark active  text-light " to="/alumno/calificacionesSaberes">Calificaciones </NavLink>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='row p-3  m-0'>
                <div className='col-12'>
                    <footer>
                        <p className='text-center'>Dev. Javier Galeana</p>
                    </footer>
                </div>
            </div>



        </div>
    )
}
