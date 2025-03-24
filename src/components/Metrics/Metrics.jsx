import BarChart from '../../components/BarChart/BarChart.jsx'
import PieChart from '../../components/PieChart/PieChart.jsx'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Metrics(){



        const [selectedOption, setSelectedOption] = useState(null);

        const handleSelect = (eventKey) => {
          setSelectedOption(eventKey);
        };
      
        return (
          <div>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedOption || 'Dropdown Button'}
              </Dropdown.Toggle>
      
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Texture">Texture</Dropdown.Item>
                <Dropdown.Item eventKey="Dunkability">Dunkability</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
      
            {selectedOption === 'Texture' &&  <BarChart/>}
            {selectedOption === 'Dunkability' &&  <PieChart/>}
          </div>
        );
      }
        
  
      