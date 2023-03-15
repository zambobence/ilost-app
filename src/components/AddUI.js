import React, { useState, useContext, useEffect } from 'react'
import { nanoid } from 'nanoid'
import MyMap from './MyMap'
import data from '../components/cardtestdata'
import Searchbar from './Searchbar'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserDataContext'
import { createPlaceObj } from '../functions/createPlaceObj'
import { AuthContext } from '../context/AuthContext'
import {
	setDoc,
	doc,
	collection,
	addDoc,
	serverTimestamp,
} from 'firebase/firestore'
import { storage, db } from '../firebase'
import { uploadImg } from '../functions/uploadImg'
import { deleteImg } from '../functions/deleteImg'
import { getUserLocationData } from '../functions/getUserLocationData'
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage'
import LoadingComponent from './LoadingComponent'
import Modal from './Modal'
function AddUI({
	coordinates,
	colorArray,
	typeArray,
	createPlceObject,
	fetchPlaceDetails,
	userLocationPlaceData,
}) {
	const navigate = useNavigate()

	const [itemId, setItemId] = useState('')
	const [title, setTitle] = useState('')
	const [date, setDate] = useState()
	const [color, setColor] = useState('')
	const [type, setType] = useState('')
	const [comment, setComment] = useState('')
	const [file, setFile] = useState(null)
	const [imgUrl, setImgUrl] = useState('')
	const [radius, setRadius] = useState(50)
	const [addUICoordinates, setAddUICoordinates] = useState(coordinates)
	const [lost, setLost] = useState(true)
	const [placeData, setPlaceData] = useState(userLocationPlaceData)
	const [fileRef, setFileRef] = useState('')
	const { userData } = useContext(UserDataContext)
	const [isLoading, setIsLoading] = useState(false)
	const [modal, setModal] = useState({error: false, message: ''})

	const toggleLost = () => {
		setLost((prevState) => !prevState)
	}

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

	useEffect(() => {
		setItemId(nanoid())
	}, [])

	useEffect(() => {
		file && handleFileUpload()
	}, [file])

	const addItem = async (e) => {
		e.preventDefault()
		const obj = {
			id: itemId,
			title,
			lost,
			type,
			color,
			loc: addUICoordinates,
			radius: parseInt(radius),
			comment,
			imgUrl,
			placeData,
			addedBy: userData,
			addedByUser: userData.userId,
			date: Date.parse(date),
			uploadTime: serverTimestamp(),
		}

		if (color && type && addUICoordinates.lat && addUICoordinates.lng) {
			const docRef = await setDoc(doc(db, 'items', obj.id), {
				...obj,
			})
		//	console.log('Element added with the id ', obj.id)
			navigate('/')
		} else {
			setModal({error: true, message:'Please choose a type and or color allow the allow browser to access your current location or set a point on the map using the search option!'})
			setTimeout(() => setModal({}), 3000)
		}
	}

	const triggerUpload = () => {
		data.forEach((e) => uploadAllItem(e))
	}

	const uploadAllItem = async (obj) => {
		const docRef = await setDoc(doc(db, 'items', obj.id), {
			...obj,
		})
	}

	const handleDeleteImg = async () => {
		await deleteImg(fileRef)
		setImgUrl('')
	}

	const handleGetCurrentLocation = () => {
		getUserLocationData().then((res) => {
			setAddUICoordinates(res.coordinates)
			setPlaceData(res.placeData)
		})
	}

	console.log(data)
	return (
		<div className='addui-container'>
	{modal.error && <Modal error={modal.error} modalMessage={modal.message} />}
	{isLoading && <LoadingComponent loadingText={'Uploading image'}/>}

			<form className='addui-form-container' action='submit'>
					<span className='toggle-icon' onClick={toggleLost}>
						{lost ? (
							<i className='fa-solid icon-label toggle fa-toggle-on'></i>
						) : (
							<i className='fa-solid icon-label toggle fa-toggle-off'></i>
						)}
					</span>
					<p className='search-mode'>{lost ? 'I lost' : 'I found'}</p>

				<select
					name='type'
					value={type}
					onChange={(e) => setType(e.target.value)}
				>
					{typeArray.map((e, i) => (
						<option key={i} value={e}>
							{e}
						</option>
					))}
				</select>
				<select
					name='color'
					value={color}
					onChange={(e) => setColor(e.target.value)}
				>
					{colorArray.map((e, i) => (
						<option key={i} value={e}>
							{e}
						</option>
					))}
				</select>

					<span className='location-icon'>
						<i className='fa-solid icon fa-location-dot'></i>
					</span>
					<div className='location-text-container'>
						<p>
							{placeData?.route} {placeData?.postal_code}{' '}
							{placeData?.locality}
						</p>
						<p className='coordiantes'>
							Coords: {Number(coordinates.lat).toFixed(2)}{' '}
							{Number(coordinates.lng).toFixed(2)}
						</p>
					</div>
					<span className='radius-icon'>
				<i className="fa-regular fa-circle-dot"></i>
				</span>

				<input
					id='radius-slider'
					type='range'
					min={0}
					max={10000}
					defaultValue={radius}
					onChange={(e) => setRadius(parseInt(e.target.value))}
				/>
				<p className='radius-amount'>
					{(radius / 1000).toFixed(2)} km{' '}
				</p>
				<input
					name='title'
					className='title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Title'
				/>

				<input
					type='date'
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>

				<textarea
					name='comment'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder='Any remark'
				/>
				<div className='addui-img-container'>
					{file ? (
						<>
							<img className='addui-img-preview' src={imgUrl} />
							<div className='delete-icon-overlay'>
								<i
									className='deleteIcon fa-solid fa-trash'
									onClick={handleDeleteImg}
								></i>
							</div>
						</>
					) : (
						<label htmlFor='fileInput' className='upload-icon'>
							<i className='fa-solid fa-upload'></i>
						</label>
					)}
				</div>

				<input
					id='fileInput'
					type='file'
					onChange={(e) => setFile(e.target.files[0])}
				/>
				<button className='btn' onClick={addItem}>
					Add item
				</button>
			</form>
			<Searchbar
				setCoordinates={setAddUICoordinates}
				setPlaceData={setPlaceData}
				getUserLocation={handleGetCurrentLocation}
			/>
			<MyMap
				coordinates={addUICoordinates}
				setCoordinates={setAddUICoordinates}
				radius={radius}
				setRadius={setRadius}
				createPlceObject={createPlceObject}
				fetchPlaceDetails={fetchPlaceDetails}
				setPlaceData={setPlaceData}
			/>
		</div>
	)
}

export default AddUI
