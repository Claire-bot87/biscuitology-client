import './App.css';
// src/App.jsx
import { Routes, Route, NavLink } from 'react-router'
import Navbar from './components/Navbar/Navbar.jsx'
// import BiscuitCard from './components/BiscuitCard/BiscuitCard.jsx'
import TitleComponent from './components/TitleComponent/TitleComponent.jsx'
import Signup from './components/Signup/Signup.jsx'
import Signin from './components/Signin/Signin.jsx'
import AllBiscuits from './components/AllBiscuits/AllBiscuits.jsx'
import SingleBiscuit from './components/SingleBiscuit/SingleBiscuit.jsx'
import CreateBiscuit from './components/CreateBiscuit/CreateBiscuit.jsx'
import UpdateBiscuit from './components/UpdateBiscuit/UpdateBiscuit.jsx'


const App = () => {
  return (
    <> 
    
    <TitleComponent />
<Navbar />

      <main>
 
      
      <Routes>
      {/* <Route path="/" element={<BiscuitCard />} /> */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/biscuits/:biscuitId" element={<SingleBiscuit />}/>
      <Route path="/biscuits/" element={<AllBiscuits />}/>
      <Route path="/biscuits/new" element={<CreateBiscuit />}/>
      <Route path="/biscuits/:biscuitId/edit" element={<UpdateBiscuit />}/>
      </Routes>

      </main>
  
    </>
  );
};

export default App;