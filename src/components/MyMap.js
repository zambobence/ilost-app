import React, { useState } from 'react'
import {
	Marker,
	Circle,
	GoogleMap,
	LoadScript,
	useLoadScript,
	Autocomplete,
} from '@react-google-maps/api'
import { fetchPlaceDetails } from '../functions/fetchPlaceDetails'

import phoneIcon from '../img/icons/phoneIcon.png'
import clothesIcon from '../img/icons/clothesIcon.png'
import laptopIcon from '../img/icons/laptopIcon.png'
import keyIcon from '../img/icons/keyIcon.png'
import walletIcon from '../img/icons/walletIcon.png'
import etcIcon from '../img/icons/etcIcon.png'
import currentLocationPin from '../img/icons/currentLocationPin.png'

const markerObj = {
	phone: phoneIcon,
	clothes: clothesIcon,
	laptop: laptopIcon,
	key: keyIcon,
	wallet: walletIcon,
	etc: etcIcon,
}

const apiKey = process.env.REACT_APP_API_KEY
const containerStyle = {
	width: '100%',
	height: '100%',
	position: 'relative',
}

const browseMode = true



function MyMap({ coordinates, setCoordinates, items, radius, setPlaceData }) {

	const lostOptions = {
		strokeColor: '#ff0000',
		strokeOpacity: 0.8,
		strokeWeight: 0.5,
		fillColor: '#FF0000',
		fillOpacity: 0.35,
	}

	const currentLocationOptions = {
		strokeColor: '#007ebd',
		strokeOpacity: 0.8,
		strokeWeight: 0.5,
		fillColor: '#007ebd',
		fillOpacity: 0.35,
	}

	const foundOptions = {
		strokeColor: '#1eff00',
		strokeOpacity: 0.8,
		strokeWeight: 0.5,
		fillColor: '#1eff00;',
		fillOpacity: 0.35,
	}

	return (
		<div className='map-container'>
			<LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
				<GoogleMap
					mapContainer={'mymap'}
					mapContainerStyle={containerStyle}
					options={{
						mapTypeControl: false,
						streetViewControl: false,
						zoomControl: false,
						fullscreenControl: false,
					}}
					center={coordinates}
					zoom={12}
					onClick={(e) => {
						console.log('I am clicked, coordinates are: ')
						setCoordinates({
							lat: e.latLng.lat(),
							lng: e.latLng.lng(),
						})

						fetchPlaceDetails(e.latLng.lat(), e.latLng.lng()).then(
							(result) => setPlaceData(result)
						)
					}}
				>
					<>
						<Marker position={coordinates} icon={currentLocationPin}/>
						<Circle
							center={coordinates}
							radius={radius}
							options={currentLocationOptions}
						/>
					</>
					{browseMode &&
						items?.map((item, i) => (
							<>
								<Marker
									icon={markerObj[item?.type]}
									position={item.loc}
								/>
								<Circle
									radius={item.radius}
									center={item.loc}
									options={
										item.lost ? lostOptions : foundOptions
									}
								/>
							</>
						))}
				</GoogleMap>
			</LoadScript>
		</div>
	)
}

export default React.memo(MyMap)
