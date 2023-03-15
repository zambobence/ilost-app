import React from 'react'

export const SideBarData = [
	{
		name: 'Home',
		icon: <i className='fa-solid fa-house'></i>,
		path: '/',
		visibility: 'public',
	},
	{
		name: 'Login',
		icon: <i className='fa-solid fa-arrow-right-to-bracket'></i>,
		path: '/login',
		visibility: '',
	},
	{
		name: 'Register',
		icon: <i className='fa-solid fa-user-plus'></i>,
		path: '/register',
		visibility: '',
	},
	{
		name: 'Browse',
		icon: <i className='fa-solid fa-glasses'></i>,
		path: '/',
		visibility: 'public',
	},

	{
		name: 'Add item',
		icon: <i className='fa-solid fa-plus'></i>,
		path: '/additem',
		visibility: 'authUser',
	},
	{
		name: 'Profile',
		icon: <i className='fa-regular fa-circle-user'></i>,
		path: '/profile',
		visibility: 'authUser',
	},
	{
		name: 'My Items',
		icon: <i className='fa-solid fa-box-open'></i>,
		path: './myitems',
		visibility: 'authUser',
	},
]
