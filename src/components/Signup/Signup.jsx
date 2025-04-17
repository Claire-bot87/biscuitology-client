import {useState} from 'react'
import { useNavigate} from 'react-router'
import {signup} from '../../services/userService'
import {UserContext} from '../../contexts/UserContext'


import '../../App.css'
export default function Signup() {

  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
    password_confirmation:''
  })

    const [errors, setErrors] = useState({})

     const navigate = useNavigate()

    const handleSubmit = async (e) => {
       
     e.preventDefault()
        console.log('SIGNING UP')
        console.log((formData))
        try {
            await signup(formData)
           
            navigate('/signin')
        }catch(error){
            console.error(error)
            setErrors(error.response?.data?.errors || {})
        }
    }

    const handleChange = (e) => {
        setErrors({...errors,[e.target.name]:''})
        setFormData({...formData, [e.target.name]: e.target.value})
    }

return(
  <section className='container-box'>
    <section className ='container'>

<h1>Signup</h1>
<p className="signup">You are creating an account</p>

<form onSubmit = {handleSubmit} >

<div className="form-control">
          <label htmlFor="username">Username</label>
          <input className="input"
            type="text"
            name="username" 
            id="username"
            placeholder="Enter a username"
            required
            onChange={handleChange}
          />
          { errors.username && <p className='error-message'>{errors.username}</p> }
        </div>


<div className="form-control">
          <label htmlFor="email">Email</label>
          <input className="input"
            type="email"
            name="email" 
            id="email"
            placeholder="Enter an email address"
            required
            onChange={handleChange}
          />
          { errors.email && <p className='error-message'>{errors.email}</p> }
        </div>

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


        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input className="input"
            type="password"
            name="password_confirmation" 
            id="password_confirmation"
            placeholder="Re-type the password"
            required
            onChange={handleChange}
          />
        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword &&
  <p className='error-message'>Passwords do not match</p>
}
        </div>


<button 
 type='submit'> Submit </button>




</form>




    </section>
    </section>
)

}