import React, { useEffect, useState, useContext } from 'react'
import {
	Marker,
	Circle,
	GoogleMap,
	LoadScript,
} from '@react-google-maps/api'
import currentLocationPin from '../img/icons/currentLocationPin.png'
import { fetchPlaceDetails } from '../functions/fetchPlaceDetails'
import { ItemDataContext } from '../context/ItemDataContext'

const containerStyle = {
	width: '100%',
	height: '100%',
	position: 'relative',
}



function MapComponent({coordinates, setCoordinates, setPlaceData}) {
    const {radius} = useContext(ItemDataContext)
    
	const currentLocationOptions = {
		strokeColor: '#007ebd',
		strokeOpacity: 0.8,
		strokeWeight: 0.5,
		fillColor: '#007ebd',
		fillOpacity: 0.35,
	}
    const [ libraries ] = useState(['places']);
	const apiKey = process.env.REACT_APP_API_KEY
	


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
						<Marker position={coordinates} icon={currentLocationPin} />
						<Circle
							center={coordinates}
							radius={radius}
							options={currentLocationOptions}
						/>
					</>
				</GoogleMap>
			</LoadScript>
		</div>
    )
}

export default MapComponent