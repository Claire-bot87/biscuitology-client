import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { biscuitShow } from '../../services/biscuitService'
import BiscuitCard from '../BiscuitCard/BiscuitCard'
import './SingleBiscuit.css'

const SingleBiscuit = () => {

  // State
const [biscuit, setBiscuit] = useState(null)
const [error, setError] = useState('')
const [isLoading, setIsLoading] = useState(true)


 // Location variables
 const { biscuitId } = useParams()
 const navigate = useNavigate()


useEffect(() => {
    console.log(`BISCUIT ID = ${biscuitId}`)
    async function getBiscuit(){
      try {
        const data = await biscuitShow(biscuitId)
        console.log(`BISCUIT ID = ${biscuitId}`)
        setBiscuit(data)
      } catch (error) {
        if (error.status === 400) {
          setError('Biscuit not found.')
        } else {
          setError(error.response.data.message)
        }
        
      } finally {
        setIsLoading(false)
      }
    }
    getBiscuit()
  }, [biscuitId])

    return (
        <>
     <div className='space'></div>
 
       { biscuit && <BiscuitCard biscuit={biscuit}/> }
      
        </>
)
}


export default SingleBiscuit