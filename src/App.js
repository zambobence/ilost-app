import './style.css'
import React, { useState, useEffect, useContext } from 'react'
import { Navigate, Link, Routes, Route, useNavigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Header from './components/Header'
import AddUI from './pages/AddUI'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ItemPage from './pages/ItemPage'
import { auth } from './firebase'
import { UserDataContext } from './context/UserDataContext'
import { signOut } from 'firebase/auth'
import Browse from './pages/Browse.js'
import Footer from './components/Footer'
function App() {


	

	const { authUser } = useContext(AuthContext)
	const currentUser = authUser?.uid
	const navigate = useNavigate()
	const { setUserData } = useContext(UserDataContext)

	//  console.log('Current user is? ', currentUser)
	// if there is no user authenticated it navigates back to first page
	const RequireAuth = ({ children }) => {
		return currentUser ? children : <Navigate to='/signin' />
	}

	const handleSignout = async () => {
		signOut(auth)
			.then(() => {
				console.log('Signout succesful')
				navigate('/login')
				setUserData({})
			})
			.catch((e) => console.log(e))
	}

	





	return (
		<div className='wrapper'>
			<Header
				handleSignout={handleSignout}
			/>

			<main>
				<Routes>
					<Route exact path='/' element={<Browse />} />
					<Route
						path='/additem'
						element={
							//<RequireAuth>
								<AddUI/>
							//</RequireAuth>
						}
					/>
					<Route
						path='/profile'
						element={
							<RequireAuth>
								<Profile handleSignout={handleSignout}/>
							</RequireAuth>
						}
					/>
					<Route path='item/:id' element={<ItemPage />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<Navigate to='/' />} />					
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App
