import React from 'react'

function Modal({src, openModal, setOpenModal}) {
  return (
    <div className={openModal ? 'modal opened' : 'modal'}>
        <i class="fa-solid fa-x close" onClick={()=> setOpenModal(false)}></i>
        <img src={src} alt='modal-img' className='modal-img'/>
    </div>
  )
}

export default Modal