'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (array) {
	var newArray = lowerCase(array);
	return newArray;
};

function lowerCase(array) {
	var keys = Object.keys(array);
	var newArray = {};
	keys.map(function (key) {
		if (key !== 'password') {
			newArray[key] = array[key].toLowerCase();
		} else {
			newArray[key] = array[key];
		}
	});
	return newArray;
}