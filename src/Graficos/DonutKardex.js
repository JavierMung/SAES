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

import { Radar } from 'react-chartjs-2'
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

const labels = ["Formacion Institucional", "Formacion Cientifica-Básica", "Formación profesional", "Formacion terminal e integración"]
const dat = [7.5,8,6,7]
const options = {
    scales: {
        r: {
            
            suggestedMin: 0,
            suggestedMax: 10
        }
    },
    elements: {
      line: {
        borderWidth: 2
      }
    },
    fill: true,
    responsive: true
}

export default function DonutKardex(props) {
    
    const data = useMemo(() => {
    
        return {
            datasets: [
                
                {
                    label: "Promedio",
                    data: dat,
                    borderColor:[
                        
                        'rgb(75, 192, 192)',
                        'rgb(255, 205, 86)',
                        'rgb(201, 203, 207)',
                        'rgb(54, 162, 235)'
                      ],
                    backgroundColor: [
                        'rgb(255, 99, 132,1)',
         
                      ],
                      pointHitRadius:20,
                      pointBorderWidth:10,
                }
            ],
           labels,
            label: "semestre"

        }
    })

    return <Radar data={data} options={options} />

}