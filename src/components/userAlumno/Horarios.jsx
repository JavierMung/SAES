import React from 'react'
import { NavLink } from 'react-router-dom'
import img from '../../img/ipn.png'

export const Horarios = () => {
    const navlink = ({ isActive }) => {
        return ({
            fontWeight: isActive ? 'bold' : 'normal',
            backgroundColor: isActive ? 'rgb(15, 72, 226)' : '',
            borderRadius: isActive ? '15px' : '0px'
        })
    }
    return (

        <div className=' '>
            <h5>Siguiente periodo</h5>
        </div>



    )
}
