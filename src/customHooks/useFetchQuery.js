import React from 'react'
import { useState, useEffect} from 'react'
import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
function useFetchQuery(colRef, attribute, id) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

const fetchOwnItems = async () => {
    const q = query(collection(db, colRef), where(attribute, "==", id));
    try {
       setLoading(true)
        const querySnapshot = await getDocs(q);
        let fetchedData = querySnapshot.docs.map((doc) => ({docId: doc.id, ...doc.data()}))
        setData(fetchedData)
    }
    catch (error) {
        setError(error.message)
    }
    setLoading(false)

};

useEffect(() => {
    fetchOwnItems()
}, [colRef, attribute, id])


    return {data, loading, error}
}

export default useFetchQuery