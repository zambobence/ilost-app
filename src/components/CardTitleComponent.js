import React from 'react'
import { Link } from 'react-router-dom'

function CardTitleComponent({title, id}) {

    let titleToDisplay;

    if (title.length > 30){
        titleToDisplay = title.slice(0, 50) + '...';
    }
    
    else {
        titleToDisplay = title;
    }

    return (
        <h2 className='card-title'><Link to={`/item/${id}`}>{titleToDisplay}</Link></h2>

  )
}

export default CardTitleComponent