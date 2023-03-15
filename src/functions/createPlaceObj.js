export const createPlaceObj = (data) => {
	const placeObj = {}
	data.forEach((e) => (placeObj[e.types[0]] = e.long_name))
	return placeObj
}
