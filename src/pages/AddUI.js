import React, { useState, useContext, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Searchbar from '../components/Searchbar'
import TitleCommentComponent from '../components/TitleCommentComponent'
import LocationComponent from '../components/LocationComponent'
import MapComponent from '../components/MapComponent'
import LoadingComponent from '../components/LoadingComponent'
import DefaultForm from '../components/DefaultForm'
import FileUploadComponent from '../components/FileUploadComponent'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserDataContext'
import { AuthContext } from '../context/AuthContext'
import { ItemDataContext } from '../context/ItemDataContext'
import {
	setDoc,
	doc,
	serverTimestamp,
} from 'firebase/firestore'
import Modal from '../components/Modal'

import { storage, db } from '../firebase'
import { uploadImg } from '../functions/uploadImg'
import { deleteImg } from '../functions/deleteImg'
import { getUserLocationData } from '../functions/getUserLocationData'


function AddUI() {
	const navigate = useNavigate()

	const { userData } = useContext(UserDataContext)
	const [file, setFile] = useState(null)
	const [itemId, setItemId] = useState(nanoid())
	const [imgUrl, setImgUrl] = useState('')
	const [title, setTitle] = useState('')
	const [comment, setComment] = useState('')
	
	const [placeData, setPlaceData] = useState({})
	const [coordinatesFetched, setCoordinatesFetched] = useState(false)
    const [coordinates, setCoordinates] = useState({})
	
	const [data, setData] = useState('')
	const [fileRef, setFileRef] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [modal, setModal] = useState({error: false, message: ''})
	const {color, type, lost, radius, date} = useContext(ItemDataContext)


	// console.log(coordinates)
	const handleFileUpload = async () => {
		setIsLoading(true)
	//	console.log('Async upload starts')
		const filePath = `items/${itemId}`
		setFileRef(filePath)
		const url = await uploadImg(file, filePath)
	//	console.log('The newly uploaded photo: ', url)
		setImgUrl(url)
		setTimeout(setIsLoading(false), 2000)
	}
/*
	useEffect(() => {
		setItemId(nanoid())
	}, [])
*/
	useEffect(() => {
		file && handleFileUpload()
	}, [file])

	let allFilled

	if (itemId && title && type && color && coordinates && radius && date) {
		allFilled = true
	} else { allFilled = false }


	const addItem = async (e) => {
		e.preventDefault()
		const obj = {
			id: itemId,
			title,
			lost,
			type,
			color,
			loc: coordinates,
			radius: parseInt(radius),
			comment,
			imgUrl,
			placeData,
			addedByUser: nanoid(),
			date: Date.parse(date),
			uploadTime: serverTimestamp(),
		}

		if (allFilled) {
			await setDoc(doc(db, 'items', obj.id), {...obj})
			navigate('/')
		} else {
			setModal({error: true, message: 'Please fill out all fields'})
		}
	}


	const handleDeleteImg = async () => {
		await deleteImg(fileRef)
		setImgUrl('')
	}

	const fetchLocationData = async () => {
		let res = await getUserLocationData()
		setCoordinates(res.coordinates)
		setPlaceData(res.placeData)
	}
	

	
    useEffect(() => {
        if (!coordinatesFetched){
            fetchLocationData()
			setCoordinatesFetched(true)
        }
    },[coordinatesFetched])


  return (
    <>
         { /*  
		{modal.error && <Modal error={modal.error} modalMessage={modal.message} />}
		{isLoading && <LoadingComponent loadingText={'Uploading image'}/>}
		*/}
        
		<div className='container grid'>
			<form className='form-container' action='submit'>
				<h1>Add item</h1>
				<TitleCommentComponent title={title} setTitle={setTitle} comment={comment} setComment={setComment} />
				<DefaultForm />				
				<LocationComponent coordinates={coordinates} placeData={placeData} />
				<FileUploadComponent setFile={setFile} imgUrl={imgUrl} handleDeleteImg={handleDeleteImg}/>
				<button className='btn' onClick={addItem} disabled={!allFilled}>
					Add item
				</button>
			</form>
			<Searchbar
				setCoordinates={setCoordinates}
				setPlaceData={setPlaceData}
				getCurrentLocation={fetchLocationData}
			/>
			<MapComponent coordinates={coordinates} setCoordinates={setCoordinates} setPlaceData={setPlaceData}/>
		</div>
	</>
	)
}

export default AddUI
