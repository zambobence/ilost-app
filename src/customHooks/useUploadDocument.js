import { db } from "../firebase"
import { setDoc, doc } from "firebase/firestore"

import React, {useState} from 'react'

function useUploadDocument() {
    const [docUploadLoading, setDocUploadLoading] = useState(false)
    const [docUploadEror, setDocUploadError] = useState(null)

    const uploadDocument = async (colRef,id, obj) => {
      setDocUploadLoading(true)
        try {
            const docRef = doc(db, colRef, id)
            console.log('uploading document')
            await setDoc(docRef, {...obj})
            console.log('uploaded document')
        } catch (error) {
            console.log(error)
            setDocUploadError(error.message )
        }
        setDocUploadLoading(false)
    }
  return {docUploadLoading, docUploadEror, uploadDocument}
}

export default useUploadDocument