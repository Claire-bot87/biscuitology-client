import { Pie } from "react-chartjs-2"
import { useState, useEffect } from 'react'
import { biscuitIndex } from '../../services/biscuitService'

import {
Chart as ChartJS,
Tooltip,
Legend,
ArcElement,
} from 'chart.js'
// import { pieChartData } from './Data.js'

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement,
)


export const PieChart = () => {


    const colours = ['rgba(180, 52, 235,.8)','rgba(235, 52, 101,.8)','rgba(235, 198, 52,.8)','rgba(108, 6, 120,.8)']


    const [pieChartData, setPieChartData] = useState({
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
                    data: data.map(item => item.dunkability),
                    backgroundColor: data.map((_, index) => colours[index % colours.length]),
                    // backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
          };
          setPieChartData(formattedData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);



const options = {}
return <Pie options={options} data={pieChartData} />
    
    }

export default PieChart