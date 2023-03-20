import { collection, colRef, onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'
import React, { useEffect } from 'react'

function useFethcDB() {

    const [fetchedData, setFetchedData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    
    function fetchItems() {
        setLoading(true)
        const colRef = collection(db, 'items')
        onSnapshot(colRef, (snapshot) => {
            const items = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setLoading(false)
            setFetchedData(items)
	})
}

useEffect(() => {
    fetchItems()
}, [])


  return {fetchedData, loading}
}

export default useFethcDB