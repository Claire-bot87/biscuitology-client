import { Bar } from "react-chartjs-2"
import { useState, useEffect } from 'react'
import { biscuitIndex } from '../../services/biscuitService'


import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend,
} from 'chart.js'
// import { barChartData } from './Data.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title, 
    Tooltip,
    Legend
)


export const BarChart = () => {

    const colours = ['rgba(180, 52, 235,.8)','rgba(235, 52, 101,.8)','rgba(235, 198, 52,.8)','rgba(108, 6, 120,.8)']


    const [barChartData, setBarChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        biscuitIndex()
        // .then(data => data.json())
        .then((data) => {
            console.log(`DATA ${data}`)
            const formattedData = {
                
                labels: data.map(item => item.name),
                datasets:[{
                    label:'your dataset',
                    data: data.map(item => item.texture),
                    backgroundColor: data.map((_, index) => colours[index % colours.length]),
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
          };
          setBarChartData(formattedData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
const options = {}
return <Bar options={options} data={barChartData} />

}


export default BarChart