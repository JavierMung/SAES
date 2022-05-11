import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../style/estilo.css'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
export const InscribirMaterias = () => {

  
    return (

        <div className='text-light bg_white rounded-3 content_table shadow-lg' >
            <div className='table-responsive '>
                <h1 className="card-title text-start border-bottom pb-3">INSCRIBIR MATERIAS -</h1>


                <div className='content_carrera  justify-content-end me-5 mb-3'>
                    <div className="form-floating me-3  " >
                        <select className="form-select" id="floatingSelect" aria-label="Carrera">

                            <option value="1">Ing. Sistemas computacionales</option>
                            <option value="2">Lic. Ciencia de datos</option>
                            <option value="2">Ing. Inteligencia artificial</option>

                        </select>
                        <label htmlFor="floatingSelect">Carrera</label>
                    </div>

                    <div className="form-floating " style={{ width: "150px" }}>
                        <select className="form-select" id="floatingSelect" aria-label="Plan de estudios">

                            <option value="1">2009</option>
                            <option value="2">2020</option>
                        </select>
                        <label htmlFor="floatingSelect">Plan de estudios</label>
                    </div>
                    <nav className="navbar navbar-light">
                                <div className="container-fluid align-items-end justify-content-end me-5 mb-3">
                                    <form className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Buscar materia" aria-label="Search" />
                                        <button className="btn btn-outline-primary" type="submit">Buscar</button>
                                    </form>
                                </div>
                            </nav>
                </div>
                <div className='container-lg text-dark  rounded '>

                    <h4 className='pt-2'>Materias</h4>

                    <table className="table  rounded shadow-lg">
                        <thead className='tablasColor'>
                            <tr>
                                <th scope="MateriaSaberes">Materia</th>
                                <th scope="SinodalSaberes">Profesor</th>
                                <th scope="TurnoSaberes">Hora</th>
                                <th scope="GrupoSaberes">Cupo</th>
                                <th>Creditos</th>
                                <th scope="">Inscribir</th>
                            </tr>
                        </thead>
                        <tbody className='rounded'>
                            
                            <tr>
                                <th scope="row">Calculo</th>
                                <td>Profesor1</td>
                                <td>16:30 - 18:00</td>
                                <td>12</td>
                                <th>4.2</th>
                                <th scope=""><FontAwesomeIcon className='ms-2 mt-1 ' icon={faCirclePlus} /></th>
                            </tr>
                            <tr>
                                <th scope="row">Ing. Software</th>
                                <td>Profesor2</td>
                                <td>13:30 - 15:00</td>
                                <td>35</td>
                                <th>4.2</th>
                                <th scope=""><FontAwesomeIcon className='ms-2 mt-1 ' icon={faCirclePlus} /></th>
                            </tr>

                        </tbody>
                    </table>
                    
                </div>


                <div className='p-4'>
                    <h4 className='text-dark pt-2'>Materias Inscritas</h4>
                    <table className="table shadow-lg">
                        <thead className='tablasColor'>
                            <tr>
                                <th scope="MateriaSaberes">Materia</th>
                                <th scope="TurnoSaberes">Hora</th>
                                <th scope="GrupoSaberes">Grupo</th>
                                <th scope="SinodalSaberes">Sinodal</th>
                                <th scope="">Inscribir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Fisica</th>
                                <td>Verpertino</td>
                                <td>1SV1</td>
                                <td>Profesor3</td>
                                <th scope=""><FontAwesomeIcon className='ms-2 mt-1 ' icon={faCircleMinus} /></th>
                            </tr>
                        </tbody>
                    </table>
                    <p className='text-end'><h3>Creditos restantes: 35</h3></p>
                </div>


                <div className=' text-end p-3'>
                    <button type="button " className="btn btn-danger me-3">Finalizar inscripcion</button>
                    <button type="button" className="btn btn-success">Imprimir</button></div>
            </div>


        </div>


    )
}
