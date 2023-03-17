import { getDoc, onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'
import React, { useEffect } from 'react'

function useFetchDocument(colName, id) {

    const [fetchedData, setFetchedData] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState('')

    const fetchData = async () => {
        setLoading(true)
        const docRef = doc(db, colName, id)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        
            const document = docSnap.data();
            console.log("Document data:", document);
            setFetchedData(document)
        }
        else {
            console.log("No such document!");
            setError('No such document!')
        }
        setLoading(false)
    }


    useEffect(() => {
        fetchData()
    }, [colName, id])


  return {fetchedData, loading, error}
}

export default useFetchDocument