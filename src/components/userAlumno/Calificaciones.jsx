import React, { useEffect, useState } from 'react'
import Donut from '../../Graficos/Donut';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


export const Calificaciones = () => {
  const cookies = new Cookies();
  const Swal = require('sweetalert2')
  const [loading, setLoading] = useState(true)


  const [materias, setMaterias] = useState([]);

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
      const respuesta = await fetch(`https://saes-escom-app.herokuapp.com/students/enrolled-subjects?userID=${cookies.get('usuarioId')}`)
      const data = await respuesta.json()
      console.log(data);
      setMaterias(data)
      setLoading(false)
    } catch (err) {
      mostrarAlerta(err)
    }
  }
  }, [])





  return (
    <div className='bg-light rounded-3 bg_white shadow-lg letra container-lg' >
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
          <h1 className='text-start border-bottom p-3'>CALIFICACIONES</h1>
          <div className='row justify-content-center'>
            <div className='col-lg-4 '>

              {/*<Donut semestre={materias} calificacion={[5, 8, 9, 5, 6]} />*/}
            </div>
          </div>
          <div className='table-responsive container-lg'>
            <div style={{ backgroundColor: "transparent", overflowY: "scroll" }}>
              <table className="table  rounded shadow-sm">
                <thead className='tablasColor ' style={{ position: "sticky", top: "0" }}>
                  <tr>
                    <th scope="col ">Materia</th>
                    <th scope="col ">1er Parcial</th>
                    <th scope="col ">2o Parcial</th>
                    <th scope="col ">3er Parcial</th>
                    <th scope="col ">Ext</th>
                    <th scope="col ">Final</th>
                  </tr>
                </thead>

                <tbody className='table-striped rounded '>
                  {materias.map((element, index) => {
                    return (
                      <tr key={index}>
                        <th scope='row'> {element.claveMateriaEstudiante.nombreMateria} </th>
                        <th> {element.calificacion_primer_parcial} </th>
                        <th> {element.calificacion_segundo_parcial} </th>
                        <th> {element.calificacion_tercer_parcial} </th>
                        <th> {element.calificacion_extraordinaria} </th>
                        <th> {element.calificacion_final} </th>
                      </tr>
                    )
                  }
                  )}
                </tbody>
              </table>


            </div>
          </div>
        </>)
      }


    </div>
  )
}
