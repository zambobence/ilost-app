// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCoQ0oT3jH1Vuwv8U3PNn2_E0fECvr58gM',
	authDomain: 'ilostapp-798c7.firebaseapp.com',
	projectId: 'ilostapp-798c7',
	storageBucket: 'ilostapp-798c7.appspot.com',
	messagingSenderId: '922544425641',
	appId: '1:922544425641:web:60932bc63d2b6fc642f7b8',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
