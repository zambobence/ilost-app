import React, { useState } from 'react'
import { createPlaceObj } from '../functions/createPlaceObj'
import { LoadScript, Autocomplete } from '@react-google-maps/api'
const apiKey = process.env.REACT_APP_API_KEY

export default function Searchbar({
	setCoordinates,
	getCurrentLocation,
	setPlaceData,
	}) {
	const [searchResult, setSearchResult] = useState('Result: none')
    const [ libraries ] = useState(['places']);

	const onLoad = (autocomplete) => {
		setSearchResult(autocomplete)
	}

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
		<div className='searchbar-container container'>
			<LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
				<Autocomplete
					className='searchbar-autocomplete'
					onPlaceChanged={onPlaceChanged}
					onLoad={onLoad}
				>
					<input className='searchbar-autocomplete-field' type='text' />
				</Autocomplete>
			</LoadScript>
			<span className='searchbar-icon' onClick={getCurrentLocation}>
				<i
				className='icon fa-solid searchbar-icon fa-location-arrow'
				
			></i>
			</span>
		</div>
	)
}
