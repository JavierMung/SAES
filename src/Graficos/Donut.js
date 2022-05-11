import { useMemo } from 'react';
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
} from 'chart.js';

import { PolarArea } from 'react-chartjs-2'
Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);

const scores = [6, 4, 5, 2, 2, 1]
const options = {
   
    fill: true,
    responsive: true
}
const labels = []
const calificacion = []
export default function Donut(props) {
    const labels = []
    const calificacion = []
    const data = useMemo(() => {
       
        props.semestre.map((materia)=>{
            labels.push(materia.claveMateriaEstudiante.nombreMateria)

            calificacion.push(materia.primerParcial)
        })
        return {
            datasets: [
                
                {
                    label: "Promedio",
                    data: calificacion,
                    tension: 0.5,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 205, 86)',
                        'rgb(201, 203, 207)',
                        'rgb(54, 162, 235)'
                      ]
                }
            ],
           labels,
            label: "semestre"

        }
    })

    return <PolarArea data={data} options={options} />

}