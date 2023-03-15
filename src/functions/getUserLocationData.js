import { fetchPlaceDetails } from './fetchPlaceDetails'
import { getUserLocationCoordinates } from './getUserLocationCoordinates'

export const getUserLocationData = async () => {
	const coordinateObject = await getUserLocationCoordinates()
	const { lat, lng } = coordinateObject
	const placeData = await fetchPlaceDetails(lat, lng)
	return { coordinates: coordinateObject, placeData }
}
