import React, { useEffect, useState, useRef } from 'react'
import '../../style/estilo.css'
import Cookies from "universal-cookie";
import useDomiiclio from '../../data/useDomicilio';
import { useNavigate } from 'react-router-dom';
export const DatosPersonales = () => {
    const navigate = useNavigate();
    const cookies = new Cookies()
    const Swal = require('sweetalert2')
    const [loading, setLoading] = useState(true)
    const [permitir, setPermitir] = useState(true)
    const [datosPersonales, setDatosPersonales] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        curp: "",
        celular: "",
        fechaNacimiento: "",
        calle: "",
        numeroExterior: "",
        numeroInterior: "",
        colonia: "",
        codigoPostal: "",
        estado: "",
        alcaldia: ""
    })
    const [datosDomicilio, setDatosDomicilio] = useState([])
    const [mostrar,setMostrar] = useState(true)
    const [value, setValue] = useState("")
    const [cp, setCP] = useState(true)
    const inputNumeroE = useRef(null)
    const inputNumeroI = useRef(null)
    const codigoPostal = useRef(null)
    const calle = useRef(null)
    const estado = useRef(null)
    const alcaldia = useRef(null)
    const celular = useRef(null)



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
            text: "Por favor verifica los campos",
            icon: 'error',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894"
        })
    }
    const editadoExistosamente = (err) => {
        Swal.fire({
            title: '¡Hecho!',
            text: "Datos guardados con éxito",
            icon: 'success',
            confirmButtonText: 'aceptar',
            confirmButtonColor: "#00b894"
        })
    }
    useEffect(async () => {
        if (!cookies.get('token')) {
            navigate('/');
        }else{
        try {
            const respuesta = await fetch(`https://saes-escom-app.herokuapp.com/users/update-personal/${cookies.get('usuarioId')}`)
                .then(res => res.json())
                .then(data => {
                    setDatosPersonales(data)
                    setValue(data.colonia)
                })
                .then(() => {
                    setLoading(false)

                })


        } catch (err) {
            mostrarAlerta(err)
        }
    }
    }, [])

    const useBuscar = () => {
        const { data } = useDomiiclio(datosPersonales.codigoPostal)
        console.log(data);
    }

    const editar = async () => {


        console.log(value);

        if (permitir && cp) {

            try {
                /* setDatosPersonales({ ...datosPersonales, estado: datosDomicilio[0].response.estado, alcaldia: datosDomicilio[0].response.municipio })*/

                const respuesta = await fetch(`https://saes-escom-app.herokuapp.com/users/update-personal/${cookies.get('usuarioId')}/`,
                    {
                        method: 'PATCH',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(datosPersonales)
                    }
                )
                editadoExistosamente()
            } catch (err) {
                mostrarAlerta(err)
            }
        } else {
            verificarCampos()
        }


    }


    const handleChange = (event) => {

        if (event.target.name === "numeroExterior") {
            if (isNaN(event.target.value)) {
                inputNumeroE.current.classList.add('inputIncorrecto')
                setPermitir(false)
            } else {
                inputNumeroE.current.classList.remove('inputIncorrecto')
                setPermitir(true)
            }

        } else if (event.target.name === "numeroInterior") {
          
             if(event.target.value===""){
                inputNumeroI.current.classList.remove('inputIncorrecto')
                setPermitir(true)
            }
            else{
                if (isNaN(event.target.value)) {
                    inputNumeroI.current.classList.add('inputIncorrecto')
                    setPermitir(false)
                } else {
                    inputNumeroI.current.classList.remove('inputIncorrecto')
                    setPermitir(true)
                }
            }

        } else if (event.target.name === "codigoPostal") {
            setCP(false)
           
            if (isNaN(event.target.value) ) {
                codigoPostal.current.classList.add('inputIncorrecto')
                setPermitir(false)
            } else {
                console.log(event.target.value.length);
                if (event.target.value.length !== 5 ) {
                    codigoPostal.current.classList.add('inputIncorrecto')
                    setPermitir(false)
                } else {                 
                    codigoPostal.current.classList.remove('inputIncorrecto')
                    setPermitir(true)
                }
            }

        } else if (event.target.name === "celular") {
            if (event.target.value.length !== 10 || event.target.value.substr(0, 2) != '55' || event.target.value.isNaN) {
                celular.current.classList.add('inputIncorrecto')
                setPermitir(false)
            } else {
                celular.current.classList.remove('inputIncorrecto')
                setPermitir(true)
            }
        } else if(event.target.name === "calle"){
            if(event.target.value===""){
                calle.current.classList.add('inputIncorrecto')
                setPermitir(false)
            }
            else{
                calle.current.classList.remove('inputIncorrecto')
                setPermitir(true) 
            }
        }
        setDatosPersonales({
            ...datosPersonales,
            [event.target.name]: event.target.value,
        });

    }


    return (
        <div className='row  m-0 justify-content-center '>
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
                    <div className="card shadow-lg letra" >
                        <div className="card-body text-start">
                            <div className='mt-2 text-start ms-4 '><h1 className='border-bottom pb-3'>DATOS PERSONALES </h1></div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Nombre</span>
                                <input type="text" className="form-control" value={datosPersonales.nombre} aria-label="Username" aria-describedby="basic-addon1" disabled />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Apellido Paterno</span>
                                <input type="text" className="form-control" value={datosPersonales.apellidoPaterno} aria-label="Username" aria-describedby="basic-addon1" disabled />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Apellido Materno</span>
                                <input type="text" className="form-control" value={datosPersonales.apellidoMaterno} aria-label="Username" aria-describedby="basic-addon1" disabled />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">CURP</span>
                                <input type="text" className="form-control" value={datosPersonales.curp} aria-label="Username" aria-describedby="basic-addon1" disabled />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Fecha de nacimiento</span>
                                <input type="date" className="form-control" value={datosPersonales.fechaNacimiento} aria-label="Username" aria-describedby="basic-addon1" disabled />
                            </div>
                            <div ref={codigoPostal} className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">CP</span>
                                <input type="text" name='codigoPostal' className="form-control" value={datosPersonales.codigoPostal} onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                <button className='btn btn-primary' onClick={() => {
                                    if (permitir) {
                                      
                                            fetch(`https://api.copomex.com/query/info_cp/${encodeURI(datosPersonales.codigoPostal)}?token=db62aefa-a4ad-4090-8b3b-e252b817981a`)
                                                .then(res => res.json())
                                                .then(dat => {
                                                    if (dat.error === true) {
                                                        setDatosDomicilio([])                                                       
                                                        mostrarAlerta(dat.error_message)                                                      
                                                    }else{
                                                        console.log(dat);
                                                        setMostrar(false)
                                                        setCP(true)
                                                        setDatosDomicilio(dat)
                                                        setDatosPersonales({ ...datosPersonales, estado: dat[0].response.estado, alcaldia: dat[0].response.municipio })
                                                    }
                                                })
                                                .catch((err) => {
                                                    setDatosDomicilio([])
                                                    mostrarAlerta(err)
                                                })
                                        
                                    }

                                }}>buscar</button>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Estado</span>
                                <input ref={estado} type="text" name='estado' className="form-control" value={datosPersonales.estado} aria-label="Username" aria-describedby="basic-addon1" disabled />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Alcaldía/Municipio</span>
                                <input ref={alcaldia} type="text" name='municipio' className="form-control" value={datosPersonales.alcaldia} aria-label="Username" aria-describedby="basic-addon1" disabled />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Colonia</span>
                                <select value={value} onChange={(event) => {
                                    setValue(event.target.value)
                                    setDatosPersonales({ ...datosPersonales, colonia: event.target.value })
                                }} className="form-select" aria-label="Default select example">
                                    {mostrar?(<option key={1} value={datosPersonales.colonia}>{datosPersonales.colonia}</option>):(<></>)}
                                    {
                                        datosDomicilio.map((colonia, index) => {
                                            return (<option key={index} value={colonia.response.asentamiento} >{colonia.response.asentamiento} </option>)
                                        })

                                    }

                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Calle</span>
                                <input type="text" name='calle' className="form-control" value={datosPersonales.calle} onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div ref={inputNumeroE} className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">N° Exterior</span>
                                <input type="text" name='numeroExterior' className="form-control" value={datosPersonales.numeroExterior} onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div ref={inputNumeroI} className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">N° Interior</span>
                                <input type="text" name='numeroInterior' className="form-control" value={datosPersonales.numeroInterior} onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                            </div>

                            <div ref={celular} className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Número Telefónico 52+ </span>
                                <input type="tel" className="form-control" name='celular' value={datosPersonales.celular} onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <button type="button" onClick={editar} className="btn btn-success">Guardar</button>
                    </div>
                </>)}


            </div>
        </div>
    )
}
