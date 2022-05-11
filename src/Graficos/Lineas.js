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

import { Line } from 'react-chartjs-2'
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
    scales:{
        y:{
            min:5,
            max:10
        }
    },
    fill: true,
    responsive: true
}

export default function LineChart(props) {

    const data = useMemo(() => {
        console.log(props.semestre);
        const labels = props.semestre
        return {
            datasets: [
                {
                    label: "Promedio",
                    data: props.calificacion,
                    tension: 0.1,
                    pointBorderWidth:8,
                   
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 205, 86)',
                        'rgb(201, 203, 207)',
                        'rgb(54, 162, 235)'
                      ],
                      pointHitRadius:20,
                    backgroundColor: "rgba(27,74,159,0.3)",
                }
            ],
           labels,

        }
    })

    return <Line data={data} options={options} />

}

