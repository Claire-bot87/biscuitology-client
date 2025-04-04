import {Doughnut} from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import { biscuitIndex } from '../../services/biscuitService'

import {
    Chart as ChartJS,
    ArcElement, 
    Tooltip, 
    Legend
} from 'chart.js'



ChartJS.register(
    ArcElement, 
    Tooltip, 
    Legend
)

function DoughnutChart() {

    const colours = ['rgba(180, 52, 235,.8)','rgba(235, 52, 101,.8)','rgba(235, 198, 52,.8)','rgba(108, 6, 120,.8)']
    
    
        const [doughnutChartData, setDoughnutChartData] = useState({
            labels: [],
            datasets: [],
        });
    
    
    
        useEffect(() => {
            biscuitIndex()
                .then((data) => {
                    console.log(`DATA FOR DOUGHNUT CHART ${JSON.stringify(data)}`);
                    
                    const formattedData = {
                        labels: data.map(item => item.name),
                        datasets: [{
                            label: 'Taste Sum',
                            // Calculate the sum of dunkability values for each item
                            data: data.map(item => item.dunkability.reduce((sum, val) => sum + val, 0)), 
                            backgroundColor: data.map((_, index) => colours[index % colours.length]),
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        }],
                    };
        
                    setDoughnutChartData(formattedData);
                })
                .catch((error) => console.error("Error fetching data:", error));
        }, []);
// const data = {
//     labels: ['Yes','No'],
//     datasets:[{
//         label:'Poll',
//         data:[3,6],
//         backgroundColor:['black','red'],
//         borderColor:['black','red']
//     }]
// }
const options={}

    return (
        <div className="App"style={{padding: '20px', display:'flex',justifyContent:'center', flexDirection:'column',alignItems: 'center' }}>
            <h1 style={{padding: '20px', display:'flex'}}>Taste</h1>
            <div style={{width:'50%', height:'50%',display:'flex',justifyContent:'center' }}>
<Doughnut
data ={doughnutChartData}
options = {options}
></Doughnut>
            </div>
        </div>
    )
}

export default DoughnutChart