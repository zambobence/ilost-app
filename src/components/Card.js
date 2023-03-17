import React from 'react'
import LocationComponent from './LocationComponent'
import DistanceComponent from './DistanceComponent'
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
            <h2><Link to={`/item/${item?.id}`}>{item?.title}</Link></h2>
            <LocationComponent placeData={item?.placeData} coordinates={item?.loc}/>
            <DistanceComponent distance={item?.distance} />
            <DateComponent date={item?.date} />
        </div>
    </div>
  )
}

export default Card