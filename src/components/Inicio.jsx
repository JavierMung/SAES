import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../src/style/estilo.css'
import Cookies from 'universal-cookie';

import imgEscom from '../img/escom.jpg';
import escudo from '../img/escom.png';
import imgEscom1 from '../img/ESCOM1.jpg';
import imgEscom2 from '../img/ESCOM2.jpg';
import imgEscom3 from '../img/ESCOM3.jpg';
import imgEscom4 from '../img/ESCOM4.jpg';
import imgEscom5 from '../img/ESCOM5.png';
import imgEscom6 from '../img/ESCOM6.jpg';
import imgEscom7 from '../img/ESCOM7.jpg';
import imgEscom8 from '../img/ESCOM8.jpg';
import imgEscom9 from '../img/ESCOM9.jpg';
import imgEscom10 from '../img/ESCOM10.jpg';

export const Inicio = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [datos, setDatos] = useState()

    useEffect(() => {
        if (!cookies.get('token')) {
            navigate('/');
        }
    }, [])
    return (
        <div className='container '>
            <div id="carouselExampleFade" className="carousel slide carousel-fade shadow-lg border-rounded" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={imgEscom1} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>BIENVENIDO AL NUEVO SISTEMA DE ADMINISTRACION ESCOLAR</h5>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={imgEscom4} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>BIENVENIDO AL NUEVO SISTEMA DE ADMINISTRACION ESCOLAR</h5>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={imgEscom3} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>BIENVENIDO AL NUEVO SISTEMA DE ADMINISTRACION ESCOLAR</h5>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
