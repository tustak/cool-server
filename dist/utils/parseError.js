'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (errorMsg) {
	return errorMsg.split(': ')[1];
};