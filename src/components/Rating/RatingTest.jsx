import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { biscuitUpdate, biscuitShow } from '../../services/biscuitService'
import { UserContext } from '../../contexts/UserContext'


const RateBiscuitTest = () => {

//** Variables
const fields = [
    { name: 'taste', label: 'Taste', min: 1, max: 5 },
    { name: 'texture', label: 'Texture', min: 1, max: 5 },
    { name: 'dunkability', label: 'Dunkability', min: 1, max: 5 },
]

//** Hooks (except useState and useEffect)
const navigate = useNavigate()
const { biscuitId } = useParams()
const { user } = useContext(UserContext)

//** useState
const [errors, setErrors] = useState({})
 
const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    image: '',
    taste: [0],
    texture: [0],
    dunkability: [0],
})

const [submissionData, setSubmissionData] = useState({
    name: '',
    description: '',
    type: '',
    image: '',
    taste: [0],
    texture: [0],
    dunkability: [0],
})

// const [previousData, setPreviousData] = useState({
//     name: '',
//     description: '',
//     type: '',
//     image: '',
//     taste: [0],
//     texture: [0],
//     dunkability: [0],
// })

//** useEffect
useEffect(() => {
if (!user) {
    navigate('/signin')
}
biscuitShow(biscuitId)
            .then((data) => {
                if (data.user !== user.id) {
                    navigate(`/biscuits/${biscuitId}`);
                }
setFormData({
    name: data.name,
    description: data.description,
    type: data.type,
    image: data.image,
    taste: 
    //data.taste ? [data.taste] : 
    [0], // Ensuring it's an array
    texture: 
    //data.texture ? [data.texture] :
    [0],
    dunkability: 
    //data.dunkability ? [data.dunkability] : 
    [0],
})
});
}, [biscuitId, navigate, user])




//** Functions for handling interactions */

const handleChange = (e) => {
 
setErrors({ ...errors, [e.target.name]: '' })
setFormData({
    ...formData,
    [e.target.name]: [Number(e.target.value)] 
})
console.log(`FORM DATA ${formData.name}`)
console.log(`FORM DATA texture ${formData.texture}`)
}


// const handleAddNew = (e) => {
//     biscuitShow(biscuitId)
//     .then((data) => {  
//         console.log(`DATA FOR PREVIOUS DATA ${data.texture}`)
// setPreviousData({
//     name: data.name,
//     description: data.description,
//     type: data.type,
//     image: data.image,
//     taste: data.taste ? [data.taste] : [0], // Ensuring it's an array
//     texture: data.texture ? [data.texture] : [0],
//     dunkability: data.dunkability ? [data.dunkability] : [0],
// })})
// console.log(`PREVIOUS DATA TEXTURE${previousData.texture}`)
//     setSubmissionData({
//         name: formData.name,
//         description: formData.description,
//         type: formData.type,
//         image: formData.image,
//         taste: [...previousData.taste, ...formData.taste], // concatenate the array
//         texture: [...previousData.texture, ...formData.texture], // concatenate the array
//         dunkability: [...previousData.dunkability, ...formData.dunkability], // concatenate the array
//       });
// }

const handleAddNew = (e) => {
    biscuitShow(biscuitId)
    .then((data) => {  
        console.log(`DATA FOR PREVIOUS DATA ${data.texture}`);

        // Update previous data here
        // setPreviousData({
        //     name: data.name,
        //     description: data.description,
        //     type: data.type,
        //     image: data.image,
        //     taste: data.taste ? [data.taste] : [0], // Ensuring it's an array
        //     texture: data.texture ? [data.texture] : [0],
        //     dunkability: data.dunkability ? [data.dunkability] : [0],
        // });

        // Use the 'data' from the promise directly for submission
        setSubmissionData({
            name: formData.name,
            description: formData.description,
            type: formData.type,
            image: formData.image,
            taste: [...(data.taste ? data.taste : [0]), ...formData.taste], // concatenate the array
            texture: [...(data.texture ? data.texture : [0]), ...formData.texture], // concatenate the array
            dunkability: [...(data.dunkability ? data.dunkability : [0]), ...formData.dunkability], // concatenate the array
        });
        console.log(`SUBMISSION DATA TEXTURE ${submissionData.texture}`)
    });
}


const handleSubmit = async (e) => {
    
    // e.preventDefault();
    handleAddNew()
    setTimeout(async () => {
        console.log("Final submission data:", submissionData)
    try {
        
        console.log(`SUBMISSION DATA ${submissionData.taste}`)
                const updatedBiscuit = await biscuitUpdate(biscuitId, submissionData)
                navigate(`/biscuits/${updatedBiscuit.id}`);
            } catch (error) {
                setErrors(error.response?.data?.errors || {});
            }
        }, 500)
        }


    return (
 <section>
            <section className='container'>
                <h1>Rate Biscuit TEST</h1>
                <form onSubmit={handleSubmit}>
                    {/* Dynamic Fields for Taste, Texture, Dunkability */}
                    {fields.map((field) => (
                        <div className='form-control' key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                className='input'
                                type='number'
                                placeholder='Add rating'
                                name={field.name}
                                id={field.name}
                                min={field.min}
                                max={field.max}
                                value={formData[field.name][0]
                                  
                                    || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <div className='button-group'>
                        <Link to='/'>Cancel</Link>
                        <button type='submit' disabled={formData.name === ''}>
                            Submit Rating
                        </button>
                    </div>
                </form>
            </section>
        </section>
    )
}


    export default RateBiscuitTest