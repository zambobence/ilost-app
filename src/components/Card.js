import React from 'react'
import LocationComponent from './LocationComponent'
import DistanceComponent from './DistanceComponent'
import TypeComponent from './TypeComponent'
import ColorComponent from './ColorComponent'
import {Link} from 'react-router-dom'
import DateComponent from './DateComponent'
 
function Card({data:item}) {
    console.log(item)
  return (
    <div className='card'>
        <div className='card-top'>
            <img src={item?.imgUrl || 'https://via.placeholder.com/150'} alt='item' />
        </div>

        <div className='card-bottom'>   
                    
            <h2 className='card-title'><Link to={`/item/${item?.id}`}>{item?.title}</Link></h2>
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