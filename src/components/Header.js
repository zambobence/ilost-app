import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import SideBar from './SideBar'
import './Header.css'
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
			<SideBar
				clearCriteria={clearCriteria}
				setOpenSideBar={setOpenSideBar}
				openSideBar={openSideBar}
				handleSignout={handleSignout}
			/>
		</>
	)
}

export default Header
