import React, { useState, useContext, useEffect } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import getRandomNumber from '../functions/getRandomNumber'
import parseDate from '../functions/parseDate'
import {
	doc,
	deleteDoc,
	collection,
	getDocs,
	onSnapshot,
	getDoc
} from 'firebase/firestore'
import { db, auth, storage } from '../firebase'

import MyMap from './MyMap'

function ItemPage({ items, currentUser }) {
	const navigate = useNavigate()

	const { itemId } = useParams()
	const [fetchedItemData, setFetchedItemData] = useState({})
	const [uploaderData, setUploaderData] = useState({})
	if (!fetchedItemData) {
		navigate('/')
	}

	const {
		id,
		lost,
		date,
		uploadTime,
		title,
		type,
		color,
		loc,
		radius,
		comment,
		imgUrl,
		placeData,
		addedBy,
		addedByUser,
	} = fetchedItemData

	// if I put ItemData it gets the data passed to

	const fetchItemData = async () => {
		await onSnapshot(doc(db, 'items', itemId), (snapshot) => {
			setFetchedItemData(snapshot.data())
		})
}
	
	useEffect(() => {
		fetchItemData()
	}, [])
	
	const fetchUploaderData = async () => {
		console.log(fetchedItemData?.addedByUser)
		const uploaderRef = await doc(db, 'users', fetchedItemData?.addedByUser)
		const uploaderInfo = await getDoc(uploaderRef)
		console.log(uploaderInfo.data())
		setFetchedItemData(prevData => ({...prevData, ...uploaderInfo.data()}))

	}

	useEffect(() => {
		fetchUploaderData()
	},[fetchedItemData?.addedByUser])

	const handleDeleteItem = async () => {
		try {
			await deleteDoc(doc(db, 'items', id))
			navigate('/')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className='item-page-container'>
			<img src={imgUrl || `https://source.unsplash.com/random/200x200/?${type}/${getRandomNumber()}/`} className='item-page-img' />
			<div className='item-text-container'>
				<h4>Title: <span className='item-text'>{title}</span></h4>
				<h4>Type: <span className='item-text'>{type}</span></h4>
				<h4>Color: <span className='item-text'>{color}</span></h4>
				<h4>Location</h4>
				<p>
					{placeData?.street_number} {placeData?.route}
				</p>
				<p>
					{placeData?.postal_code} {placeData?.locality}{' '}{placeData?.country}</p>
				<h4>Remarks:</h4>
				<p>{comment}</p>
				{date && (
					<h4>
						{lost ? 'Lost' : 'Found'} on <span className='item-text'>{parseDate(date)} </span>
					</h4>
				)}
				<h4 className="upload-date">Uploaded on <span className='item-text'>{parseDate(uploadTime?.seconds * 1000)}</span></h4>
				
					<div className="contact-box-container">
					{currentUser ? (<>
					<h4>Added by: {fetchedItemData?.fname}</h4>
						{fetchedItemData?.phone && <p>📞	{fetchedItemData?.phone}</p>}
						{fetchedItemData?.email && <p>💻	{fetchedItemData?.email}</p>}
						</> ): (
						<>
						<h4>
						Please{' '}
						<span className='accent'>
							<Link to='/login'>login</Link>
						</span>{' '}
						or{' '}
						<span className='accent'>
							<Link to='/register'>register</Link>
						</span>{' '}
						to see contact details of the User.
					</h4> </>)}
					</div>					{addedBy?.userId === currentUser && (
					<button className='btn del-btn' onClick={handleDeleteItem}>
						Delete
					</button>
				)}
			</div>

			<MyMap coordinates={loc} radius={radius} />
		</div>
	)
}

export default ItemPage
