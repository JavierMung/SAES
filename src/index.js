import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./components/Login";
import { Horario } from './components/userAlumno/Horario';

import { Alumno } from './components/Alumno';
import { Kardex } from './components/userAlumno/Kardex';
import { Calificaciones } from './components/userAlumno/Calificaciones'
import { Reinscripcion } from './components/userAlumno/Reinscripcion'
import { Horarios } from './components/userAlumno/Horarios';
import { Admin } from './components/Admin';
import { DatosPersonales } from './components/userAlumno/DatosPersonales';
import { DatosMedicos } from './components/userAlumno/DatosMedicos';
import { InscribirSaberes } from './components/userAlumno/InscribirSaberes';
import { CalificacionesSaberes } from './components/userAlumno/CalificacionesSaberes';
import { InscribirETS } from './components/userAlumno/InscribirETS';
import { CalificacionesETS } from './components/userAlumno/CalificacionesETS';
import { RecuperarContrasena } from './components/RecuperarContrasena';
import { InscribirMaterias } from './components/userAlumno/InscribirMaterias';
import { Inicio } from './components/Inicio';
import { DatosCuenta } from './components/userAlumno/DatosCuenta'
import CambiarContrasena from './components/CambiarContrasena';
ReactDOM.render(
  <BrowserRouter>
    <Routes>


      <Route path='alumno' element={<Alumno />}>
        <Route index path='horario' element={<Horario />} />
        <Route index path='datosCuenta' element={<DatosCuenta />} />
        <Route index path='kardex' element={<Kardex />} />
        <Route path='calificaciones' element={<Calificaciones />} />
        <Route path='reinscripcion' element={<Reinscripcion />} />
        <Route path='horarios' element={<Horarios />} />
        <Route path='datospersonales' element={<DatosPersonales />} />
        <Route path='datosmedicos' element={<DatosMedicos />} />
        <Route path='inscribirSaberes' element={<InscribirSaberes />} />
        <Route path='calificacionesSaberes' element={<CalificacionesSaberes />} />
        <Route path='inscribirETS' element={<InscribirETS />} />
        <Route path='calificacionesETS' element={<CalificacionesETS />} />
        <Route path='inscribirMaterias' element={<InscribirMaterias />} />
        <Route path="inicio" element={<Inicio />} />
      </Route>



      <Route path='administrador' element={<Admin />}>
        <Route index path='horario' element={<Horario />} />
        <Route path='kardex' element={<Kardex />} />
        <Route path='calificaciones' element={<Calificaciones />} />
        <Route path='reinscripcion' element={<Reinscripcion />} />
      </Route>

      
      <Route path='cambiarContrasena' element={<CambiarContrasena />} />
      <Route path='recuperarContrasena' element={<RecuperarContrasena />} />

      <Route path="/" element={<Login />} />
      <Route/>
      <Route path="*" element={<>Not found</>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

