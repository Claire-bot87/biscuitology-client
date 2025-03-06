import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link} from 'react-router'
import { biscuitShow } from '../../services/biscuitService'
import BiscuitCard from '../BiscuitCard/BiscuitCard'

const SingleBiscuit = () => {

  // State
const [biscuit, setBiscuit] = useState(null)
const [error, setError] = useState('')
const [isLoading, setIsLoading] = useState(true)


 // Location variables
 const { biscuitId } = useParams()
 const navigate = useNavigate()



//  useEffect(() => {

//     async function getBiscuit(){
//     try {
//         const data = await biscuitShow(biscuitId)
//         console.log('Fetched biscuit data:', data)
//         setBiscuit(data)

// } catch (error){
// setError(error.response.data.message)

// } finally {
//     setIsLoading(false)


//  }
// getBiscuit()
// }}, [biscuitId])

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
        <section className='back'>

            <button onClick={() => navigate('/')}>
            <svg fill="none" width="24" viewBox="0 0 24 24" height="24" style={{ color: 'rgb(147, 165, 183)', pointerEvents: 'none'}}><path fill="hsl(211, 20%, 64.8%)" fillRule="evenodd" clipRule="evenodd" d="M3 12a1 1 0 0 1 .293-.707l6-6a1 1 0 0 1 1.414 1.414L6.414 11H20a1 1 0 1 1 0 2H6.414l4.293 4.293a1 1 0 0 1-1.414 1.414l-6-6A1 1 0 0 1 3 12Z"></path></svg>
       

            </button>
            <span>Biscuit</span>
        </section>
        <section className='post'>
        {isLoading
          ? <h1>LOADING</h1>
          : error
            ? (
              <>
                <h1>{error}</h1>
                <Link to="/">Back to biscuits</Link>
              </>
            )
       : biscuit && <BiscuitCard biscuit={biscuit} />
        }

    
        </section>
        </>
)
}


export default SingleBiscuit