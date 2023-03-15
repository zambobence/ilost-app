import React, { useState, useContext, useEffect, createContext } from 'react'
import { AuthContext } from './AuthContext'
import { db } from '../firebase'
import { onSnapshot, doc, collection } from 'firebase/firestore'

const UserDataContext = createContext()

function UserDataContextProvider({ children }) {
	const [userData, setUserData] = useState({})
	const { authUser } = useContext(AuthContext)

	useEffect(() => {
		const unsub = () => {
			authUser?.uid &&
				onSnapshot(doc(db, 'users', authUser?.uid), (snapshot) => {
					setUserData(snapshot.data())
				})
		}
		return unsub()
	}, [authUser?.uid]) // it has to be a primitive datatype as the objects are always false

	return (
		<UserDataContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserDataContext.Provider>
	)
}

export { UserDataContext, UserDataContextProvider }
