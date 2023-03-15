import logo from './logo.svg'
import './App.css'
import React, { useState, useEffect, useContext } from 'react'
import { Navigate, Link, Routes, Route, useNavigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Header from './components/Header'
import AddUI from './components/AddUI'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import ItemPage from './components/ItemPage'
import getDistance from './functions/getDistance'
import sumOfRadius from './functions/sumOfRadius'
import { fetchPlaceDetails } from './functions/fetchPlaceDetails'
import { getUserLocationCoordinates } from './functions/getUserLocationCoordinates'
import { db, auth, storage } from './firebase'
import { collection, getDocs, onSnapshot, doc } from 'firebase/firestore'
import { getUserLocationData } from './functions/getUserLocationData'
import { UserDataContext } from './context/UserDataContext'
import { signOut } from 'firebase/auth'
import MyItemsPage from './components/MyItemsPage'
import BrowseContainer from './components/BrowseContainer'
import data from './components/cardtestdata'
function App() {
	const typeArray = [
		'Type',
		'phone',
		'laptop',
		'clothes',
		'key',
		'wallet',
		'etc',
	]
	const colorArray = [
		'Color',
		'silver',
		'gray',
		'white',
		'maroon',
		'red',
		'purple',
		'fuchsia',
		'green',
		'lime',
		'olive',
		'yellow',
		'navy',
		'blue',
		'teal',
		'aqua',
	]


	const { authUser } = useContext(AuthContext)
	const currentUser = authUser?.uid
	const navigate = useNavigate()
	const { setUserData } = useContext(UserDataContext)
	//
	//  console.log('Current user is? ', currentUser)
	// if there is no user authenticated it navigates back to first page
	const RequireAuth = ({ children }) => {
		return currentUser ? children : <Navigate to='/signin' />
	}

	const [coordinates, setCoordinates] = useState({})
	const [itemList, setItemList] = useState([])
	const [filteredItemList, setFilteredItemList] = useState([])
	const [type, setType] = useState('Type')
	const [color, setColor] = useState('Color')
	const [radius, setRadius] = useState(50)
	const [lost, setLost] = useState(true)
	const [placeData, setPlaceData] = useState({})

	const toggleLost = () => {
		setLost((prevState) => !prevState)
	}

	const handleSignout = async () => {
		signOut(auth)
			.then(() => {
				console.log('Signout succesful')
				navigate('/login')
				setUserData({})
			})
			.catch((e) => console.log(e))
	}



	// it calls the get getUserLocationFunction which calls the following function
	// 1. getUserLocationCoordinates --> returns coordinates
	// 2. fetchPlaceDetails --> using the coordinates returned fetches the google place api
	// and returns an object
	// 3. afterward it sets the useStates
	
	const handleGetUserLocation = () => {
		getUserLocationData().then((res) => {
			setCoordinates(res.coordinates)
			setPlaceData(res.placeData)
		})
	}
	
	const fetchItemDB = () => {
		const colRef = collection(db, 'items')
		onSnapshot(colRef, (snapshot) => {
			const items = snapshot.docs.map((doc) => ({ ...doc.data() }))
			setItemList(items)
			setFilteredItemList(
				filterOverlaps(items)?.filter((e) => e.lost === !lost)
			)
		})
	}

	const filterOverlaps = (itemArray) => {
		return itemArray.filter(
			(e) =>
				sumOfRadius(e.radius, radius) > getDistance(e.loc, coordinates)
		)
	}

	const filterItems = () => {
		const allOverlappingItems = filterOverlaps(itemList)
		const filteredOverlapppingItemsLostFound = allOverlappingItems.filter(
			(e) => e.lost === !lost
		)

		if (color !== 'Color' && type !== 'Type') {
			const filterItemList = filteredOverlapppingItemsLostFound
				.filter((e) => e.color === color)
				.filter((e) => e.type === type)
			setFilteredItemList(filterItemList)
		} 
		else if (color !== 'Color' && type === 'Type') {
			const filterItemList = filteredOverlapppingItemsLostFound.filter(
				(e) => e.color === color
			)
			setFilteredItemList(filterItemList)
		} 
		else if (type !== 'Type' && color === 'Color') {
			const filterItemList = filteredOverlapppingItemsLostFound.filter(
				(e) => e.type === type
			)
			setFilteredItemList(filterItemList)
		} 
		else {
			setFilteredItemList(filteredOverlapppingItemsLostFound)
		}
	}

	function clearCriteria() {
		setType('Type')
		setColor('Color')
		setRadius(50)
	}


	// Retrieves the data form the db

	useEffect(() => {
		fetchItemDB()
	}, [])

	useEffect(() => {
		handleGetUserLocation()
	}, [])

	useEffect(() => {
		filterItems()
	}, [color, type, radius, lost, coordinates])


	return (
		<div className='wrapper'>
			<Header
				clearCriteria={clearCriteria}
				handleSignout={handleSignout}
			/>

			<main className='grid'>
				<Routes>
					<Route
						path='/'
						element={
							<BrowseContainer
								colorArray={colorArray}
								typeArray={typeArray}
								coordinates={coordinates}
								userLocationPlaceData={placeData}
								allItems={itemList}
							/>
						}
					/>
					<Route
						path='/myitems'
						element={
							<RequireAuth>
								<MyItemsPage
									currentUser={currentUser}
									items={itemList}
								/>
							</RequireAuth>
						}
					/>

					<Route
						path='/additem'
						element={
							<RequireAuth>
								<AddUI
									colorArray={colorArray}
									typeArray={typeArray}
									coordinates={coordinates}
									userLocationPlaceData={placeData}
								/>
							</RequireAuth>
						}
					/>
					<Route
						path='/profile'
						element={
							<RequireAuth>
								<Profile
									handleSignout={handleSignout}
									items={itemList}
								/>
							</RequireAuth>
						}
					/>

					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<Navigate to='/' />} />
					<Route
						path='/item/:itemId'
						element={
							<ItemPage
								items={itemList}
								currentUser={currentUser}
							/>
						}
					/>
				</Routes>
			</main>
		</div>
	)
}

export default App
