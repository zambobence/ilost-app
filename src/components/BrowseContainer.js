import React, { useState, useEffect } from 'react'
import MyMap from './MyMap'
import Searchbar from './Searchbar'
import List from './List'
import sumOfRadius from '../functions/sumOfRadius'
import getDistance from '../functions/getDistance'
import { createPlaceObj } from '../functions/createPlaceObj'
import { fetchPlaceDetails } from '../functions/fetchPlaceDetails'
import { getUserLocationData } from '../functions/getUserLocationData'
import { getUserLocationCoordinates } from '../functions/getUserLocationCoordinates'

import { db, auth } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'

function BrowseContainer({
	coordinates,
	colorArray,
	typeArray,
	createPlceObject,
	userLocationPlaceData,
	allItems,
}) {
	const [lost, setLost] = useState()
	const [filteredItemList, setFilteredItemList] = useState([])
	const [type, setType] = useState('Type')
	const [color, setColor] = useState('Color')
	const [radius, setRadius] = useState(50)
	const [placeData, setPlaceData] = useState(userLocationPlaceData)
	const [browseCoordinates, setBrowseCoordinates] = useState(coordinates)

	const toggleLost = () => {
		setLost((prevState) => !prevState)
	}

	const filterOverlaps = (itemArray) => {
		return itemArray?.filter(
			(e) =>
				sumOfRadius(e.radius, radius) >
				getDistance(e.loc, browseCoordinates)
		)
	}

	useEffect(() => {
		browseCoordinates && handleGetCurrentLocation()
	}, [])

	// it calls the get getUserLocationFunction which calls the following function
	// 1. getUserLocationCoordinates --> returns coordinates
	// 2. fetchPlaceDetails --> using the coordinates returned fetches the google place api
	// and returns an object
	// 3. afterward it sets the useStates

	const handleGetCurrentLocation = () => {
		getUserLocationData().then((res) => {
			setBrowseCoordinates(res.coordinates)
			setPlaceData(res.placeData)
		})
	}

	const filterResults = () => {
		const allOverlappingItems = filterOverlaps(allItems)
		const filteredOverlapppingItemsLostFound = allOverlappingItems.filter(
			(e) => e.lost === !lost)

		if (color !== 'Color' && type !== 'Type') {
			const filterItemList = filteredOverlapppingItemsLostFound
				.filter((e) => e.color === color)
				.filter((e) => e.type === type)
			setFilteredItemList(filterItemList)
		} else if (color !== 'Color' && type === 'Type') {
			const filterItemList = filteredOverlapppingItemsLostFound.filter(
				(e) => e.color === color
			)
			setFilteredItemList(filterItemList)
		} else if (type !== 'Type' && color === 'Color') {
			const filterItemList = filteredOverlapppingItemsLostFound.filter(
				(e) => e.type === type
			)
			setFilteredItemList(filterItemList)
		} else {
			setFilteredItemList(filteredOverlapppingItemsLostFound)
		}
	}

	useEffect(() => {
		filterResults()	
	}, [color, type, radius, lost, browseCoordinates])

	useEffect(() => {
		setFilteredItemList(
			filterOverlaps(allItems)?.filter((e) => e.lost === !lost)
		)
	}, [])

	return (
		<div className='browse-container-two'>
			<div className='browse-form-container'>
					<span className="toggle-icon" onClick={toggleLost}>
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
							{placeData?.locality} {placeData?.political}
						</p>

						<p className='coordiantes'>
							Coords: {Number(browseCoordinates?.lat).toFixed(2)}{' '}
							{Number(browseCoordinates?.lng).toFixed(2)}
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
			</div>
			<Searchbar
				setCoordinates={setBrowseCoordinates}
				setPlaceData={setPlaceData}
				getUserLocation={handleGetCurrentLocation}
			/>

			<MyMap
				coordinates={browseCoordinates}
				setCoordinates={setBrowseCoordinates}
				radius={radius}
				setRadius={setRadius}
				createPlceObject={createPlaceObj}
				fetchPlaceDetails={fetchPlaceDetails}
				setPlaceData={setPlaceData}
				items={filteredItemList}
			/>
			<List
				items={filteredItemList}
				setCoordinates={setBrowseCoordinates}
			/>
		</div>
	)
}

export default BrowseContainer
