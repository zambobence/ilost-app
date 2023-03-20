import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
function Header({ handleSignout, setExpanded, expanded, toggleExpanded }) {

	const { authUser } = useContext(AuthContext)
	const currentUser = authUser?.uid
	
	const interactWithMenu = () => {
		setExpanded(false)
	}
	
	return (
			<header className='Header'>
				<div className='container'>
					<nav className={expanded ? 'open' : null }>
					<p className='logo'>iLost</p>
						<ul className='menu-list'>
							<li className="menu-item" onClick={interactWithMenu}><Link to="/">Home</Link></li>
							<li className="menu-item" onClick={interactWithMenu}><Link to="/browse">Browse</Link></li>
							{currentUser ?
							<>
								<li className="menu-item" onClick={interactWithMenu}><Link to="/additem">Add Item</Link></li>
								<li className="menu-item" onClick={interactWithMenu}><Link to="/profile">Profile</Link></li>
								<li className="menu-item" onClick={interactWithMenu}><Link to="/signin" onClick={handleSignout}>Signout</Link></li>
							</>
							: <>
							<li className="menu-item" onClick={interactWithMenu}><Link to="/login">Login</Link></li>
							<li className="menu-item" onClick={interactWithMenu}><Link to="/register">Register</Link></li>
							</>
						}
						</ul>
					<div className='menu-toggler' onClick={toggleExpanded}>
						<i className="open-menu-toggler fa-solid fa-bars"></i>
						<i className=" close-menu-toggler fa-solid fa-x"></i>
					</div>
					</nav>
				</div>
			</header>
	)
}

export default Header
