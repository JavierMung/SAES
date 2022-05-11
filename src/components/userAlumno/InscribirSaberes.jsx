import React from 'react'
import '../../style/estilo.css'
import { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';
export const InscribirSaberes = () => {
  const Swal = require('sweetalert2')
  const [fecha, setFecha] = useState(new Date)
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true)
  const [materias, setMaterias] = useState([]);
  const [habilitado, setHabilitado] = useState(false)
  const [inscritos, setInscritos] = useState([])
  const [materiasInscritas, setInscribir] = useState([])
  const [inscripcion, setInscripcion] = useState({
    usuario_id: cookies.get('usuarioId'),
    saberes: []
  })
  const [regresar, setRegresar] = useState(false)
  const error = (err) => {
    Swal.fire({
      title: '!Error!',
      text: err,
      icon: 'warning',
      confirmButtonText: 'aceptar',
      confirmButtonColor: "#00b894" 
    })
  }

  const mostrarAlerta = () => {
    Swal.fire({
      title: '!Error!',
      text: "Materia ya inscrita",
      icon: 'warning',
      confirmButtonText: 'aceptar',
      confirmButtonColor: "#00b894" 
    })
  }
  const exito = () => {
    Swal.fire({
      title: '!Exito!',
      text: "ETS INSCRITO CORRECTAMENTE",
      icon: 'success',
      confirmButtonText: 'aceptar',
      confirmButtonColor: "#00b894" 
    })
  }
  const terminarAlerta = () => {
    Swal.fire({
      title: '¿Deseas terminar el proceso de inscripcion?',
      showDenyButton: true,
      confirmButtonText: 'aceptar',
      confirmButtonColor: "#00b894" ,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        terminarProceso()
      } else if (result.isDenied) {
        Swal.fire({
          title: '!Info!',
          text: "Los cambios no fueron guardados",
          icon: 'warning',
          confirmButtonText: 'aceptar',
          confirmButtonColor: "#00b894" 
        })
      }
    })
  }

  useEffect(async () => {
    try {
      fetch('http://127.0.0.1:8000/careers/dates-info/SP/')
        .then((res) => res.json())
        .then(dat => {
          if (dat.concepto === "SP") {
            const fechaInicio = dat.fecha_inicio.split("-")
            const fechaFin = dat.fecha_fin.split("-")     
            const FechaInicio = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2])
            const FechaFin = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2])

            if ((FechaInicio < fecha && FechaFin > fecha) || (FechaInicio.getTime() == fecha && FechaFin.getTime() == fecha)) {

              fetch(`http://127.0.0.1:8000/students/get-previous-knowledge?userID=${cookies.get('usuarioId')}`)
              .then(res=>res.json())
              .then(data=>{
                setMaterias(data)
              })
              .then(()=>{
                fetch(`http://127.0.0.1:8000/students/get-enrolled-previous-knowledge/?userID=${cookies.get('usuarioId')}`)
                .then(res=>res.json())
                .then(data2=>{
                  setInscritos(data2)
                  setLoading(false)

                })
              })
            }else {
              error("No es tiempo de inscribirse")
              setRegresar(true)
            }
          }
        })

    } catch (err) {
      mostrarAlerta(err)
    }
  }, [])

  const terminarProceso = async () => {
    console.log(materiasInscritas)
    if (inscripcion.saberes === []) {
      mostrarAlerta()
    } else {
      try {
        const res = await fetch('http://127.0.0.1:8000/students/register-previous-knowledge/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inscripcion)
        })
        console.log(res);
        const data = res.json()
        if (res.status !== 201) {
          error(res.statusText)
        } else exito(); setHabilitado(true)
      } catch (err) {
        error(err)
      }
    }
  }

  const inscribir = async (element, index) => {
    if (!materiasInscritas.find((materia) => materia.idSaberes === element.idSaberes)) {
      if (!inscritos.find((materia) => materia.materiaSaberes.idSaberes === element.idSaberes)) {

        setInscribir([element, ...materiasInscritas]);
        setInscripcion({ ...inscripcion, saberes: [].concat(element.idSaberes) })
      } else {
        mostrarAlerta()
      }

    } else {
      mostrarAlerta()
    }
  }


  return (
    <>
      <div className="card mb-3 letra shadow-lg" >
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
          {regresar ?
            (<><Navigate to={"/alumno/inicio"} /></>)
            : (<></>)}
          
        </div></>) : (<>
        <div className="row  ">
          <h1 className="card-title text-start border-bottom pb-3">SABERES PREVIAMENTE ADQUIRIDOS </h1>
          <div className="col-md-10 centrar ">
            <div className="card-body">
              <nav className="navbar navbar-light">
                <div className="container-fluid align-items-end justify-content-end me-5 mb-3">
                  <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Buscar materia" aria-label="Search" />
                    <button className="btn btn-outline-primary" type="submit">Buscar</button>
                  </form>
                </div>
              </nav>
              <div className="card-text">
                <div className='container-lg text-dark  rounded '>
                  <h4 className='pt-2'>Inscribe tus examenes</h4>

                  <table className="table  rounded shadow-lg">
                    <thead className='tablasColor'>
                      <tr>
                      <th scope="MateriaSaberes">ID</th>
                        <th scope="MateriaSaberes">Materia</th>
                        <th scope="TurnoSaberes">Turno</th>
                        <th scope="GrupoSaberes">Grupo</th>
                        <th scope="SinodalSaberes">Sinodal</th>
                        <th scope="">Inscribir</th>
                      </tr>
                    </thead>
                    <tbody className='rounded '>
                      {materias.map((element, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{element.idSaberes}</th>
                            <td>{element.materiaId.nombreMateria}</td>
                            <td>{element.turno}</td>
                            <td>{element.salon}</td>
                            <th>{element.profesor}</th>
                            <th scope=""><button className='btn btn-primary' value={index} onClick={() => inscribir(element, index)}> <FontAwesomeIcon className=' mt-1 ' icon={faCirclePlus} /></button></th>
                          </tr>
                        )
                      })}


                    </tbody>
                  </table>
                </div>

                <div className='container-lg '>
                  <h4 className='text-dark pt-2'>Resumen de examenes inscritos</h4>
                  <table className="table shadow-lg">
                    <thead className='tablasColor'>
                      <tr>
                      <th scope="MateriaSaberes">ID</th>
                        <th scope="MateriaSaberes">Materia</th>
                        <th scope="TurnoSaberes">Turno</th>
                        <th scope="GrupoSaberes">Grupo</th>
                        <th scope="SinodalSaberes">Sinodal</th>
                        <th scope="">Inscribir</th>
                      </tr>
                    </thead>
                    <tbody>
                    {materiasInscritas.map((element, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{element.idSaberes}</th>
                          <td>{element.materiaId.nombreMateria}</td>
                          <td>{element.turno}</td>
                          <td>{element.salon}</td>
                          <th>{element.profesor}</th>
                          <th scope=""><button type='button' className='btn btn-danger' value={index} onClick={() => {
                            console.log(inscripcion);
                            const dat = materiasInscritas
                            const dat2 = inscripcion.saberes
                            dat.splice(index, 1);
                            dat2.splice(dat2.indexOf(element.idSaberes), 1);

                     
                            setInscribir([...dat]);
                            setInscripcion({...inscripcion,materias:dat2})
                          }}><FontAwesomeIcon className=' mt-1 align-self-center r' icon={faCircleMinus} /></button></th>
                        </tr>
                      )
                    })}
                  </tbody>
                  </table>
                </div>

                <div className=' text-end'>
                  <button type="button " onClick={terminarAlerta} className="btn btn-danger me-3" disabled={habilitado}>Finalizar inscripcion</button>
                  <button type="button" className="btn btn-success">Imprimir</button></div>
              </div>
            </div>
          </div>
        </div>
        </>)}
      </div>

    </>

  )

}