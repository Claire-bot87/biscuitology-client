import './App.css';
// src/App.jsx
import { Routes, Route, NavLink } from 'react-router'
import Navbar from './components/Navbar/Navbar.jsx'
import BiscuitCard from './components/BiscuitCard/BiscuitCard.jsx'
import TitleComponent from './components/TitleComponent/TitleComponent.jsx'
import Signup from './components/Signup/Signup.jsx'

const App = () => {
  return (
    <> 
    
    <TitleComponent />
<Navbar />

      <main>
 
      
      <Routes>
      <Route path="/" element={<BiscuitCard />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>

      </main>
  
    </>
  );
};

export default App;