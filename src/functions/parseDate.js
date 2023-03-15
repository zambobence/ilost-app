const parseDate = (dateObj) => {
	console.log(dateObj)
	const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
	const date = new Date(dateObj)
	return date.toLocaleDateString(undefined, options)
}

export default parseDate
