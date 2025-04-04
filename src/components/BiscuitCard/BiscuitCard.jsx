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
      console.log('BISCUIT ID IN HANDLE DELETE' + biscuit.id)
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
<div className= "box">
<img src={biscuit.image} alt={`picture of ${biscuit.name}`} className='image' style={{padding: '20px', display:'flex',justifyContent:'center', flexDirection:'column',alignItems: 'center' }}></img>
<div className= "details">
  <h2>{biscuit.name}</h2>
  <h2>description : {biscuit.description}</h2>
  <h2>category : {biscuit.type}</h2>
</div>
</div>
</div>
)}

     {isHomepage && (

<div className= ".box">
<img src={biscuit.image} alt={`picture of ${biscuit.name}`}></img>
<div className= "details">
  <h2>{biscuit.name}</h2>
</div>
</div>

)}

{user?.id === biscuit.user && isSingleBiscuitPage && (
<div className='pencil-garbage-wrapper'>
<div className="garbage" onClick={handleDelete}></div>
<Link to={`/biscuits/${biscuit.id}/edit`}> 
<div className="pencil"></div>
</Link>
<Link to={`/biscuits/${biscuit.id}/rating`}> 
<div className="rating"></div>
</Link>      
{/* <div className="garbage" onClick={handleDelete}></div> */}
</div>
)} 

{isSingleBiscuitPage && (
  
<Link to="/">  
<div className='back'>
</div>
</Link>
 

)}
{isHomepage && (
  <Link to={`/biscuits/${biscuit.id}`}>
  <div className='look'>

</div>
</Link> 
)}
      </article>
  
    )
  }
  
  export default BiscuitCard