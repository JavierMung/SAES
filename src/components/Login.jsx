import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState, useEffect } from 'react';
import '../style/estilo.css'
import Select from 'react-select'
import Cookies from "universal-cookie";
import { Navigate,NavLink } from "react-router-dom";
const cookies = new Cookies()
function App() {
  const Swal = require('sweetalert2')
  const captcha = useRef(null)
  const inputUser = useRef(null)
  const inputPassword = useRef(null)
  const inputOpciones = useRef(null)
  const [loading, setLoading] = useState(false)
  const [iniciarSesion, setiniciarSesion] = useState(false)
  const [value, setValue] = useState("seleccionar")
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    tipo: "1"
  })


  if (!isNaN(value.username)) {
    alert('No es un número')
  }

  const mostrarAlerta = (err) => {
    Swal.fire({
      title: '¡Error en la peticion!',
      text: err,
      icon: 'error',
      confirmButtonText: 'aceptar',
      confirmButtonColor: "#00b894"
    })
  }
  const faltanCampos = () => {
    Swal.fire({
      title: '¡Error!',
      text: "rellena todos los campos",
      icon: 'warning',
      confirmButtonText: 'aceptar',
      confirmButtonColor: "#00b894"
    })
  }

  const usuarioInvalido = (err) => {
    Swal.fire({
      title: '¡Error!',
      text: "usuario invalido",
      icon: 'warning',
      confirmButtonText: 'aceptar',
      confirmButtonColor: "#00b894"
    })
  }

  useEffect(() => {
    console.log(cookies.get('token'))

    if (iniciarSesion === true) {
      setiniciarSesion(false);
      console.log(iniciarSesion);
    }
  }, [])

  const options = [
    { value: '1', label: 'Estudiante' },
    { value: '2', label: 'Profesor' },
    { value: '3', label: 'Gestión' }
  ]

  const onChange = () => {
    if (captcha.current.getValue()) {

    }
  }

  const eleccion = (value) => {
    setValue(value);
  }

  const cambiarUsuario = (event) => {
    setUsuario({ ...usuario, username: event.target.value })
  }

  const cambiarPassword = async (event) => {
    setUsuario({ ...usuario, password: event.target.value })
  }

  const ingresar = async () => {

    if (usuario.username !== "" && usuario.password !== "" && value.value !== undefined && captcha.current.getValue() !== "") {

      if (isNaN(usuario.username)) {
        usuarioInvalido()
        inputUser.current.classList.add('inputIncorrecto')

      } else {
        inputPassword.current.classList.remove('inputIncorrecto')
        inputUser.current.classList.remove('inputIncorrecto')
        inputPassword.current.classList.add('inputCorrecto')
        inputUser.current.classList.add('inputCorrecto')
        try {
          setLoading(true)
          const res = await fetch('https://saes-escom-app.herokuapp.com/users/login/',
            {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(usuario)
            })

          const dat = await res.json();


          if (!dat.token) {
            mostrarAlerta(dat.error)
            setLoading(false)

          } else {
            cookies.set('usuario', usuario.username, { path: '/' })
            cookies.set('token', dat.token, { path: '/' })
            cookies.set('usuarioId', dat.user_id, { path: '/' })
            setLoading(false)
            setiniciarSesion(true);

          }
        } catch (err) {
          mostrarAlerta(err);
          setLoading(false)

        }

      }
    } else {
      faltanCampos()
      if (usuario.username === "" && usuario.password === "") {
        inputUser.current.classList.add('inputIncorrecto')
        inputPassword.current.classList.add('inputIncorrecto')
        inputPassword.current.classList.add('foc')
        inputUser.current.classList.add('foc')

      } else if (usuario.password === "") {

        inputPassword.current.classList.add('inputIncorrecto')
        inputPassword.current.classList.add('foc')
        inputUser.current.classList.add('foc')

      } else if (usuario.username === "") {
        inputPassword.current.classList.add('inputCorrecto')
        inputUser.current.classList.add('inputIncorrecto')
        inputPassword.current.classList.add('foc')
        inputUser.current.classList.add('foc')

      }
    }
  }



  return (
    <div className="App container "  >

      <div className="row align-items-center caja p-3 ">
        <div className="col-sm-8  col-lg-8 offset-lg-2  offset-sm-2  transparente">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-12 col-lg-10 offset-lg-1 align-self-center contenido shadow-lg bg-body rounded-3 ">
              <div className="row datos text-light rounded letra">
                <div className="logo text-center"></div>
                <div className="col-12 text-center mt-5">
                  <h1 className="login">LOGIN</h1>

                </div>
                <div className="col-12 text-center mb-3 ">ESCOM | <span>IPN</span></div>
              </div>

              <div className="row p-4 letra justify-content-center">



                <div className="col-6 mb-2  align-self-center  ">
                  <div className="form-floating mb-3">
                    <input ref={inputUser} value={usuario.username} className="form-control  cajas  centrar" id="floatingInput1" placeholder="eje. 2019630211" type={"text"} name={"username"} onChange={cambiarUsuario} required></input>
                    <label htmlFor="floatingInput">Usuario</label>
                  </div>
                </div>


                <div className="col-6 mb-2 ">
                  <div className="form-floating mb-3">
                    <input ref={inputPassword} value={usuario.password} className="form-control cajas centrar" id="floatingInput" placeholder="eje. 2019630211" name={"password"} type={"password"} onChange={cambiarPassword}></input>
                    <label htmlFor="floatingInput">Contraseña</label>
                  </div>
                </div>
                <div className="col-12 mb-2">
                </div>
                <div className="col-sm-6 mt-3">
                  <div className="input-group mb-3 centrar ">
                    <Select ref={inputOpciones} placeholder={"seleccionar..."} className=" w-100" options={options} value={value} onChange={eleccion} />
                  </div>
                </div>

                <div className="col-6 text-end mt-3">
                  <button type="button" className="btn btn-primary" onClick={ingresar}>Iniciar Sesion</button>
                  {iniciarSesion ?
                    (
                      value.value === "1" ?
                        (<><Navigate to={"/alumno/inicio"} /></>)
                        : (value.value === "2" ?
                          (<><Navigate to={"/administrador"} /></>)
                          : (<></>))

                    ) : (<></>)}
                </div>
                <div className="col-6 p-1  align-self-center">
                  <div className="centrar ">
                    <ReCAPTCHA
                      ref={captcha}
                      sitekey="6LeEwNYeAAAAAF1T58YYDkAfH1khSkTx4mJ3qKlr"
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="col-12 p-1 align-self-center text-center mt-1">

                  {loading ? (<>
                    <div className="spinner-grow text-primary m-1" role="status">
                      <span className="visually-hidden ">Loading...</span>
                    </div>

                  </>) : (<></>)}

                </div>

                <div className="col-12 p-2 text-start mt-4">
                  <NavLink  className="nav-link text-dark active text-light " to="/recuperarContrasena">¿olvidaste tu contraseña? </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  );
}

export default App;
