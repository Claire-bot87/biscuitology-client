import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signin } from '../../services/userService'
import { setToken } from '../../utils/auth'
import { getUserFromToken } from '../../utils/auth'
import { UserContext } from '../../contexts/UserContext'
import '../../App.css'

export default function Signin(){

  const { setUser } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})


    const navigate = useNavigate();

  // Events
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await signin(formData)
      setToken(data.token)
  
      setUser(getUserFromToken())
      
    navigate('/')
    } catch (error) {
    //   setErrors(error.response.data.errors)
      setErrors(error.message)
    }
  }

  const handleChange = (e) => {
    //console.dir(e.target)
    setErrors({ ...errors, [e.target.name]: '' })
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className='container'>
           
      
      <h1>Sign in</h1>
     
      
      <form onSubmit={handleSubmit}>

        {/* Username */}
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input className="input"
            type="text"
            name="username" 
            id="username"
            placeholder="Enter your username"
            required
            onChange={handleChange}
          />
          { errors.username && <p className='error-message'>{errors.username}</p> }
        </div>

        {/* Password */}
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input className="input"
            type="password"
            name="password" 
            id="password"
            placeholder="Enter a password"
            required
            onChange={handleChange}
          />
          { errors.password && <p className='error-message'>{errors.password}</p> }
        </div>


            <button 
  disabled={!formData.password} 
  type="submit" 
  className="button"
>
  Submit
</button>

      </form>


      <button onClick={() => navigate('/signup')} className='no-account-button'>Don't have an account yet? Sign up here!</button>
    </section>
  )
}