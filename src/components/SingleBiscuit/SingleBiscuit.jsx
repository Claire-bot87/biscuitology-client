import { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router'
import { biscuitShow } from '../../services/niscuitService'

const SingleBiscuit = () => {

  // State
const [biscuit, setBiscuit] = useState(null)
const [error, setError] = useState('')


 // Location variables
 const { biscuitId } = useParams()
 const navigate = useNavigate()



 useEffect(() => {

    async function getBiscuit(){
    try {
        const data = await biscuitShow(biscuitId)
        setBiscuit(data)

} catch (error){
setError(error.response.data.message)

    


 }
getBiscuit()
}}, [biscuitId])

    return (
        <></>
)
}


export default SingleBiscuit