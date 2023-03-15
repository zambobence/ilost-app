// This function will remove the empty criteria of the criteria object

export const filterEmptyCriteria = (data) => {
	const notEmptyObj = {}
	for (const [k, v] of Object.entries(data)) {
		if (v !== k) {
			notEmptyObj[k] = v
		}
	}
	return notEmptyObj
}
