import { useContext } from 'react'
import { biscuitDelete } from '../../services/biscuitService'
import { Link, useNavigate, useParams, useLocation } from 'react-router'
import { UserContext } from '../../contexts/UserContext'

import './BiscuitCard.css'



const BiscuitCard = ({ biscuit }) => {

  const location = useLocation()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  // const { biscuitId } = useParams()

const isHomepage = location.pathname === '/'
const isSingleBiscuitPage = location.pathname === `/biscuits/${biscuit.id}`

const handleDelete = async () => {
  const confirmDelete = window.confirm('Are you sure you want to delete this post?')
  if (confirmDelete) {
    try {
      console.log('BISCUIT ID IN HANDLEDELETE' + biscuit.id)
      await biscuitDelete(biscuit.id)
      navigate('/biscuits/')
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // 
    }
  }
}

console.log('BISCUIT OBJECT' + biscuit)
console.log(JSON.stringify(biscuit, null, 2))
console.log('BISCUIT ID' + biscuit.id)
console.log('BISCUIT NAME' + biscuit.name)
console.log(`USER ID ${user?.id}`)
console.log(`BISCUIT USER ID ${biscuit.user}`)
console.log(`BISCUIT TYPE ${biscuit.type}`)

    return (
      
      <article className = 'card'>
      {isSingleBiscuitPage && (
    <div className ='biscuit-card-large'>
<div className= "row">
<img src={biscuit.image} alt={`picture of ${biscuit.name}`}></img>
<div className= "details">
  <h2>{biscuit.name}</h2>
  <h2>{biscuit.description}</h2>
  <h2>{biscuit.type}</h2>
</div>
</div>
</div>
)}
     {isHomepage && (

<div className= "row">
<img src={biscuit.image} alt={`picture of ${biscuit.name}`}></img>
<div className= "details">
  <h2>{biscuit.name}</h2>
</div>
</div>

)}

{user?.id === biscuit.user &&
<>
<button><Link to={`/biscuits/${biscuit.id}/edit`}><svg viewBox="0 0 24 24" stroke="currentColor" fill="none" width="21" height="21"><path d="M 20 9 L 20 16 C 20 18.209 18.209 20 16 20 L 8 20 C 5.791 20 4 18.209 4 16 L 4 8 C 4 5.791 5.791 4 8 4 L 15 4" strokeWidth="1.5"></path><line strokeLinecap="round" x1="10" y1="14" x2="18.5" y2="5.5" strokeWidth="2.25"></line><line strokeLinecap="round" x1="20.5" y1="3.5" x2="21" y2="3" strokeWidth="2.25"></line></svg></Link></button>
           
<button onClick={handleDelete}><svg fill="none" viewBox="0 0 23 25" width="20" height="20"><path fill="hsl(211, 20%, 64.8%)" fillRule="evenodd" clipRule="evenodd" d="M7.416 5H3a1 1 0 0 0 0 2h1.064l.938 14.067A1 1 0 0 0 6 22h12a1 1 0 0 0 .998-.933L19.936 7H21a1 1 0 1 0 0-2h-4.416a5 5 0 0 0-9.168 0Zm2.348 0h4.472c-.55-.614-1.348-1-2.236-1-.888 0-1.687.386-2.236 1Zm6.087 2H6.07l.867 13h10.128l.867-13h-2.036a1 1 0 0 1-.044 0ZM10 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"></path></svg></button>
</>
} 

{isSingleBiscuitPage && (
<Link to="/">Back to all biscuits</Link>
)}
{isHomepage && (
<Link to={`/biscuits/${biscuit.id}`}>view biscuit</Link> )}
      </article>
  
    )
  }
  
  export default BiscuitCard