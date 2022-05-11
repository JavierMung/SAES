import React from 'react'
import { Menu } from './userAdmin/Menu'
import {  Outlet } from "react-router-dom";
import '../style/estilo.css'
import { Horarios } from './userAlumno/Horarios';
export const Admin = () => {
  return (
    <div className='container-fluid h-100' >
    <div className='row ' >
        <div className='col-sm-4 col-xl-2  p-0 ' >
            <div className='informacionPersonalAdmin text-light'>
                <Menu/>
            </div>
        </div>
        <div className='col-md-8 col-xl-8  text-center '>
            <div className='row h-100 align-items-center  informacion p-3 shadow-lg'>                
                <Outlet />               
            </div>
        </div>
        <div className='col-md-8 col-xl-2 informacionPersonal informacionPersonalAdmin'>                       
            <Horarios/>
        </div>
    </div>

</div>)
}
