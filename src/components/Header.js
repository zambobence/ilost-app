import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
function Header({ handleSignout, clearCriteria }) {

	const { authUser } = useContext(AuthContext)
	const currentUser = authUser?.uid
	return (
		<>
			<header className='Header'>
				<div className='container'>
					<nav>
						<ul>
							<li><Link to="/">Home</Link></li>
							<li><Link to="/browse">Browse</Link></li>
							{currentUser ?
							<>
								<li><Link to="/additem">Add Item</Link></li>
								<li><Link to="/profile">Profile</Link></li>
								<li><Link to="/signin" onClick={handleSignout}>Signout</Link></li>
							</>
							: <>
							<li><Link to="/login">Login</Link></li>
							<li><Link to="/register">Register</Link></li>
							</>
						}
						</ul>
					</nav>
				</div>
			</header>
			
		</>
	)
}

export default Header
