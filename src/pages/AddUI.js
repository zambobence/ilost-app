import React, { useState, useContext, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Searchbar from '../components/Searchbar'
import TitleCommentComponent from '../components/TitleCommentComponent'
import LocationComponent from '../components/LocationComponent'
import MapComponent from '../components/MapComponent'
import LoadingComponent from '../components/LoadingComponent'
import DefaultForm from '../components/DefaultForm'
import FileUploadComponent from '../components/FileUploadComponent'
import useUploadImg from '../customHooks/useUploadImg'

import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserDataContext'
import { AuthContext } from '../context/AuthContext'
import { ItemDataContext } from '../context/ItemDataContext'
import { serverTimestamp } from 'firebase/firestore'
// import { deleteImg } from '../functions/deleteImg'
import { getUserLocationData } from '../functions/getUserLocationData'
import useUploadDocument from '../customHooks/useUploadDocument'

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
	
	const [lost, setLost] = useState(true)
	const [data, setData] = useState('')
	const [fileRef, setFileRef] = useState(`items/${itemId}`)
	const [isLoading, setIsLoading] = useState(false)
	const [modal, setModal] = useState({error: false, message: ''})
	const {color, setColor, setType, setRadius, type, radius, date} = useContext(ItemDataContext)

	const {url, loading, error, deleteImg} = useUploadImg(file, `items/${itemId}`)
	const {docUploadLoading, docUploadEror, uploadDocument} = useUploadDocument()


	useEffect(() => {
		setImgUrl(url)
	}, [url])
	

	let allFilled

	if (itemId && title && type && color && coordinates && radius && date) {
		allFilled = true
	} else { allFilled = false }

	const clearCriteria = () => {
		setColor('Color')
		setType('Type')
		setTitle('')
		setComment('')
		setRadius(50)
	}


	const addItem = (e) => {

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
			addedByUser: userData?.userId,
			date: Date.parse(date),
			uploadTime: serverTimestamp(),
		}

		if (allFilled) {
			e.preventDefault()
			console.log("New item: ", obj, itemId)
			uploadDocument('items', itemId, obj).then(() => clearCriteria())
			navigate('/')
		}
	}

	const handleDeleteImg = async () => {
		await deleteImg()
		setImgUrl('')
	}

	const fetchLocationData = async () => {
		let res = await getUserLocationData()
		setCoordinates(res.coordinates)
		setPlaceData(res.placeData)
	}
	

	
    useEffect(() => {
        if (!coordinatesFetched || coordinates.lat === undefined){
            fetchLocationData()
			setCoordinatesFetched(true)
        }
    },[coordinatesFetched])

	console.log('File ref: ', fileRef)

  return (
    <>
         
		<div className='container grid'>
			{loading || docUploadLoading && <LoadingComponent />}
			<form className='form-container'>
				<h1>Add item</h1>
				<TitleCommentComponent title={title} setTitle={setTitle} comment={comment} setComment={setComment} />
				<DefaultForm />				
				<LocationComponent coordinates={coordinates} placeData={placeData} />
				<FileUploadComponent file={file} setFile={setFile} imgUrl={imgUrl} handleDeleteImg={handleDeleteImg}/>

				<button className='btn' onClick={(e)=>addItem(e)} disabled={!allFilled}>
					Add item
				</button>
			</form>
			<div className='col'>
			<Searchbar
				setCoordinates={setCoordinates}
				setPlaceData={setPlaceData}
				getCurrentLocation={fetchLocationData}
			/>
			<MapComponent coordinates={coordinates} setCoordinates={setCoordinates} setPlaceData={setPlaceData}/>
			</div>
		</div>
	</>
	)
}

export default AddUI
