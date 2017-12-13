function toRadians(x) {
	return x * Math.PI / 180;
}

export default (a, b) => {
	let R = 6371;
	let s1 = toRadians(a[0]);
	let s2 = toRadians(b[0]);
	let ds = toRadians(b[0] - a[0]);
	let dl = toRadians(b[1] - a[1]);
	let h = Math.sin(ds/2) * Math.sin(ds/2) + Math.cos(s1) * Math.cos(s2) + Math.sin(dl/2) * Math.sin(dl/2);
	let c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1-h));
	let d = R * c;
	console.log(s1);
	console.log(dl);
	return d
}