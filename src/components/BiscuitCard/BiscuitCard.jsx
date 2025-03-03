import { Link } from 'react-router'


import './BiscuitCard.css'



const BiscuitCard = ({biscuit}) => {



    return (
      <article className = 'card'>
<Link to={`/biscuits/${biscuit._id}`}></Link>
<div className= "row">
<img src={biscuit.image} alt={`picture of ${biscuit.name}`}></img>

<div className= "details">
  <h2>{biscuit.description}</h2>
</div>
</div>


      </article>
   
    )
  }
  
  export default BiscuitCard