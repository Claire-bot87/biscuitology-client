import axios from 'axios'

export default function ImageUpload({ errors, formData, setFormData, isUploading, setIsUploading }) {

    const handleUpload = async (e) => {
        setIsUploading(true)
        const imageFile = (e.target.files[0])
    try {
        const { data } = await axios.postForm(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
file: imageFile,
upload_preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

        })
        setFormData ({...formData, image:data.secure_url})
    } catch (error) {
        console.log(error)
    }
    finally{
        setIsUploading(false)
    }
    }
    return(
        <div className='form-control'>
            <label htmlFor='name'>image</label>
            {formData.image && <img src ={formData.image} alt = 'preview of biscuit image' />}
            <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            onChange={handleUpload}
          
            ></input>
    { errors.profileImage && <p className='error-message'>{errors.profileImage}</p>}
           
            </div>
    )
    
}

// return(
//     <div className='form-control'>
//         <label htmlFor='name'>image</label>
//         <textarea
//         name='image'
//         id='image'
//         placeholder='add an image'
//         value={formData.image}
//         onChange={handleChange}
//         required
//         >

//         </textarea>
//         </div>
// )