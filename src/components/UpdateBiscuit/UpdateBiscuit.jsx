import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link} from 'react-router'
import { biscuitUpdate, biscuitShow } from '../../services/biscuitService'
import { UserContext } from '../../contexts/UserContext'
import './UpdateBiscuit.css'

const UpdateBiscuit = () => {


const { user } = useContext(UserContext)

const [formData, setFormData] = useState({
    name:'',
    description:'',
    type:'',
    image:'',
    taste:1,
    texture:2,
    dunkability:4

})
const [errors, setErrors] = useState({})
const navigate = useNavigate()
const { biscuitId } = useParams()

useEffect(() => {
    console.log('THIS IS THE USER' + user)
    console.log(JSON.stringify(user, null, 2))
    if (!user) {
        navigate('/signin')
      }
     
    biscuitShow(biscuitId)
   
    .then(data => {
        if(data.user !== user.id){
            navigate(`/biscuits/${biscuitId}`)
          }
            setFormData(data)
    })
}, [biscuitId, navigate, user])

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const updatedBiscuit = await biscuitUpdate(biscuitId, formData)
        console.log(updatedBiscuit)
        navigate(`/biscuits/${updatedBiscuit.id}`)
    }catch(error){
        setErrors(error.response?.data?.errors || {})
    }

}



const handleChange = async (e) => {
    setErrors({...errors,[e.target.name]:''})
    setFormData({...formData, [e.target.name]:e.target.value})
    
    }

return (

  
<section>
  
    <section className='container'>
      <h1>Make an edit</h1>
      <form onSubmit={handleSubmit}>

    {/* name */}
    <div className='form-control'>
        <label htmlFor='name'>name</label>
        <textarea
        name='name'
        id='name'
        placeholder='add biscuit name'
        value={formData.name}
        onChange={handleChange}
        required
        >

        </textarea>
        </div>

{/* description */}
        <div className='form-control'>
        <label htmlFor='name'>description</label>
        <textarea
        name='description'
        id='description'
        placeholder='add add description'
        value={formData.description}
        onChange={handleChange}
        required
        >

        </textarea>
        </div>




        {/* type */}
        <div className='form-control'>
        <label htmlFor='name'>type</label>
        <textarea
        name='type'
        id='type'
        placeholder='add a type'
        value={formData.type}
        onChange={handleChange}
        required
        >

        </textarea>
        </div>

{/* image */}
<div className='form-control'>
        <label htmlFor='name'>image</label>
        <textarea
        name='image'
        id='image'
        placeholder='add an image'
        value={formData.image}
        onChange={handleChange}
        required
        >

        </textarea>
        </div>



        <div className="button-group">
          <Link to="/">Cancel</Link>
          <button type="submit" disabled={formData.content === ''}>Confirm</button>
        </div>
      </form>
    </section>



    </section>

)

}


export default UpdateBiscuit