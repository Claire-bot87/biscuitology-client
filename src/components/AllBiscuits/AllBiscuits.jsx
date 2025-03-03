import { useState, useEffect } from 'react'
import { biscuitIndex } from '../../services/biscuitService'
import BiscuitCard from '../BiscuitCard/BiscuitCard'
import '../../App.css'
const AllBiscuits = () => {

const [biscuits, setBiscuits]= useState ({})

useEffect(() => {
biscuitIndex()
 .then(data => setBiscuits(data))
//.then(data => console.log(data))

.catch(err => console.log(err))
}, [])

    return (
        <>
        <h1>Biscuits</h1>
<section className = 'feed'>

    {biscuits.length > 0 
    ? biscuits.map(biscuit => <BiscuitCard key={biscuit._id} biscuit={biscuit} />)
    : <p>There are no biscuits yet</p>

    }

</section>
</>

    )


    
}

export default AllBiscuits