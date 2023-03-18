import React,{useState, useEffect, useContext} from 'react'
import DefaultForm from '../components/DefaultForm'
import MapComponent from '../components/MapComponent'
import LocationComponent from '../components/LocationComponent'
import {getUserLocationData} from '../functions/getUserLocationData'
import Searchbar from '../components/Searchbar'
import useFethcDB from '../customHooks/useFethcDB'
import useFilterItems from '../customHooks/useFilterItems'
import LostToggler from '../components/LostToggler'
import Card from '../components/Card'

function Browse() {

    const [coordinatesFetched, setCoordinatesFetched] = useState(false)
    const [coordinates, setCoordinates] = useState({})
    const [placeData, setPlaceData] = useState({})
    const [itemArray, setItemArray] = useState([])

    
    const {filteredItemList} = useFilterItems({itemArray, coordinates})
    const {loading, fetchedData} = useFethcDB()
    
    
    const fetchLocationData = async () => {
		let res = await getUserLocationData()
		setCoordinates(res.coordinates)
		setPlaceData(res.placeData)
	}

    const CardArray = filteredItemList?.map((item) => <Card data={item} />)

    useEffect(() => {
        console.log('Fetch hook: ', fetchedData)
        setItemArray(fetchedData)
    }, [fetchedData, loading])


    useEffect(() => {
        if (!coordinatesFetched){
            fetchLocationData()
            setCoordinatesFetched(true)
        }
    },[coordinatesFetched])


    return (
    <div className='container browseui grid '>
        <div className='form-container'>
            <DefaultForm />
            <LocationComponent coordinates={coordinates} placeData={placeData} />
        </div>
        <div className='col'>
            <Searchbar
                setCoordinates={setCoordinates}
                setPlaceData={setPlaceData}
                getCurrentLocation={fetchLocationData}
            />

            <MapComponent coordinates={coordinates} setCoordinates={setCoordinates} setPlaceData={setPlaceData} itemsToDisplay={filteredItemList} browseMode={true}/>
        </div>
        <div className='card-container'>
            {loading ? <p>Loading</p> : CardArray}
        </div>
    </div>
  )
}

export default Browse