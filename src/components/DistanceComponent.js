import React from 'react'

function DistanceComponent({distance}) {
  return (
    <span>{Number(distance).toFixed(2)} km</span>
  )
}

export default DistanceComponent