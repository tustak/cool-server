"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function toRadians(x) {
	return x * Math.PI / 180;
}

exports.default = function (a, b) {
	var R = 6371;
	var s1 = toRadians(a[0]);
	var s2 = toRadians(b[0]);
	var ds = toRadians(b[0] - a[0]);
	var dl = toRadians(b[1] - a[1]);
	var h = Math.sin(ds / 2) * Math.sin(ds / 2) + Math.cos(s1) * Math.cos(s2) + Math.sin(dl / 2) * Math.sin(dl / 2);
	var c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
	var d = R * c;
	console.log(s1);
	console.log(dl);
	return d;
};