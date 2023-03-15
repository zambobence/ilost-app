import { createPlaceObj } from './createPlaceObj'
const API_KEY = process.env.REACT_APP_API_KEY

export const fetchPlaceDetails = async (lat, lng) => {
	const fetchUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
	const data = await fetch(fetchUrl)
	const inJson = await data.json()

	// calls a function that forms the place object
	const res = createPlaceObj(inJson.results[0].address_components)
	return res
}
