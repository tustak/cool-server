
function lowerCase(array) {
	const keys = Object.keys(array)
	const newArray = {}
	keys.map(key => {
		if (key !== 'password') {
			newArray[key] = array[key].toLowerCase()
		}
		else {
			newArray[key] = array[key]	
		}
	})
	return newArray
}

export default function(array) {
	let newArray = lowerCase(array)
	return newArray
}