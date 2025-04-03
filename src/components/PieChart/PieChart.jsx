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
    let biscuitArray = []

    const colours = ['rgba(180, 52, 235,.8)','rgba(235, 52, 101,.8)','rgba(235, 198, 52,.8)','rgba(108, 6, 120,.8)']


    const [pieChartData, setPieChartData] = useState({
        labels: [],
        datasets: [],
    })
    

    const handleSumRatings = async (e) => {
        biscuitIndex()
        .then((data) => {
            biscuitArray =  data
            console.log(`BISCUIT ARRAY IS ${biscuitArray}`)
        })
        }
    
    // useEffect(() => {
    
    //     biscuitIndex()
        
    //     // .then(data => data.json())
    //     .then((data) => {
            
    //         console.log(`DATA FOR PIE CHART ${data}`)
    //         data.map(item => {
    //             let sum = 0; // Initialize sum to 0 for each item
    //             item.dunkability.forEach(el => {
    //                 sum += el; // Add each element in the dunkability array to sum
                    
    //             });
    //             console.log(`SUM ${sum}`); // Log the sum for each item
    //         })
    //         const formattedData = {
                
    //             labels: data.map(item => item.name),
    //             datasets:[{
    //                 label:'your dataset',
    //                 data: data.map(item => item.dunkability)
    //                 ,
                    
    //                 backgroundColor: data.map((_, index) => colours[index % colours.length]),
    //                 // backgroundColor: "rgba(75, 192, 192, 0.2)",
    //                 borderColor: "rgba(75, 192, 192, 1)",
    //                 borderWidth: 1,
    //             },
    //         ],
            
    //       };

    //       setPieChartData(formattedData);
    //     })
    //     .catch((error) => console.error("Error fetching data:", error));
    // }, []);

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