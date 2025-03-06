import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useState, useEffect } from 'react'
import { biscuitIndex } from '../../services/biscuitService'
import BiscuitCard from '../BiscuitCard/BiscuitCard'
import { Link } from 'react-router'
import '../../App.css'
const AllBiscuits = () => {

const [biscuits, setBiscuits]= useState ({})

const { user } = useContext(UserContext)

useEffect(() => {
biscuitIndex()
 .then(data => setBiscuits(data))
//.then(data => console.log(data))

.catch(err => console.log(err))
}, [])

    return (
        <>
        <div className = 'topdiv' ></div>
   
  <div className = 'biscuitContainer'>


    {biscuits.length > 0 
    ? biscuits.map(biscuit => <BiscuitCard key={biscuit._id} biscuit={biscuit} />)
    : <p>There are no biscuits yet</p>

    }


</div>

{ user &&
<Link className='newPostButton' to='/biscuits/new'></Link>
}
</>

    )


    
}

export default AllBiscuits