import React,{useState, useEffect} from 'react'
import DefaultForm from '../components/DefaultForm'
import MapComponent from '../components/MapComponent'
import LocationComponent from '../components/LocationComponent'
import {getUserLocationData} from '../functions/getUserLocationData'
import Searchbar from '../components/Searchbar'
function Browse() {

    const [coordinatesFetched, setCoordinatesFetched] = useState(false)
    const [coordinates, setCoordinates] = useState({})
    const [placeData, setPlaceData] = useState({})


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
    <div className='grid container'>
        <div className='form-container'>
            <DefaultForm />
            <LocationComponent coordinates={coordinates} placeData={placeData} />
        </div>

        <Searchbar
            setCoordinates={setCoordinates}
            setPlaceData={setPlaceData}
            getCurrentLocation={fetchLocationData}
		/>

        <MapComponent coordinates={coordinates} setCoordinates={setCoordinates} setPlaceData={setPlaceData}/>
    </div>
  )
}

export default Browse