import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import  Cookies  from 'universal-cookie';
import { Navigate } from "react-router-dom";

export const Menu = () => {
    const cookies = new Cookies();
    console.log(cookies.get('usuario'));
    return (
        <div>
            <div className='row m-0 p-4'>
                <div className='col-sm-12 '>
                    <div className='foto centrar'></div>
                </div>
                <div className='col-sm-12 col-xl-12 text-center mt-3  '>
                    <h5>{cookies.get('usuario')?(<>{cookies.get('usuario')}</>):(<><Navigate to={"/alumno"}/></>)}</h5>
                    <span>2019630211 - </span>
                    <span>Administrador</span>
                </div>
                <div className='col-sm-12 col-xl-12 text-end mt-3  '>
                    <Link to="/"><button type="button" className="btn btn-warning cerrarSesion">Cerrar Sesion <FontAwesomeIcon className='ms-2 mt-1 ' icon={faSignOut} /> </button></Link>
                </div>
            </div>
            <div className='row align-items-center m-0 p-4 acciones menu'>
                <div className='col-12 border-top p-2'>
                    Periodo Actual
                    <ul className="nav flex-column align-self-center">

                        <li className="nav-item">
                            <Link className="nav-link active text-light" to="/alumno/kardex">Kardex </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to="/alumno/calificaciones">Calificaciones </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to="/alumno/horario">Horario</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to="/alumno/reinscripcion">Reinscripcion </Link>
                        </li>

                    </ul>
                </div>
                <div className='col-12 border-top p-2'>
                    <ul className="nav flex-column ">
                        ETS
                        <li className="nav-item">
                            <a className="nav-link active text-light" aria-current="page" href={"/#"}>Inscribir</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href={"/#"}>Calificaciones</a>
                        </li>
                    </ul>
                </div>
                <div className='col-12 border-top p-2'>
                    <ul className="nav flex-column ">
                        Saber Adquiridos
                        <li className="nav-item">
                            <a className="nav-link active text-light" aria-current="page" href={"/#"}>Inscribir</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href={"/#"}>Calificaciones</a>
                        </li>
                    </ul>
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
