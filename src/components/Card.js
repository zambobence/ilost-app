import React from 'react'
import LocationComponent from './LocationComponent'
import DistanceComponent from './DistanceComponent'
import TypeComponent from './TypeComponent'
import ColorComponent from './ColorComponent'
import {Link} from 'react-router-dom'
import DateComponent from './DateComponent'
import image_placeholder from '../img/image_placeholder.jpg'
import CardTitleComponent from './CardTitleComponent'
 
function Card({data:item}) {
  return (
    <div className='card'>
        <div className='card-top'>
            <img src={item?.imgUrl || image_placeholder} alt='item' />
        </div>

        <div className='card-bottom'>   
                    
            <CardTitleComponent title={item?.title} id={item?.id}/>
            <div className='card-details'>
            <LocationComponent placeData={item?.placeData} coordinates={item?.loc}/>
            <DistanceComponent distance={item?.distance} />
            <DateComponent date={item?.date} />
            <TypeComponent type={item?.type}/>
            <ColorComponent color={item?.color}/>
            </div>
        </div>
    </div>
  )
}

export default Card