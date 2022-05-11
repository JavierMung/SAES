import React, { useEffect, useState } from 'react'
import '../../style/estilo.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const Horario = () => {
  const cookies = new Cookies();
  const Swal = require('sweetalert2')

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [datosPersonales, setDatosPersonales] = useState({})

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
    try {
      const respuesta = await fetch(`https://saes-escom-app.herokuapp.com/students/enrolled-subjects?userID=${cookies.get('usuarioId')}`)
      const data = await respuesta.json()
      setDatosPersonales(data)
      sethorarioDias(data)

      setLoading(false)
    } catch (err) {
      mostrarAlerta(err)
    }
  }, [])

  const [horarioDias, sethorarioDias] = useState([
    { materia: "Calculo", lunes: "15:00hrs - 16:30hrs", martes: "15:00hrs - 16:30hrs", miercoles: "-", jueves: "15:00hrs - 16:30hrs", viernes: "-" },
    { materia: "Matematicas Discretas", lunes: "13:30hrs - 15:00hrs", martes: "13:30hrs - 15:00hrs", miercoles: "13:30hrs - 15:00hrs", jueves: "-", viernes: "-" },
    { materia: "Fisica", lunes: "-", martes: "16:30hrs - 18:00hrs", miercoles: "-", jueves: "16:30hrs - 18:00hrs", viernes: "13:30hrs - 15:00hrs" },
    { materia: "Programacion", lunes: "-", martes: "18:30hrs-20:00hrs", miercoles: "-", jueves: "18:30hrs-20:00hrs", viernes: "13:00hrs - 14:30hrs" },
    { materia: "Calculo", lunes: "15:00hrs - 16:30hrs", martes: "15:00hrs - 16:30hrs", miercoles: "-", jueves: "15:00hrs - 16:30hrs", viernes: "-" },
    { materia: "Programacion", lunes: "-", martes: "18:30hrs-20:00hrs", miercoles: "-", jueves: "18:30hrs-20:00hrs", viernes: "13:00hrs - 14:30hrs" },
    { materia: "Calculo", lunes: "15:00hrs - 16:30hrs", martes: "15:00hrs - 16:30hrs", miercoles: "-", jueves: "15:00hrs - 16:30hrs", viernes: "-" },

  ])

  /*useEffect(async () => {
   const respuesta = await fetch('')
   const data  = await respuesta.json()
   console.log(data);
   }, [])*/

  return (
    <>
      {loading ? (<>
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>) : (<><div className="card mb-3 bg-light shadow-lg letra" >
        <h1 className="card-title text-start border-bottom pb-3">HORARIO</h1>
        <div className="row">
          <div className="col-md-11 centrar mt-3">

            <div className='align-items-center shadow-sm' style={{ height: "300px", overflowY: "scroll" }}>
              <table className="table g table-hover table-bordered">
                <thead className='tablasColor' style={{ position: "sticky", top: "0" }}>
                  <tr>
                    <th scope="col">Materia</th>
                    <th scope="col">Lunes</th>
                    <th scope="col">Martes</th>
                    <th scope="col">Miercoles</th>
                    <th scope="col">Jueves</th>
                    <th scope="col">Viernes</th>
                  </tr>
                </thead>

                <tbody className=' '>
                  {horarioDias.map((element, index) => {
                    return (
                      <tr key={index}>
                        <th className='' scope='row'> {element.claveMateriaEstudiante.nombreMateria} </th>
                        <th > {element.lunes} </th>
                        <th > {element.martes} </th>
                        <th > {element.miercoles} </th>
                        <th > {element.jueves} </th>
                        <th > {element.viernes} </th>
                      </tr>
                    )
                  }
                  )}
                </tbody>
              </table>
            </div>



          </div>
          <div className=' text-end p-3'>
            <button type="button" className="btn btn-success">Imprimir</button>
          </div>
        </div>
      </div></>)}

    </>
  )
}
