'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongodb = require('mongodb');

//const MONGO_URL = 'mongodb://localhost:27017/tustak'
var MONGO_URL = process.env.mongoURL || 'mongodb://localhost:27017/tustak';

var db;
var Users;
var Items;
var Views;

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
					Views = db.collection('views');
					return _context.abrupt('return', { Users: Users, Items: Items, Views: Views });

				case 10:
					_context.prev = 10;
					_context.t0 = _context['catch'](0);

					console.log(_context.t0);

				case 13:
				case 'end':
					return _context.stop();
			}
		}
	}, null, undefined, [[0, 10]]);
};

exports.default = getModels;