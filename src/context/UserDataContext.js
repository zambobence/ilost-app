import React, { useState, useContext, useEffect, createContext } from 'react'
import { AuthContext } from './AuthContext'
import { db } from '../firebase'
import { onSnapshot, doc, collection } from 'firebase/firestore'
import useFetchDocument from '../customHooks/useFetchDocument'

const UserDataContext = createContext()

function UserDataContextProvider({ children }) {
	const [userData, setUserData] = useState({})
	const { authUser } = useContext(AuthContext)

	const {fetchedData, loading, error} = useFetchDocument('users', authUser?.uid)

	useEffect(() =>{
		setUserData(fetchedData)
	}, [fetchedData])

	return (
		<UserDataContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserDataContext.Provider>
	)
}

export { UserDataContext, UserDataContextProvider }
