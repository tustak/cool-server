'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (array) {
	var newArray = lowerCase(array);
	return newArray;
};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCase(array) {
	var keys = Object.keys(array);
	var newArray = {};
	keys.map(function (key) {
		if (key === 'firstName' || key === 'lastName') {
			newArray[key] = capitalizeFirstLetter(array[key]);
		} else if (key !== 'password' && key !== 'offered' && key !== 'requested') {
			newArray[key] = array[key].toLowerCase();
		} else {
			newArray[key] = array[key];
		}
	});
	return newArray;
}