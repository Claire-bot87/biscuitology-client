// src/components/Navbar/Navbar.jsx
// src/components/Navbar/Navbar.jsx
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import {useContext } from'react'
import { removeToken } from '../../utils/auth'
import TitleComponent from '../TitleComponent/TitleComponent'

import './Navbar.css';


const Navbar = () => {

  const { user, setUser } = useContext(UserContext)
  
  const navigate = useNavigate()

  const signOut = () => {
      removeToken()
      setUser(null)
      setTimeout(() => navigate('/'), 100)
  }
    return (
        <nav id="top-navbar">
         <TitleComponent />
          {user 
                ? (
                    <>
                        <button onClick={() => navigate('/metrics')}className='button'> Metrics</button>
                        <button onClick={() => navigate('/pairings')}className='button'> Pairings</button>
                        <button onClick={signOut}className='button'>Sign out</button>
                    </> 
                )
                : (
                    <>
                        <button onClick={() => navigate('/signin')}className='button'>Sign in</button>
                        <button onClick={() => navigate('/signup')}className='button'>Sign up</button>
                    </>
                )
            }
       
        </nav>
      );

};


export default Navbar;
