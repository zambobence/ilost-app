import React, { useState, useContext, useEffect } from 'react'
import { auth, db, storage } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { doc, onSnapshot, getDoc } from 'firebase/firestore'

const fetchUserData = async (user) => {


	const docRef = doc(db, 'users', user.uid)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		return docSnap.data()
	} else {
		// doc.data() will be undefined in this case
		console.log('No such document!')
	}
}

export default fetchUserData
