import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import LoadingComponent from './LoadingComponent'
export default function Register() {
	const [isLoading, setIsLoading] = useState(false)
	const { createUser, createUserinDB } = useContext(AuthContext)

	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [authError, setAuthError] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (email && password !== '') {
			setIsLoading(true)
			setAuthError('')
			try {
				// it makes an API call to firebase and waits for the data returned
				const userCredentials = await createUser(email, password)

				// then it uses this data to create an entry in users db
				console.log(userCredentials.user)
				await createUserinDB(userCredentials.user).then(() =>
					setTimeout(() => {
						setIsLoading(false)
						navigate('/profile')
					})
				)
			} catch (e) {
				setIsLoading(false)
				setAuthError('Please try again.')
			}
		} else {
			setAuthError(e)
		}
		setTimeout(setIsLoading(false), 2000)
	}

	return (
		<div className='register-container'>
			{isLoading && <LoadingComponent loadingText={'Registering in progress'} />}
			<form className='form-container' onSubmit={handleSubmit}>
				<h2 className='form-container-headline'>
					Create an account to post an item you have found or lost.
				</h2>

				<input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Email'
				/>
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
				/>
				<h4 className='form-container-subheadline'>
					Already have an account,{' '}
					<Link to='/login'>
						<span className='accent'>click here to login.</span>
					</Link>
				</h4>
				{authError || null}
				<button className='btn'>Register</button>
			</form>
			<div className='placeholder-img-container'>
				<img
					src='https://images.unsplash.com/photo-1523705480679-b5d0cc17a656?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
					className='placeholder-img'
					alt='placeholder img for desktop'
				/>
			</div>
		</div>
	)
}
