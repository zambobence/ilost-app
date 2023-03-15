import axios from 'axios'
import { collection, getDocs, onSnapshot, doc } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../firebase'

function fetchItems() {
	const colRef = collection(db, 'items')
	onSnapshot(colRef, (snapshot) => {
		const items = snapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		console.log('The items')
		return items
	})
}

export { fetchItems }
