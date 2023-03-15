import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'

function MyItemsPage({ items, currentUser }) {
	const listItems = items
		?.filter((item) => item.addedBy?.userId === currentUser)
		.map((item) => <Card key={item.id} itemData={item} />)

	return (
		<div className='my-items-container'>
			{listItems?.length < 1 ? (
				<div className='no-items-container'>
					<h1>Ooh, seems like have not added any item.</h1>
					<h3>
						<Link to='/additem'>
							<i className='fa-solid fa-circle-plus'></i>
							Add a new item
						</Link>
					</h3>
				</div>
			) : (
				listItems
			)}
		</div>
	)
}

export default MyItemsPage
