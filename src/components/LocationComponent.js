import React from 'react'

function LocationComponent({placeData, coordinates}) {
  return (
    <div className='location-container'>
        <p className='location'>
            {placeData?.route} {placeData?.postal_code}{' '}
            {placeData?.locality}
        </p>
        <p className='coordiantes'>
            Coords: {Number(coordinates.lat).toFixed(2)}{' '}
            {Number(coordinates.lng).toFixed(2)}
        </p>
    </div>
  )
}

export default LocationComponent