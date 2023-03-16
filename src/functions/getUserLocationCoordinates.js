export async function getUserLocationCoordinates() {
	const pos = await fetchLocationAPI()
	return { lat: pos.coords.latitude, lng: pos.coords.longitude }
}

function fetchLocationAPI() {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
}
