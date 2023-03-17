import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import React, {useState, useEffect} from 'react'

const useUploadImg = ({file, fileName}) => {
	const [url, setUrl] = React.useState(null)
	const [error, setError] = React.useState(null)
	const [loading, setLoading] = React.useState(false)

	const uploadImg = async (file, fileName) => {
		try {
			setLoading(true)
			const imageRef = ref(storage, fileName)
			const snapshot = await uploadBytes(imageRef, file)
			const url = await getDownloadURL(snapshot.ref)
			setUrl(url)
		} catch (e) {
			setError(e.message)
		}
		setLoading(false)
    }
    
        useEffect(()=> {
            uploadImg(file, fileName)
        },[file, fileName])

  return {loading, url, error}
}

export default useUploadImg