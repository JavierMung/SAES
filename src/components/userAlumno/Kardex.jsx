import React, { useEffect } from 'react'
import { useState } from 'react'
import '../../style/estilo.css'
import LineChart from '../../Graficos/Lineas'
import Donut from '../../Graficos/Donut'
import DonutKardex from '../../Graficos/DonutKardex'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
export const Kardex = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const Swal = require('sweetalert2')
  const [loading, setLoading] = useState(true)
  const [materias, setMaterias] = useState([]);
  const [sumar, setSuma] = useState([])
  const [calificacionesETS, setCalificaciones_ets] = useState([])
  const mostrarAlerta = (err) => {
    Swal.fire({
      title: '¡Error!',
      text: err,
      icon: 'error',
      confirmButtonText: 'aceptar',
      confirmButtonColor: "#00b894" 
    })
  }

  

  useEffect(() => {
    if (!cookies.get('token')) {
      navigate('/');
  }else{
    try {
     
      fetch(`https://saes-escom-app.herokuapp.com/students/get-enrolled-ETS?userID=${cookies.get('usuarioId')}`)
      .then(res=>res.json())
      .then(data1=>{
        setCalificaciones_ets(data1)
      })
   
      fetch(`https://saes-escom-app.herokuapp.com/students/career-info?userID=${cookies.get('usuarioId')}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setMaterias(data)
        })
        .then(() => {
          setLoading(false)
        })

    } catch (err) {
      mostrarAlerta(err)
    }
  }


  }, [])

  return (
    <div className='container-lg card shadow-lg letra'>
      {loading ? (<><div className="spinner-grow text-primary" role="status">
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
        </div></>) : (<>
          <div className='row bg-light shadow-lg ' >
            <h1 className='text-start  align-self-center border-bottom p-3'>KARDEX </h1>
            <div className=' col-lg-10 card text-start centrar  p-5 shadow-sm'>
              <div className='row'>
                <div className='col-lg-5'>
                  <p> <span style={{ color: "black", fontWeight: "bolder" }}> Boleta: </span> 2019630211</p>
                  <p> <span style={{ color: "black", fontWeight: "bolder" }}> Promedio global: </span> {}</p>
                  <p> <span style={{ color: "black", fontWeight: "bolder" }}> Carrera: </span> Ing. Sistemas Compuatcionales</p>
                </div>

              </div>
            </div>
            <div className=' col-lg-10 mt-2 centrar    pt-0' style={{ height: "35vh", overflow: "scroll" }} >
              <table style={{ fontSize: ".8rem" }} className="table shadow-sm  bg-light table-hover  text-dark  ">

                <thead className='tablasColor text-start ' style={{ position: "sticky", top: "0" }}>

                  <tr className=''>
                    <th>ID</th>
                    <th scope="col">Materia</th>
                    <th scope="col">Calificación</th>
                    <th scope="col">Semestre</th>
                    <th scope="col">Fecha</th>
                  </tr>
                </thead>
                <tbody className='table-light text-start'>
                  {materias.map((element, index) => {
                    return (                                           
                    calificacionesETS.map(materia=>{
                      if(materia.materiaETS.materiaId.nombreMateria === element.claveMateriaEstudiante.nombreMateria){
                        if(materia.calificacion>element.calificacion_final){
                          return(
                            <tr key={index}>
                            <td>{element.claveMateriaEstudiante.idMateria}</td>
                            <td style={{ fontWeight: "bold" }}>{element.claveMateriaEstudiante.nombreMateria}</td>
                            <td>{materia.calificacion}</td>
                            <th>{element.claveMateriaEstudiante.semestre}</th>
                            <th>{element.fechaCurso}</th>
                          </tr>)
                        }else{
                          return(
                          <tr key={index}>
                          <td>{element.claveMateriaEstudiante.idMateria}</td>
                          <td style={{ fontWeight: "bold" }}>{element.claveMateriaEstudiante.nombreMateria}</td>
                          <td>{element.calificacion_final}</td>
                          <th>{element.claveMateriaEstudiante.semestre}</th>
                          <th>{element.fechaCurso}</th>
                        </tr>)
                        }
                      }else{
                        return(
                          <tr key={index}>
                          <td>{element.claveMateriaEstudiante.idMateria}</td>
                          <td style={{ fontWeight: "bold" }}>{element.claveMateriaEstudiante.nombreMateria}</td>
                          <td>{element.calificacion_final}</td>
                          <th>{element.claveMateriaEstudiante.semestre}</th>
                          <th>{element.fechaCurso}</th>
                        </tr>)
                      }
                        
                      }
                    )
                    )
                    
                  })}
                </tbody>
              </table>

            </div>


            {/*<div className='col-6 centrar shadow-sm'>
          <LineChart semestre={[1, 2, 3, 4, 5, 6, 7, 8]} calificacion={[7.52, 7.7, 7.5, 6.8, 8.5, 8.2, 7.8, 8.0]} />
          <h2>Promedio por semestre </h2>
            </div>*/}
            <div className=' text-end p-3'>

              <button type="button" className="btn btn-success">Imprimir</button>
            </div>
          </div></>)}

    </div>
  )
}