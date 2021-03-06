import jwt from 'jsonwebtoken';

const jwtSecret = process.env.jwtSecret || require('../../config').default.jwtSecret

export default async (req, res, models) => {
	const authorizationHeader = req.headers['authorization'];
	let token;

	if (authorizationHeader) {
		token = authorizationHeader.split(' ')[1];
	}

	if (token) {
		jwt.verify(token, jwtSecret, async (err, decoded) => {
			if (err) {
				res.status(401).json({
					error: 'Failed to authenticate'
				})
			} else {
				const Users = models.Users
				return await Users.findOne({username: decoded.username})
			}
		})
	} else {
		res.status(403).json({
			error: 'No token provided'
		})
	}
}