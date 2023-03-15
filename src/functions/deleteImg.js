import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from 'firebase/storage'
import { storage } from '../firebase'

export const deleteImg = (filePath) => {
	const imgRef = ref(storage, filePath)

	try {
		deleteObject(imgRef)
	} catch (e) {
		console.log('Could not delete image')
	}
}
