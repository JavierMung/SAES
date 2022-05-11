import React from 'react'
import { NavLink } from 'react-router-dom'

import '../../style/estilo.css'
export const RecuperarContrasena = () => {
    return (
        <div className='container'>
            <div className='row  '>
                <div className='col-8  align-self-center '>
                    <div class="card shadow-lg  position-absolute top-50 start-50 translate-middle" >
                        <div class="card-body">
                            <h5 class="card-title">Recuperar contraseña</h5>
                            <p class="card-text">Contraseña</p>
                            <input type={"text"} />
                            <p class="card-text">Confirmar contraseña</p>
                            <input type={"text"} />
                            <br/>
                            <div className='text-end'><NavLink className="me-2" to="/"><button type="button" class="btn btn-primary mt-2  ">regresar</button></NavLink><button type="button" class="btn btn-success mt-2  ">Enviar</button></div>
                            
                           

                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
