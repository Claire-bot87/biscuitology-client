import { Pie } from "react-chartjs-2"
import { useState, useEffect } from 'react'
import { biscuitIndex } from '../../services/biscuitService'

import {
Chart as ChartJS,
Tooltip,
Legend,
ArcElement,
} from 'chart.js'


ChartJS.register(
    Tooltip,
    Legend,
    ArcElement,
)


export const PieChart = () => {
    let biscuitArray = []

    const colours = ['rgba(180, 52, 235,.8)','rgba(235, 52, 101,.8)','rgba(235, 198, 52,.8)','rgba(108, 6, 120,.8)']


    const [pieChartData, setPieChartData] = useState({
        labels: [],
        datasets: [],
    })
    


    useEffect(() => {
        biscuitIndex()
            .then((data) => {
                console.log(`DATA FOR PIE CHART ${JSON.stringify(data)}`);
                
                const formattedData = {
                    labels: data.map(item => item.name),
                    datasets: [{
                        label: 'Dunkability Sum',
                        // Calculate the sum of dunkability values for each item
                        data: data.map(item => item.dunkability.reduce((sum, val) => sum + val, 0)), 
                        backgroundColor: data.map((_, index) => colours[index % colours.length]),
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    }],
                };
    
                setPieChartData(formattedData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);


const options = {}
return <Pie options={options} data={pieChartData} />
    
    }

export default PieChart