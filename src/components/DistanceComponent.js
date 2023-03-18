import React from 'react'

function DistanceComponent({distance}) {
  return (
    <span>{Number(distance).toFixed(2)} km from you</span>
  )
}

export default DistanceComponent