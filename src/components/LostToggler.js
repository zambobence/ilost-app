import React from 'react'
import { useContext } from 'react'
import { ItemDataContext } from '../context/ItemDataContext'


function LostToggler() {

    const {lost, toggleLost} = useContext(ItemDataContext)
    return (
        <div className='lost-toggler' onClick={()=> toggleLost()}>
            <label>{lost ? 'lost' : 'found'}</label>
            
                {lost ? <i className="fa-solid fa-toggle-off"></i> : <i className="fa-solid fa-toggle-on"></i> }
            
        </div>
  )
}

export default LostToggler