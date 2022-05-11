import React from 'react'
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export const CalificacionesETS = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const Swal = require('sweetalert2')
  const [loading, setLoading] = useState(true)
  const [calificaciones_ets, setCalificaciones_ets] = useState([

  ]);

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
      const respuesta = await fetch(`https://saes-escom-app.herokuapp.com/students/get-enrolled-ETS?userID=${cookies.get('usuarioId')}`)
      const data = await respuesta.json()
      setCalificaciones_ets(data)
      setLoading(false)
    } catch (err) {
      mostrarAlerta(err)
    }
  }
  }, [])

  return (
    <div className='bg-light rounded-3 shadow-lg letra  ' >
      <div className='mt-2 text-start ms-4 border-bottom pb-3 '><h1>CALIFICACIONES ETS </h1></div>


      <div className='table-responsive  container-lg'>
        <table className="table   table-hover  text-dark">
          <thead className='table tablasColor text-center text-light letra '>
            <tr>
              <th scope="col text_grey">Materia</th>
              <th scope="col text_grey">Calificación</th>
              <th scope="col text_grey">Profesor</th>
            </tr>
          </thead>

          <tbody className='text-center'>
            {calificaciones_ets.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.materiaETS.materiaId.nombreMateria}</td>
                  <td>{element.calificacion}</td>
                  <td>{element.materiaETS.profesor}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}
