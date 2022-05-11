import React from 'react'
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import '../../style/estilo.css'
import { useNavigate } from 'react-router-dom';


export const CalificacionesSaberes = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const Swal = require('sweetalert2')
    const [loading, setLoading] = useState(true)

    const [calificaciones_saberes, setCalificaciones_saberes] = useState([]);
    const mostrarAlerta = (err) => {
        Swal.fire({
            title: '¡Error!',
            text: err,
            icon: 'error',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894" 
        })
    }
    useEffect(async () => {
        if (!cookies.get('token')) {
            navigate('/');
        }else{
        try {
            const respuesta = await fetch(`https://saes-escom-app.herokuapp.com/students/get-enrolled-previous-knowledge/?userID=${cookies.get('usuarioId')}`)
            const data = await respuesta.json()
            setCalificaciones_saberes(data)
            setLoading(false)
        } catch (err) {
            mostrarAlerta(err)
        }
    }
    }, [])

    




    return (
        <>
            <div className="card shadow-lg  letra " >
                <h1 className="card-title text-start border-bottom p-3">SABERES PREVIAMENTE ADQUIRIDOS </h1>
                <div className="row g-0">
                    <div className="col-md-8  container-lg ">
                        <div className="card-body">
                            <div className="card-text">
                                <div className='table-responsive'>
                                    <h4 className='p-2'>Calificaciones de tus examenes</h4>
                                    <table className="table   table-hover text-dark">
                                        <thead className='tablasColor'>

                                            <tr>
                                                
                                                <th scope="MateriaSaberes">Materia</th>                                  
                                                <th scope="">Calificacion</th>
                                                <th scope="SinodalSaberes">Sinodal</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                            {calificaciones_saberes.map((element, index) => {
                                                return (
                                                    <tr key={index}>
                                                        
                                                        <td>{element.materiaSaberes.materiaId.nombreMateria}</td>
                                                        <td>{element.calificacion}</td>
                                                        <th>{element.materiaSaberes.profesor}</th>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}