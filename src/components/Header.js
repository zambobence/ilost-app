import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
function Header({ handleSignout, clearCriteria }) {
	const [openSideBar, setOpenSideBar] = useState(false)

	const toggleSideBar = () => {
		setOpenSideBar((prevState) => !prevState)
	}
	return (
		<>
			<header className='Header'>
				<div className='container'>
					<i
						className='fa-solid fa-bars menu-toggler'
						onClick={toggleSideBar}
					></i>
					<p>iLost</p>
				</div>
			</header>
			
		</>
	)
}

export default Header
