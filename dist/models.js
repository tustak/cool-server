'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongodb = require('mongodb');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const MONGO_URL = 'mongodb://localhost:27017/tustak'
var MONGO_URL = _config2.default.mongoURL;

var db;
var Users;
var Items;

var getModels = function _callee() {
	return regeneratorRuntime.async(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.prev = 0;
					_context.next = 3;
					return regeneratorRuntime.awrap(_mongodb.MongoClient.connect(MONGO_URL));

				case 3:
					db = _context.sent;


					Users = db.collection('users');
					Items = db.collection('items');
					return _context.abrupt('return', { Users: Users, Items: Items });

				case 9:
					_context.prev = 9;
					_context.t0 = _context['catch'](0);

					console.log(_context.t0);

				case 12:
				case 'end':
					return _context.stop();
			}
		}
	}, null, undefined, [[0, 9]]);
};

exports.default = getModels;