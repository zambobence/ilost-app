import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SideBarData } from './SideBarData'
import { AuthContext } from '../context/AuthContext'
import './SideBar.css'
function SideBar({
	handleSignout,
	openSideBar,
	setOpenSideBar,
	clearCriteria,
}) {
	const { authUser } = useContext(AuthContext)
	const [authenticated, setAuthenticated] = useState(authUser?.uid)

	useEffect(() => {
		return authUser?.uid ? setAuthenticated(true) : setAuthenticated(false)
	}, [authUser?.uid])

	const AuthenticatedUserSideBarItemList = SideBarData.filter(
		(e) => e.visibility !== ''
	).map((item, i) => (
		<li
			key={i}
			className='SideBarItem'
			onClick={() => {
				setOpenSideBar(false)
				clearCriteria()
			}}
		>
			<Link to={item.path}>
				{item.icon}
				{item.name}
			</Link>
		</li>
	))

	const PublicSideBarItemList = SideBarData.filter(
		(e) => e.visibility !== 'authUser'
	).map((item, i) => (
		<li
			key={i}
			className='SideBarItem'
			onClick={() => {
				setOpenSideBar(false)
				clearCriteria()
			}}
		>
			<Link to={item.path}>
				{item.icon}
				{item.name}
			</Link>
		</li>
	))

	// console.log(PublicSideBarItemList)

	return (
		<section className={openSideBar ? 'SideBar open' : 'SideBar'}>
			<ul className='SideBarItemList'>
				{authenticated ? (
					<>
						{AuthenticatedUserSideBarItemList}
						<li
							className='SideBarItem'
							onClick={() => {
								setOpenSideBar(false)
								handleSignout()
								setAuthenticated(false)
							}}
						>
							<i className='fa-solid fa-arrow-right-from-bracket'></i>
							Signout
						</li>
					</>
				) : (
					<>{PublicSideBarItemList}</>
				)}
			</ul>
		</section>
	)
}

export default SideBar
