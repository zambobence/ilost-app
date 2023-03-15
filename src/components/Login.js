import React, { useState, useContext } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { UserDataContext } from '../context/UserDataContext'

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [authError, setAuthError] = useState('')
	const { signIn } = useContext(AuthContext)
	const dataretrieved = useContext(UserDataContext)

	const navigate = useNavigate()
	const { userData } = useContext(UserDataContext)

	const handleLogin = async (e) => {
		e.preventDefault()
		if (email && password !== '') {
			try {
				await signIn(email, password).then(() => {
					console.log(dataretrieved)
					console.log('Navigating to profile')
					navigate('/')
				})
			} catch (e) {
				setAuthError(e)
			}
		} else {
			setAuthError('Please input email and password!')
		}
	}
	return (
		<div className='login-container'>
			<form className='form-container' onSubmit={handleLogin}>
				<h2 className='form-container-headline'>Login to post an item you have found or lost.</h2>
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
				{authError ? <h3>Incorrect username or password</h3> : null}
				<h4 className='form-container-subheadline'>
					Don&lsquo;t have an account{' '}
					<Link to='/register'>
						<span className='accent'>sign up </span>
					</Link>
					for free.
				</h4>
				<button className='btn'>Login</button>
			</form>
			<div className='placeholder-img-container'>
				<img
					src='https://images.unsplash.com/photo-1601972599748-19fe5a7e756f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1113&q=80'
					className='placeholder-img'
					alt='placeholder img for desktop'
				/>
			</div>
		</div>
	)
}

export default Login
