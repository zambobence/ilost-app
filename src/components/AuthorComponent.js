import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
function AuthorComponent({authorData}) {

    const {authUser} = useContext(AuthContext)
  return (
    <div className='author-component'>
        {authUser?.uid ? 
        <>
        <h3>Author</h3>
        <p><i class="fa-solid fa-user"></i>{authorData?.fname}</p>
        {authorData?.phone && <p><i class="fa-solid fa-phone"></i>{authorData?.email}</p>}
        {authorData?.email && <p><i class="fa-solid fa-at"></i>{authorData?.phone}</p>}
        </> : <>
        <p>Login or register to see the contact data of the author.</p>
        </>}
    </div> 
  )
}

export default AuthorComponent