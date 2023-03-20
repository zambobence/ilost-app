import React, {useContext, useState, useEffect, useInsertionEffect} from 'react'
import {useParams} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { onSnapshot, doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase'
import useFethcDB from '../customHooks/useFethcDB'
import useFetchDocument from '../customHooks/useFetchDocument'
import MapComponent from '../components/MapComponent'
import { ItemDataContext } from '../context/ItemDataContext'
import LocationComponent from '../components/LocationComponent'
import DateComponent from '../components/DateComponent'
import imgaePlaceholder from '../img/image_placeholder.jpg'
import AuthorComponent from '../components/AuthorComponent'
import Modal from '../components/Modal'
import ColorComponent from '../components/ColorComponent'
import TypeComponent from '../components/TypeComponent'

function ItemPage() {
    const {id} = useParams()
    const {authUser} = useContext(AuthContext)
    const {fetchedData: itemData, loading: itemLoading, error: itemError} = useFetchDocument('items', id)
    const {fetchedData: authorData, loading: authorLoading, error: authorError} = useFetchDocument('users', itemData?.addedBy)
    const [openModal, setOpenModal] = useState(false)

    return (
        <div className='container grid item-page'>
            <Modal openModal={openModal} setOpenModal={setOpenModal} src={itemData?.imgUrl || 'https://source.unsplash.com/random/400x400'} />
            <div className='col'>
                {itemLoading ? <p>Loading...</p> : (
                    <>
                    <div className>
                        <img className='item-image' onClick={()=>setOpenModal(true)} src={itemData?.imgUrl || 'https://source.unsplash.com/random/400x400'} alt='item'/>
                        <h3>{itemData?.title}</h3>
                        <ColorComponent color={itemData?.color} />
                        <TypeComponent type={itemData?.type} />
                        <LocationComponent coordinates={itemData?.loc} placeData={itemData?.placeData}/>
                        <DateComponent date={itemData?.date} />
                        <p className='description'>{itemData?.description}</p>
                    </div>
                    
                    {authorLoading ? <p>Loading...</p> : <AuthorComponent authorData={authorData} />}
                    
                </>
                )}
            </div>
            <MapComponent static={true} coordinates={itemData?.loc} itemRadius={itemData?.radius}/>

    </div>
  )
}

export default ItemPage