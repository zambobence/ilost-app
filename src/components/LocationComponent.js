import React from 'react'

function LocationComponent({placeData, coordinates}) {
  return (
    <div className='location-container'>
        <i class="fa-solid fa-location-dot"></i>
        <div>
        <p className='location'>
            {placeData?.route} {placeData?.postal_code}{' '}
            {placeData?.locality}
        </p>
        <p className='coordinates'>
            Coords: {Number(coordinates.lat).toFixed(2)}{' '}
            {Number(coordinates.lng).toFixed(2)}
        </p>
        </div>
    </div>
  )
}

export default LocationComponent