'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtSecret = process.env.jwtSecret;

exports.default = function _callee2(req, res, models) {
	var authorizationHeader, token;
	return regeneratorRuntime.async(function _callee2$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					authorizationHeader = req.headers['authorization'];
					token = void 0;


					if (authorizationHeader) {
						token = authorizationHeader.split(' ')[1];
					}

					if (token) {
						_jsonwebtoken2.default.verify(token, jwtSecret, function _callee(err, decoded) {
							var Users;
							return regeneratorRuntime.async(function _callee$(_context) {
								while (1) {
									switch (_context.prev = _context.next) {
										case 0:
											if (!err) {
												_context.next = 4;
												break;
											}

											res.status(401).json({
												error: 'Failed to authenticate'
											});
											_context.next = 8;
											break;

										case 4:
											Users = models.Users;
											_context.next = 7;
											return regeneratorRuntime.awrap(Users.findOne({ username: decoded.username }));

										case 7:
											return _context.abrupt('return', _context.sent);

										case 8:
										case 'end':
											return _context.stop();
									}
								}
							}, null, undefined);
						});
					} else {
						res.status(403).json({
							error: 'No token provided'
						});
					}

				case 4:
				case 'end':
					return _context2.stop();
			}
		}
	}, null, undefined);
};