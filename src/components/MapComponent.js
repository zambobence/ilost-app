import React, { useEffect, useState, useContext } from 'react'
import {
	Marker,
	Circle,
	GoogleMap,
	LoadScript,
} from '@react-google-maps/api'
import { fetchPlaceDetails } from '../functions/fetchPlaceDetails'
import { ItemDataContext } from '../context/ItemDataContext'

import phoneIcon from '../img/icons/phoneIcon.png'
import clothesIcon from '../img/icons/clothesIcon.png'
import laptopIcon from '../img/icons/laptopIcon.png'
import keyIcon from '../img/icons/keyIcon.png'
import walletIcon from '../img/icons/walletIcon.png'
import etcIcon from '../img/icons/etcIcon.png'
import currentLocationPin from '../img/icons/currentLocationPin.png'


function MapComponent({coordinates, setCoordinates, setPlaceData, itemRadius, itemsToDisplay, browseMode}) {
    const {radius} = useContext(ItemDataContext)
	const [ libraries ] = useState(['places']);
	const apiKey = process.env.REACT_APP_API_KEY

const containerStyle = {
	width: '100%',
	height: '100%',
	position: 'relative',
}

    
	const currentLocationOptions = {
		strokeColor: '#007ebd',
		strokeOpacity: 0.8,
		strokeWeight: 0.5,
		fillColor: '#007ebd',
		fillOpacity: 0.35,
	}

	const lostCircleStyle = {
		strokeColor: '#ff0000',
		strokeOpacity: 0.8,
		strokeWeight: 0.5,
		fillColor: '#FF0000',
		fillOpacity: 0.35,
	}

	const foundCircleStyle = {
		strokeColor: '#1eff00',
		strokeOpacity: 0.8,
		strokeWeight: 0.5,
		fillColor: '#1eff00;',
		fillOpacity: 0.35,
	}

	const markerObj = {
		phone: phoneIcon,
		clothes: clothesIcon,
		laptop: laptopIcon,
		key: keyIcon,
		wallet: walletIcon,
		etc: etcIcon,
	}


    
	
	const MarkerArray = itemsToDisplay?.map((item, i) => (
		<>
			<Marker
				icon={markerObj[item?.type]}
				position={item.loc}
			/>
			<Circle
				radius={item.radius}
				center={item.loc}
				options={
					item.lost ? lostCircleStyle : foundCircleStyle
				}
			/>
		</>))

	return (
		<div className='map-container'>
			<LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            
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
							radius={itemRadius || radius}
							options={currentLocationOptions}
						/>
					</>
					{MarkerArray}
				
				</GoogleMap>
			</LoadScript>
		</div>
    )
}

export default MapComponent