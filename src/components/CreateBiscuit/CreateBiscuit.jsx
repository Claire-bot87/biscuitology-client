import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link} from 'react-router'
import { biscuitCreate } from '../../services/biscuitService'
import { UserContext } from '../../contexts/UserContext'
import './CreateBiscuit.css'
import ImageUpload from '../ImageUpload/ImageUpload'



const CreateBiscuit = () => {

const [formData, setFormData] = useState({
    name:'',
    description:'',
    type:'',
    image:'',
    taste:1,
    texture:2,
    dunkability:4,
    

})

const [isUploading, setIsUploading] = useState(false)

const { user } = useContext(UserContext)

const navigate = useNavigate()

const [errors, setErrors] = useState({})

useEffect(() => {
    if(!user){
      navigate('/signin')
    }
  }, [user, navigate])

const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        console.log('trying to get to BISCUIT SERVICE')
        console.log(formData)
    //   const jsonFormData = JSON.stringify(formData)
    //   console.log(jsonFormData)
const data = await biscuitCreate(formData)
console.log(data)
 navigate(`/biscuits/${data.id}`)
    }catch(error){
        
        console.log(error)
        setErrors(error.response?.data?.errors || {})
    }
}


const handleChange = async (e) => {
setErrors({...errors,[e.target.name]:''})
setFormData({...formData, [e.target.name]:e.target.value})

}

return (
   
    <section className='container'>
    <h1>Create Biscuit</h1>
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
<ImageUpload 
            errors={errors} 
            formData={formData} 
            setFormData={setFormData}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            />
        <div className='button-group'>
            <Link to='/'>Cancel</Link>
            <button type='submit' disabled={formData.name ===''|| isUploading }>Create</button>
</div>
    </form>
    </section>
)
}

export default CreateBiscuit
