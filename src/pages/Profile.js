import React, { useContext, useState, useEffect } from 'react'

import { UserDataContext } from '../context/UserDataContext'
import { uploadImg } from '../functions/uploadImg'
import { AuthContext } from '../context/AuthContext'
import { db, auth } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'

import LoadingComponent from '../components/LoadingComponent'
import useUploadImg from '../customHooks/useUploadImg'
import { nanoid } from 'nanoid'
function Profile({ handleSignout }) {
	const { userData } = useContext(UserDataContext)
	const [editMode, setEditMode] = useState(false)
	const [editUserData, setEditUserData] = useState(userData)
	const [file, setFile] = useState(null)
	const [imgUrl, setImgUrl] = useState('')
	const {url, loading, error} = useUploadImg(file, `users/${userData.userId}`)

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
		updateDoc(docRef, { ...editUserData }).then(() => {
			setEditMode(false)
		})
	}

	useEffect(() => {
		setImgUrl(url)
		setEditUserData({ ...editUserData, avatarUrl: url })
	}, [url])


	return (
		<div className='container grid'>
			{loading && <LoadingComponent loadingText={'Uploading image...'} />}
			<div className='form-container'>
				<div className='profile-picture-container'>
					<div className='profile-picture-container'>
						{imgUrl !== '' ? 
							<img
							src={userData?.avatarUrl}
							className='profile-avatar'
							alt='avatar'
						/> :
						<img
						src={userData?.avatarUrl}
						className='profile-avatar'
						alt='avatar'
						/>
						}

				
						{editMode && (
						<div className='upload-profile-img-overlay'>
						<label
							className='upload-profile-img-btn'
							htmlFor='fileInput'
							aria-label='Upload photo'
						>
							<i className='fa-solid fa-upload'></i>
						</label>
						</div>
					)}
				</div>
				</div>
				{editMode && (
					<>
						<input
							id='fileInput'
							type='file'
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</>
				)}
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
		</div>
	)
}

export default Profile
