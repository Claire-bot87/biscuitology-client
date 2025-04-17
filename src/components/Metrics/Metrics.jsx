import BarChart from '../../components/BarChart/BarChart.jsx'
import PieChart from '../../components/PieChart/PieChart.jsx'
import DoughnutChart from '../../components/DoughnutChart/DoughnutChart.jsx'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Metrics.css'

export default function Metrics(){



        const [selectedOption, setSelectedOption] = useState(null);

        const handleSelect = (eventKey) => {
          setSelectedOption(eventKey);
        };
      
        return (
          <div className='metrics-container'>
          
            <p>Biscuitology provides advanced analytics on the core features of a biscuit. Select a metric to take a deep dive into biscuitology.</p>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                {selectedOption || 'Select metric'}
              </Dropdown.Toggle>
      
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Texture">Texture</Dropdown.Item>
                <Dropdown.Item eventKey="Dunkability">Dunkability</Dropdown.Item>
                <Dropdown.Item eventKey="Taste">Taste</Dropdown.Item>              </Dropdown.Menu>
            </Dropdown>
      
            {selectedOption === 'Texture' &&  <BarChart/>}
            {selectedOption === 'Dunkability' &&  <PieChart/>}
            {selectedOption === 'Taste' &&  <DoughnutChart/>}
          </div>
          
        );
      }
        
  
      