import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../firebase'
import React, {useState, useEffect} from 'react'

const useUploadImg = (file, filePath,) => {
	const [url, setUrl] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState(null)

	const uploadImg = async () => {
		try {
			setLoading(true)
			const imageRef = ref(storage, filePath)
            console.log(imageRef)
			const snapshot = await uploadBytes(imageRef, file)
			const url = await getDownloadURL(snapshot.ref)
			setUrl(url)
            console.log(url)
		} catch (e) {
			setError(e.message)
		}
		setLoading(false)
    }

	const deleteImg =() => {
		const imageRef = ref(storage, filePath)
		try {
			deleteObject(imageRef)
		} catch (e) {
			console.log('Could not delete image')
		}
	}

        useEffect(()=> {
            console.log('useEffect runs')
            if(file !== null) {
                uploadImg(file)
            }
            else {
                console.log('No file selected')
            }
        },[file])

  return {url, loading, error, deleteImg}
}

export default useUploadImg