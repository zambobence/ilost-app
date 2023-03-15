import React, { useEffect, useState } from 'react'
import Card from './Card'
import data from './cardtestdata'

function List({ setCoordinates, items }) {
	const listItems = items?.map((item) => (
		<Card key={item.id} setCoordinates={setCoordinates} itemData={item} />
	))
	const dummyData = data?.map((item) => (
		<Card key={item.id} setCoordinates={setCoordinates} itemData={item} />
	))

	return (
		<div className='list-container'>
			{listItems?.length < 1 ? (
				<h1 className='noMatchReply'>
					No match please refine the search criteria. 😥🙈
				</h1>
			) : (
				<>{listItems}</>
			)}
		</div>
	)
}

export default List
