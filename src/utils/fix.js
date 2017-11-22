
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCase(array) {
	const keys = Object.keys(array)
	const newArray = {}
	keys.map(key => {
		if (key === 'firstName' || key === 'lastName') {
			newArray[key] = capitalizeFirstLetter(array[key])
		}
		else if (key !== 'password' && key !== 'offered' && key !== 'requested') {
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