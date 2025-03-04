import { Link } from 'react-router'
import { biscuitDelete } from '../../services/biscuitService'
import { useNavigate, useParams } from 'react-router'

import './BiscuitCard.css'



const BiscuitCard = ({ biscuit }) => {

  const navigate = useNavigate()
  const { biscuitId } = useParams()

const handleDelete = async () => {
  const confirmDelete = window.confirm('Are you sure you want to delete this post?')
  if (confirmDelete) {
    try {
      await biscuitDelete(biscuitId)
      navigate('/biscuits/')
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // 
    }
  }
}

console.log(biscuit)

    return (
      <article className = 'card'>
<Link to={`/biscuits/${biscuit._id}`}></Link>
<div className= "row">
<img src={biscuit.image} alt={`picture of ${biscuit.name}`}></img>

<div className= "details">
  <h2>{biscuit.name}</h2>
  <h2>{biscuit.description}</h2>
  <h2>{biscuit.type}</h2>
</div>
</div>
<button onClick={handleDelete}><svg fill="none" viewBox="0 0 23 25" width="20" height="20"><path fill="hsl(211, 20%, 64.8%)" fillRule="evenodd" clipRule="evenodd" d="M7.416 5H3a1 1 0 0 0 0 2h1.064l.938 14.067A1 1 0 0 0 6 22h12a1 1 0 0 0 .998-.933L19.936 7H21a1 1 0 1 0 0-2h-4.416a5 5 0 0 0-9.168 0Zm2.348 0h4.472c-.55-.614-1.348-1-2.236-1-.888 0-1.687.386-2.236 1Zm6.087 2H6.07l.867 13h10.128l.867-13h-2.036a1 1 0 0 1-.044 0ZM10 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Z"></path></svg></button>

      </article>
   
    )
  }
  
  export default BiscuitCard