import React from 'react'

function ColorComponent({color}) {
  return (
    <p>
        <i aria-label='color' className="fa-solid fa-palette"></i>
        {color}
    </p>
  )
}

export default ColorComponent