import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { onSnapshot, doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase'
import useFethcDB from '../customHooks/useFethcDB'
import useFetchDocument from '../customHooks/useFetchDocument'
import MapComponent from '../components/MapComponent'
import { ItemDataContext } from '../context/ItemDataContext'
import DistanceComponent from '../components/DistanceComponent'
import LocationComponent from '../components/LocationComponent'
import DateComponent from '../components/DateComponent'
import imgaePlaceholder from '../img/image_placeholder.jpg'

function ItemPage() {
    const {id} = useParams()
    const {authUser} = useContext(AuthContext)
    const {fetchedData, loading, error} = useFetchDocument('items', id)
    

	
  return (
    <div className='container grid'>
        
        
        <div className='col'>
            {loading ? <p>Loading...</p> : (
                <div>
                    <img className='item-image' src={fetchedData?.image || 'https://source.unsplash.com/random/400x400'} alt='item'/>
                    <span>{fetchedData.type}</span>
                    <span>{fetchedData.color}</span>
                    <h3>{fetchedData?.title}</h3>
                    <LocationComponent coordinates={fetchedData?.loc} placeData={fetchedData?.placeData}/>
                    <DateComponent date={fetchedData?.date} />
                    <p className='description'>{fetchedData?.description}</p>
                </div>
            )}
        </div>
        <MapComponent static={true} coordinates={fetchedData?.loc} itemRadius={fetchedData?.radius}/>

    </div>
  )
}

export default ItemPage