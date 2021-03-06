import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../style/estilo.css'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
export const InscribirETS = () => {

  const navigate = useNavigate();
  const Swal = require('sweetalert2')
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true)
  const [materias, setMaterias] = useState([]);
  const [regresar, setRegresar] = useState(false)
  const [habilitado, setHabilitado] = useState(false)
  const [inscritos, setInscritos] = useState([])
  const [materiasInscritas, setInscribir] = useState([])
  const [inscripcion, setInscripcion] = useState({
    usuario_id: cookies.get('usuarioId'),
    materias: []
  })
  const [fecha, setFecha] = useState(new Date)
  const error = (err) => {
    Swal.fire({
      title: '¡Error!',
      text: err,
      icon: 'warning',
      confirmButtonText: 'aceptar',
      confirmButtonColor: "#00b894"
    })
  }

  const mostrarAlerta = () => {
    Swal.fire({
      title: '¡Error!',
      text: "Materia ya inscrita",
      icon: 'warning',
      confirmButtonText: 'aceptar',
      confirmButtonColor: "#00b894"
    })
  }
  const exito = () => {
    Swal.fire({
      title: '¡Éxito!',
      text: "Inscrito correctamente",
      icon: 'success',
      confirmButtonText: 'aceptar',
      confirmButtonColor: "#00b894"
    })
  }
  const terminarAlerta = () => {
    Swal.fire({
      title: '¿Deseas terminar el proceso de inscripción?',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#00b894',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        terminarProceso()
      } else if (result.isDenied) {
        Swal.fire({
          title: '¡Hecho!',
          text: "Los cambios no fueron guardados",
          icon: 'warning',
          confirmButtonText: 'aceptar',
          confirmButtonColor: "#00b894"
        })
      }
    })
  }

  useEffect(async () => {
    if (!cookies.get('token')) {
      navigate('/');
    } else {
      try {
        fetch('https://saes-escom-app.herokuapp.com/careers/dates-info/ETS/')
          .then((res) => res.json())
          .then(dat => {
            if (dat.concepto === "ETS") {
              const fechaInicio = dat.fecha_inicio.split("-")
              const fechaFin = dat.fecha_fin.split("-")
              const FechaInicio = new Date(fechaInicio[0], fechaInicio[1] - 1, fechaInicio[2])
              const FechaFin = new Date(fechaFin[0], fechaFin[1] - 1, fechaFin[2])

              if ((FechaInicio < fecha && FechaFin > fecha) || (FechaInicio.getTime() == fecha && FechaFin.getTime() == fecha)) {
                fetch(`https://saes-escom-app.herokuapp.com/students/get-ETS?userID=${cookies.get('usuarioId')}`)
                  .then(res => res.json())
                  .then(data => {
                    setMaterias(data)
                    fetch(`https://saes-escom-app.herokuapp.com/students/get-enrolled-ETS?userID=${cookies.get('usuarioId')}`)
                      .then(res => res.json())
                      .then(data2 => {
                        setInscritos(data2)
                        setLoading(false)
                      })
                  })

              } else {
                error("No es tiempo de inscribirse")
                setRegresar(true)
              }

            }

          })

      } catch (err) {
        mostrarAlerta(err)
      }
    }
  }, [])

  const terminarProceso = async () => {
    if (inscripcion.materias === []) {
      mostrarAlerta()
    } else {
      try {
        const res = await fetch('https://saes-escom-app.herokuapp.com/students/register-ETS/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inscripcion)
        })
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
    console.log(element);
    if (!materiasInscritas.find((materia) => materia.materiaId.nombreMateria === element.materiaId.nombreMateria)) {
      if (!inscritos.find((materia) => (materia.materiaETS.idETS === element.idETS || materia.materiaETS.materiaId.nombreMateria === element.materiaId.nombreMateria))) {
        setInscribir([element, ...materiasInscritas]);
        let a = inscripcion.materias
        a.push(element.idETS)
        setInscripcion({ ...inscripcion, materias: a })
      } else {
        mostrarAlerta()
      }

    } else {
      mostrarAlerta()
    }
  }



  return (
    <div className=' bg-light text-light bg_white rounded-3 content_table shadow-lg' >
      {loading ? (
        <>
          <Loading/>
          {regresar ?
            (<><Navigate to={"/alumno/inicio"} /></>)
            : (<></>)}
        </>) : (<>
          <div className='table-responsive letra '>
            <h1 className="card-title text-start border-bottom pb-3 ">INSCRIBIR ETS </h1>
            <div className='container-lg text-dark  rounded  '>

              <h4 className='pt-2 letra' >Inscribe tus exámenes</h4>
              <div style={{ backgroundColor: "transparent", height: "30vh", overflowY: "scroll" }}>
                <table className="table  rounded shadow-sm letra">
                  <thead className='tablasColor' style={{ position: "sticky", top: "0" }}>
                    <tr>
                      <th>ID</th>
                      <th scope="MateriaSaberes">Materia</th>
                      <th scope="TurnoSaberes">Turno</th>
                      <th scope="GrupoSaberes">Salón</th>
                      <th scope="SinodalSaberes">Sinodal</th>
                      <th scope="">Inscribir</th>
                    </tr>
                  </thead>
                  <tbody className='rounded '>
                    {materias.map((element, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{element.idETS}</th>
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
            </div>


            <div className='container-lg p-4 '>
              <h4 className='text-dark pt-2 letra'>Resumen de exámenes inscritos</h4>
              <div className='shadow-sm' style={{ backgroundColor: "transparent", height: "30vh", overflowY: "scroll" }} >
                <table className="table table-hover">
                  <thead className='tablasColor'>
                    <tr>
                      <th scope="MateriaSaberes">ID</th>
                      <th scope="MateriaSaberes">Materia</th>
                      <th scope="TurnoSaberes">Turno</th>
                      <th scope="SinodalSaberes">Salón</th>
                      <th scope="SinodalSaberes">Sinodal</th>
                      <th scope="">Inscribir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materiasInscritas.map((element, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{element.idETS}</th>
                          <td>{element.materiaId.nombreMateria}</td>
                          <td>{element.turno}</td>
                          <td>{element.salon}</td>
                          <th>{element.profesor}</th>
                          <th scope=""><button type='button' className='btn btn-danger' value={index} onClick={() => {
                            const dat = materiasInscritas
                            const dat2 = inscripcion.materias

                            dat.splice(index, 1);
                            dat2.splice(dat2.indexOf(element.idETS), 1);


                            setInscribir([...dat]);
                            setInscripcion({ ...inscripcion, materias: dat2 })
                          }}><FontAwesomeIcon className=' mt-1 align-self-center r' icon={faCircleMinus} /></button></th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>



            <div className='  text-end p-3 '>
              <button type="button " onClick={terminarAlerta} className="btn btn-danger me-3" disabled={habilitado}>Finalizar inscripción</button>
              <button type="button" className="btn btn-success" disabled>Imprimir</button>
            </div>
          </div></>)}



    </div>
  )
}
