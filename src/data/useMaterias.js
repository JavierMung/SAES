import { useState, useEffect } from "react";

export const useMateriasETS = () => {
    const [materias, setMaterias] = useState(
        [
            { nombre: "calculo", turno: "vespertino", profesor: "Alejandro T.", creditos: "4.25", salón: "1002" },
            { nombre: "fisica", turno: "matutino", profesor: "Victoria M.", creditos: "2.5", salón: "2005" },
            { nombre: "Electronica", turno: "matutino", profesor: "Victoria M.", creditos: "4.5", salón: "2005" },
            { nombre: "Electronica", turno: "matutino", profesor: "Victoria M.", creditos: "4.5", salón: "2005" },
            { nombre: "Electronica", turno: "matutino", profesor: "Victoria M.", creditos: "4.5", salón: "2005" },
            { nombre: "Electronica", turno: "matutino", profesor: "Victoria M.", creditos: "4.5", salón: "2005" },
            { nombre: "Electronica", turno: "matutino", profesor: "Victoria M.", creditos: "4.5", salón: "2005" },

        ])

    return materias;
}


export const useMateriasSaberes = () => {
    const [materias, setMaterias] = useState(
        [
        ])

    return materias;
}