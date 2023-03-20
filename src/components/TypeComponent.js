import React from 'react'

function TypeComponent({type}) {
  return (
    <p>
        <i aria-label='type' className="fa-solid fa-question"></i>{type}
    </p>
  )
}

export default TypeComponent