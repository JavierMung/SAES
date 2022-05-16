import React, { useEffect, useState, useRef } from 'react'
import '../../style/estilo.css'
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
export const DatosMedicos = () => {
    const navigate = useNavigate();
    const cookies = new Cookies()
    const Swal = require('sweetalert2')
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(
        {
            numeroSS: "",
            peso: "",
            estatura: "",
            tipoSangre: "",
            institucionMedica: "",
            enfermedades: "",
            problemasFisicos: "",
            alergias: "",
            medicamentos: ""
        });
    const mostrarAlerta = (err) => {
        Swal.fire({
            title: '¡Error!',
            text: err,
            icon: 'error',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894" 
        })
    }
    const verificarCampos = (err) => {
        Swal.fire({
            title: '¡Error!',
            text: "por favor verifica los campos",
            icon: 'error',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894" 
        })
    }
    const editadoExistosamente = (err) => {
        Swal.fire({
            title: '¡Hecho!',
            text: "editado correctamente",
            icon: 'success',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894" 
        })
    }
    const handleChange = (event) => {

        setData({
            ...data,
            [event.target.name]: event.target.value,
        });

    }

    const editar = async () => {
       

            try {
                const respuesta = await fetch(`https://saes-escom-app.herokuapp.com/users/update-medical/${cookies.get('usuarioId')}/`,
                    {
                        method: 'PATCH',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data)
                    }
                )
                editadoExistosamente()
            } catch (err) {
                mostrarAlerta(err)
            }
        


    }

    useEffect(async () => {
        if (!cookies.get('token')) {
            navigate('/');
        }else{
        try {
            const respuesta = await fetch(`https://saes-escom-app.herokuapp.com/users/update-medical/${cookies.get('usuarioId')}`)

            const data = await respuesta.json()
            setData({
                numeroSS: data.numeroSS,
                peso: data.peso,
                estatura: data.estatura,
                tipoSangre: data.tipoSangre,
                institucionMedica: data.institucionMedica,
                enfermedades: data.enfermedades,
                problemasFisicos: data.problemasFisicos,
                alergias: data.alergias,
                medicamentos: data.medicamentos,

            })
            setLoading(false)
        } catch (err) {
            mostrarAlerta(err)
        }
    }
    }, [])

    return (
        <div className='row   m-0 justify-content-center '>

            <div className='col-10 align mt-2'>
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
                </>) : (<>
                    <div className="card shadow-lg letra " >
                        <div className='mt-3 text-start ms-4 border-bottom pb-2  '><h1>DATOS MÉDICOS </h1></div>
                        <div className="card-body text-start ">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Peso</span>
                                <input type="text" className="form-control" placeholder="Username" value={data.peso} aria-label="Username" aria-describedby="basic-addon1" readOnly />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Estatura</span>
                                <input type="text" className="form-control" placeholder="Username" value={data.estatura} aria-label="Username" aria-describedby="basic-addon1" readOnly />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Institución Médica</span>
                                <input type="text" className="form-control" placeholder="Username" value={data.institucionMedica} aria-label="Username" aria-describedby="basic-addon1" readOnly />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Tipo de Sangre</span>
                                <input type="text" className="form-control" placeholder="Username" value={data.tipoSangre} aria-label="Username" aria-describedby="basic-addon1" readOnly />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Número de Seguro Social</span>
                                <input name='numeroSS' type="text" className="form-control" value={data.numeroSS} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" readOnly />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Alergias</span>
                                <input name='alergias' type="text" className="form-control" placeholder="Username" value={data.alergias} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Medicamentos</span>
                                <input name='medicamentos' type="text" className="form-control" placeholder="Username" value={data.medicamentos} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Enfermedades</span>
                                <input name='enfermedades' type="text" className="form-control" placeholder="Username" value={data.enfermedades} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Problemas Físicos</span>
                                <input name='problemasFisicos' type="text" className="form-control" placeholder="Username" value={data.problemasFisicos} aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} />
                            </div>
                        </div>
                        <button onClick={editar} type="button" className="btn btn-success">Guardar</button>
                    </div>
                </>)
                }
            </div>

        </div>
    )
}
