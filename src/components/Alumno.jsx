import React from 'react'
import '../style/estilo.css'
import { Outlet } from "react-router-dom";
import { Menu } from './userAlumno/Menu';
import { Horarios } from './userAlumno/Horarios';

export const Alumno = () => {
    return (
        <div className='container-fluid  ' style={{height:"100vh"}} >
            <div className='row h-100' >
                <div className='col-sm-4 col-md-3 col-lg-2  p-0  ' >
                    <div className='informacionPersonal text-light pt-3' style={{ height: "100%" }}>
                        <Menu />
                    </div>
                    </div>
                
                <div className='col-md-9 offset-1 col-lg-8 p-3 text-center'>
                    <div className='row h-100  align-items-center '>
                        <  Outlet />
                    </div>
                </div>
                
            </div>

        </div>
    )
}
