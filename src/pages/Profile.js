import React, { useContext, useState, useEffect } from 'react'
import { UserDataContext } from '../context/UserDataContext'
import { AuthContext } from '../context/AuthContext'
import { db, auth } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import Card from '../components/Card'
import useFetchQuery from '../customHooks/useFetchQuery'
import NoItemsComponent from '../components/NoItemsComponent'

function Profile({ handleSignout }) {
	const { userData } = useContext(UserDataContext)
	const [editMode, setEditMode] = useState(false)
	const [editUserData, setEditUserData] = useState(userData)
	const {data, loading: fetchItemsLoading, error: fetchItemserror} = useFetchQuery('items', 'addedByUser', userData?.userId)

    const CardArray = data?.map((item) => <Card data={item} />)


	const toggleEdit = () => {
		setEditMode((prevState) => !prevState)
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setEditUserData((prevData) => ({ ...prevData, [name]: value }))
	}

	async function handleSave(e) {
		e.preventDefault()
		const docRef = doc(db, 'users', userData.userId)
			updateDoc(docRef, { ...editUserData}).then(() => {
			setEditMode(false)
		})
	}

	
	console.log('Profile page: ', userData)

	return (
		<div className='container grid profile-page'>
			<div className='form-container'>
								<input
					placeholder='First name'
					name='fname'
					value={editUserData?.fname}
					readOnly={!editMode}
					className={editMode ? 'edit' : 'read'}
					type='text'
					onChange={handleChange}
				/>
				<input
					placeholder='Last name'
					name='lname'
					value={editUserData?.lname}
					readOnly={!editMode}
					className={editMode ? 'edit' : 'read'}
					type='text'
					onChange={handleChange}
				/>
				<input
					placeholder='Email'
					value={editUserData?.email}
					readOnly={!editMode}
					className={editMode ? 'edit' : 'read'}
					name='email'
					type='email'
					onChange={handleChange}
				/>
				<input
					placeholder='Phone'
					value={editUserData?.phone}
					readOnly={!editMode}
					className={editMode ? 'edit' : 'read'}
					name='phone'
					type='tel'
					onChange={handleChange}
				/>
					<div className='btn-container'>
						<button
							className='btn btn-save'
							onClick={editMode ? handleSave : toggleEdit}
						>
						{editMode ? 'Save profile' : 'Edit profile'}
						</button>
						<button className='btn btn-del'>Delete account</button>
						<button className='btn btn-signout' onClick={handleSignout}>
							Sign out
						</button>
					</div>
			</div>
			<div className='own-items-container'>
				<h3>My items</h3>
				<div className='card-container'>
						{fetchItemsLoading ? <p>Loading</p>  :
						CardArray?.length > 0 ? CardArray : <NoItemsComponent />}
				</div>
			</div>		
		</div>
	)
}

export default Profile
