import React, { useState } from 'react'
import { createPlaceObj } from '../functions/createPlaceObj'
import { LoadScript, Autocomplete } from '@react-google-maps/api'

export default function Searchbar({
	setCoordinates,
	getUserLocation,
	setPlaceData,
}) {
	const [searchResult, setSearchResult] = useState('Result: none')
	const onLoad = (autocomplete) => {
		setSearchResult(autocomplete)
	}

	const apiKey = process.env.REACT_APP_API_KEY
	const onPlaceChanged = () => {
		if (searchResult !== null) {

			// Fetches the places api of google to get places data
			
			const place = searchResult.getPlace()
			setPlaceData(createPlaceObj(place?.address_components))
			setCoordinates({
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
			})
		}
	}

	return (
		<div className='searchbar-container'>
			<LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
				<Autocomplete
					className='searchbar'
					onPlaceChanged={onPlaceChanged}
					onLoad={onLoad}
				>
					<input className='searchbar-autoinput-field' type='text' />
				</Autocomplete>
			</LoadScript>
			<span className='searchbar-icon' onClick={getUserLocation}>
				<i
				className='icon fa-solid searchbar-icon fa-location-arrow'
				
			></i>
			</span>
		</div>
	)
}
