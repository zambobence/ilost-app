import { db } from "../firebase"
import { setDoc, doc } from "firebase/firestore"


export const uploadDocument = async (colRef, obj) => {
    try {
        const docRef = doc(db, colRef, obj.id)
        console.log('uploading document')
        await setDoc(docRef, {...obj})
        console.log('uploaded document')
    } catch (error) {
        console.log(error)
    }
}