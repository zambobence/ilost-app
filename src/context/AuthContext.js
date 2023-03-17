import React, { useState, useEffect, useContext, createContext } from 'react'
import { auth, db } from '../firebase'
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { uploadDocument } from '../functions/uploadDocument'

const AuthContext = createContext()

function AuthContextProvider({ children }) {
	const [authUser, setAuthUser] = useState({})

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => setAuthUser(user))
	}, [])

	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const createUserinDB = async (user) => {
		const dummyUserData = {
			userId: user.uid,
			fname: '',
			lname: '',
			email: user.email,
			phone: '',
			avatarUrl: '',
		}
		uploadDocument('users', user.uid, dummyUserData)
	}

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	


	return (
		<AuthContext.Provider
			value={{
				authUser,
				createUser,
				createUserinDB,
				signIn,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthContextProvider }
