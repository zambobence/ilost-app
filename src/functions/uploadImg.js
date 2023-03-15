import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'

export const uploadImg = async (file, fileName) => {
	if (file == null) return
	try {
		const imageRef = ref(storage, fileName)
		const snapshot = await uploadBytes(imageRef, file)
		const url = await getDownloadURL(snapshot.ref)
		return url
	} catch (e) {
		console.log(e)
	}
}
