import React from 'react'
import { Link } from 'react-router-dom'
import getRandomNumber from '../functions/getRandomNumber'
import parseDate from '../functions/parseDate'
import './Card.css'
function Card({ itemData, setCoordinates }) {

	const { title, id, type, color, imgUrl, loc, placeData, lost, date } = itemData

	return (
		<div className='card'>
			<img
				src={
					imgUrl ||
					`https://source.unsplash.com/random/200x200/?${type}/${getRandomNumber()}/`
				}
				className='card-img'
			/>

			<div className='card-text-container'>
				<h3 className='card-title'>
					<Link to={`/item/${id}`}>{title}</Link>
				</h3>
				<h4>Type: <span className='item-text'>{type}</span></h4>
				<h4>Color <span className='item-text'>{color}</span></h4>
				<h4 className='truncate'>
					<i
						className='fa-solid location-pin fa-location-pin'
						onClick={() =>
							setCoordinates({ lat: loc.lat, lng: loc.lng })
						}
					></i>
					<span className='item-text'>{placeData?.postal_code} {placeData?.political}{' '}
					{placeData?.locality} {placeData?.route}</span>
				</h4>
				{date!=='' && (
					<h4>
						{lost ? 'Lost' : 'Found'} on <span className='item-text'>{parseDate(date)}</span>
					</h4>
				)}
			</div>
		</div>
	)
}

export default Card
