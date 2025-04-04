import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { biscuitCreate } from '../../services/biscuitService'
import { UserContext } from '../../contexts/UserContext'
import './CreateBiscuit.css'
import ImageUpload from '../ImageUpload/ImageUpload'

const CreateBiscuit = () => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    image: '',
    taste:[],
    texture:[],
    dunkability:[],

  })

  const [isUploading, setIsUploading] = useState(false)

  const { user } = useContext(UserContext)

  const navigate = useNavigate()

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!user) {
      navigate('/signin')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('trying to get to BISCUIT SERVICE')
      console.log(formData)
      //   const jsonFormData = JSON.stringify(formData)
      //   console.log(jsonFormData)
      const data = await biscuitCreate(formData)
      console.log(data)
      navigate(`/biscuits/${data.id}`)
    } catch (error) {

      console.log(error)
      setErrors(error.response?.data?.errors || {})
    }
  }


  const handleChange = async (e) => {
    setErrors({ ...errors, [e.target.name]: '' })
    setFormData({ ...formData, [e.target.name]: e.target.value })

  }

  // const fields = [
  //     { name: 'taste', label: 'Taste', min: 1, max: 5 },
  //     { name: 'texture', label: 'Texture', min: 1, max: 5 },
  //     { name: 'dunkability', label: 'Dunkability', min: 1, max: 5 },
  //   ]

  return (

    <section className='container'>
      <h1>Create Biscuit</h1>
      <form onSubmit={handleSubmit}>
        {/* name */}
        <div className='form-control'>
          <label htmlFor='name'>name</label>
          <textarea className="input"
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
          <textarea className="input"
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
          <textarea className="input"
            name='type'
            id='type'
            placeholder='add a type'
            value={formData.type}
            onChange={handleChange}
            required
          >

          </textarea>
        </div>


        {/* Dynamic Fields for Taste, Texture, Dunkability
           {fields.map((field) => (
          <div className='form-control' key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input className ="input"
              type='number'
              placeholder='add rating'
              name={field.name}
              id={field.name}
              min={field.min}
              max={field.max}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))} */}

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
          <button type='submit' disabled={formData.name === '' || isUploading}>Create</button>
        </div>
      </form>
    </section>
  )
}

export default CreateBiscuit
