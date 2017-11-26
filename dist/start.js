'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _mongodb = require('mongodb');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _graphqlTools = require('graphql-tools');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _typeDefs = require('./typeDefs.js');

var _typeDefs2 = _interopRequireDefault(_typeDefs);

var _formValidation = require('./utils/formValidation');

var _formValidation2 = _interopRequireDefault(_formValidation);

var _validationError = require('./errors/validationError');

var _validationError2 = _interopRequireDefault(_validationError);

var _authenticate = require('./middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _fix = require('./utils/fix');

var _fix2 = _interopRequireDefault(_fix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//---------


// COnfig


//-Files---
var jwtSecret = process.env.jwtSecret || require('../config').default.jwtSecret;
var mongoURL = process.env.mongoURL || 'mongodb://localhost:27017/tustak';

var URL = 'http://localhost';
var PORT = process.env.PORT || 3001;
//const MONGO_URL = 'mongodb://localhost:27017/tustak'
var MONGO_URL = mongoURL;

var prepare = function prepare(o) {
  o._id = o._id.toString();
  return o;
};

var start = exports.start = function _callee() {
  var models, Users, Items, Views, resolvers, schema, app;
  return regeneratorRuntime.async(function _callee$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return regeneratorRuntime.awrap((0, _models2.default)());

        case 3:
          models = _context17.sent;
          Users = models.Users; //db.collection('users')

          Items = models.Items; //db.collection('items')

          Views = models.Views;
          resolvers = {
            Query: {
              userById: function userById(root, _ref) {
                var _id = _ref._id;
                return regeneratorRuntime.async(function userById$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = prepare;
                        _context.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_id)));

                      case 3:
                        _context.t1 = _context.sent;
                        return _context.abrupt('return', (0, _context.t0)(_context.t1));

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, null, undefined);
              },
              users: function users() {
                return regeneratorRuntime.async(function users$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return regeneratorRuntime.awrap(Users.find({}).toArray());

                      case 2:
                        _context2.t0 = prepare;
                        return _context2.abrupt('return', _context2.sent.map(_context2.t0));

                      case 4:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, null, undefined);
              },
              itemById: function itemById(root, _ref2) {
                var _id = _ref2._id;
                return regeneratorRuntime.async(function itemById$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.t0 = prepare;
                        _context3.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(_id)));

                      case 3:
                        _context3.t1 = _context3.sent;
                        return _context3.abrupt('return', (0, _context3.t0)(_context3.t1));

                      case 5:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, null, undefined);
              },
              items: function items() {
                return regeneratorRuntime.async(function items$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return regeneratorRuntime.awrap(Items.find({}).toArray());

                      case 2:
                        _context4.t0 = prepare;
                        return _context4.abrupt('return', _context4.sent.map(_context4.t0));

                      case 4:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            User: {
              offered: function offered(user) {
                return regeneratorRuntime.async(function offered$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return regeneratorRuntime.awrap(Items.find({ _id: { $in: user.offered } }).toArray());

                      case 2:
                        return _context5.abrupt('return', _context5.sent);

                      case 3:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, null, undefined);
              },
              requested: function requested(user) {
                return regeneratorRuntime.async(function requested$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return regeneratorRuntime.awrap(Items.find({ _id: { $in: user.requested } }).toArray());

                      case 2:
                        return _context6.abrupt('return', _context6.sent);

                      case 3:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Item: {
              user: function user(_ref3) {
                var userId = _ref3.userId;
                return regeneratorRuntime.async(function user$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.t0 = prepare;
                        _context7.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context7.t1 = _context7.sent;
                        return _context7.abrupt('return', (0, _context7.t0)(_context7.t1));

                      case 5:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, null, undefined);
              },
              views: function views(item) {
                return regeneratorRuntime.async(function views$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return regeneratorRuntime.awrap(Views.find({ _id: { $in: item.views } }).toArray());

                      case 2:
                        return _context8.abrupt('return', _context8.sent);

                      case 3:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            View: {
              user: function user(_ref4) {
                var userId = _ref4.userId;
                return regeneratorRuntime.async(function user$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.t0 = prepare;
                        _context9.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context9.t1 = _context9.sent;
                        return _context9.abrupt('return', (0, _context9.t0)(_context9.t1));

                      case 5:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                }, null, undefined);
              },
              item: function item(_ref5) {
                var itemId = _ref5.itemId;
                return regeneratorRuntime.async(function item$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.t0 = prepare;
                        _context10.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(itemId)));

                      case 3:
                        _context10.t1 = _context10.sent;
                        return _context10.abrupt('return', (0, _context10.t0)(_context10.t1));

                      case 5:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Mutation: {
              createUser: function createUser(root, args, context, info) {
                var errors, errorList, res, user, token;
                return regeneratorRuntime.async(function createUser$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        errors = (0, _formValidation2.default)(_lodash2.default.omit(args, 'offered', 'requested'));
                        _context11.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.username.toLowerCase() }));

                      case 3:
                        if (!_context11.sent) {
                          _context11.next = 5;
                          break;
                        }

                        errors['username'] = 'User ' + args.username.toLowerCase() + ' already exists';

                      case 5:
                        _context11.next = 7;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.email.toLowerCase() }));

                      case 7:
                        if (!_context11.sent) {
                          _context11.next = 9;
                          break;
                        }

                        errors['email'] = 'Email already used';

                      case 9:
                        if ((0, _isEmpty2.default)(errors)) {
                          _context11.next = 15;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 15:
                        _context11.next = 17;
                        return regeneratorRuntime.awrap(Users.insert((0, _fix2.default)(args)));

                      case 17:
                        res = _context11.sent;
                        _context11.t0 = prepare;
                        _context11.next = 21;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: res.insertedIds[0] }));

                      case 21:
                        _context11.t1 = _context11.sent;
                        user = (0, _context11.t0)(_context11.t1);
                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context11.abrupt('return', { token: token, user: user });

                      case 25:
                      case 'end':
                        return _context11.stop();
                    }
                  }
                }, null, undefined);
              },
              signinUser: function signinUser(root, args, context, info) {
                var user, token, _user, _token;

                return regeneratorRuntime.async(function signinUser$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.usernameOrEmail.toLowerCase() }));

                      case 2:
                        if (!_context12.sent) {
                          _context12.next = 14;
                          break;
                        }

                        _context12.next = 5;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.usernameOrEmail.toLowerCase(), password: args.password }));

                      case 5:
                        user = _context12.sent;

                        if (!user) {
                          _context12.next = 11;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context12.abrupt('return', { token: token, user: user });

                      case 11:
                        throw new _validationError2.default('Password incorrect');

                      case 12:
                        _context12.next = 29;
                        break;

                      case 14:
                        _context12.next = 16;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.usernameOrEmail.toLowerCase() }));

                      case 16:
                        if (!_context12.sent) {
                          _context12.next = 28;
                          break;
                        }

                        _context12.next = 19;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.usernameOrEmail.toLowerCase(), password: args.password }));

                      case 19:
                        _user = _context12.sent;

                        if (!_user) {
                          _context12.next = 25;
                          break;
                        }

                        _token = _jsonwebtoken2.default.sign(_lodash2.default.omit(_user, 'password'), jwtSecret);
                        return _context12.abrupt('return', { token: _token, user: _user });

                      case 25:
                        throw new _validationError2.default('Password incorrect');

                      case 26:
                        _context12.next = 29;
                        break;

                      case 28:
                        throw new _validationError2.default("User not found");

                      case 29:
                      case 'end':
                        return _context12.stop();
                    }
                  }
                }, null, undefined);
              },
              updateUser: function updateUser(root, args, context, info) {
                var currentUser, errors, errorList, updateArgs, updatedUser, user, token;
                return regeneratorRuntime.async(function updateUser$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        currentUser = (0, _authenticate2.default)(context.req, context.res, models);
                        errors = (0, _formValidation2.default)(args, true);

                        if ((0, _isEmpty2.default)(errors)) {
                          _context13.next = 6;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 6:
                        updateArgs = _lodash2.default.omit(args, '_id');
                        _context13.next = 9;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args._id) }, { $set: updateArgs
                        }, { returnNewDocument: true }));

                      case 9:
                        updatedUser = _context13.sent;
                        _context13.next = 12;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args._id) }));

                      case 12:
                        user = _context13.sent;

                        if (!user) {
                          _context13.next = 16;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context13.abrupt('return', { token: token, user: user });

                      case 16:
                      case 'end':
                        return _context13.stop();
                    }
                  }
                }, null, undefined);
              },
              changePassword: function changePassword(root, args, context, info) {
                var currentUser, errors, errorList, updatedUser, user, token;
                return regeneratorRuntime.async(function changePassword$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        currentUser = (0, _authenticate2.default)(context.req, context.res, models);
                        errors = (0, _formValidation2.default)(args, true);

                        if ((0, _isEmpty2.default)(errors)) {
                          _context14.next = 6;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 6:
                        _context14.next = 8;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args._id), password: args.currentPassword }, { $set: { password: args.password }
                        }, { returnNewDocument: true }));

                      case 8:
                        updatedUser = _context14.sent;
                        _context14.next = 11;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args._id), password: args.password }));

                      case 11:
                        user = _context14.sent;

                        if (!user) {
                          _context14.next = 17;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context14.abrupt('return', { token: token, user: user });

                      case 17:
                        throw new _validationError2.default("Password incorrect");

                      case 18:
                      case 'end':
                        return _context14.stop();
                    }
                  }
                }, null, undefined);
              },
              createItem: function createItem(root, args, context, info) {
                var errors, errorList, res, item, updatedUser, user, token;
                return regeneratorRuntime.async(function createItem$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        console.log(args);
                        errors = (0, _formValidation2.default)(_lodash2.default.omit(args, 'views'));

                        if ((0, _isEmpty2.default)(errors)) {
                          _context15.next = 8;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 8:
                        _context15.next = 10;
                        return regeneratorRuntime.awrap(Items.insert((0, _fix2.default)(args)));

                      case 10:
                        res = _context15.sent;
                        _context15.t0 = prepare;
                        _context15.next = 14;
                        return regeneratorRuntime.awrap(Items.findOne({ _id: res.insertedIds[0] }));

                      case 14:
                        _context15.t1 = _context15.sent;
                        item = (0, _context15.t0)(_context15.t1);
                        _context15.next = 18;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.userId) }, { $set: {
                            lastLocation: args.location,
                            lastLatitude: args.latitude,
                            lastLongitude: args.longitude
                          },
                          $push: {
                            offered: res.insertedIds[0]
                          }
                        }, { returnNewDocument: true }));

                      case 18:
                        updatedUser = _context15.sent;
                        _context15.next = 21;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userId) }));

                      case 21:
                        user = _context15.sent;

                        if (!(item && user)) {
                          _context15.next = 25;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context15.abrupt('return', { token: token, item: item });

                      case 25:
                      case 'end':
                        return _context15.stop();
                    }
                  }
                }, null, undefined);
              },

              createView: function createView(root, args, context, info) {
                var res, updateItem;
                return regeneratorRuntime.async(function createView$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        console.log(args);
                        _context16.next = 3;
                        return regeneratorRuntime.awrap(Views.insert(args));

                      case 3:
                        res = _context16.sent;
                        _context16.next = 6;
                        return regeneratorRuntime.awrap(Items.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.item) }, {
                          $push: {
                            views: res.insertedIds[0]
                          },
                          $inc: {
                            viewCount: 1
                          }
                        }));

                      case 6:
                        updateItem = _context16.sent;
                        return _context16.abrupt('return', true);

                      case 8:
                      case 'end':
                        return _context16.stop();
                    }
                  }
                }, null, undefined);
              }
            }
          };
          schema = (0, _graphqlTools.makeExecutableSchema)({
            typeDefs: _typeDefs2.default,
            resolvers: resolvers
          });
          app = (0, _express2.default)();

          //app.use(cors())

          app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
            if (req.method === 'OPTIONS') {
              res.sendStatus(200);
            } else {
              next();
            }
          });

          // Check if token has been modified
          app.use(function (req, res, next) {
            if (req.headers.authorization) {
              var token = req.headers.authorization.split(' ')[1];
              if (token != "null") {
                // null or undefined
                try {
                  var decoded = _jsonwebtoken2.default.verify(token, jwtSecret);
                  res.locals.user = decoded;
                  next();
                } catch (err) {
                  res.sendStatus(401);
                }
              } else {
                next();
              }
            } else {
              res.sendStatus(401);
            }
          });

          process.on('unhandledRejection', function (reason, p) {
            console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
            // application specific logging, throwing an error, or other logic here
          });

          // Register last activity of user
          app.use(function (req, res, next) {
            if (res.locals.user) {
              var userId = res.locals.user._id;
              var now = new Date().toISOString();
              var updatedUser = Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(userId) }, { $set: { lastConnection: now }
              });
            }
            next();
          });

          app.use('/graphql', (0, _cors2.default)(), _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)(function (req, res) {
            return {
              schema: schema,
              context: {
                req: req,
                res: res
              }
            };
          }));

          app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
            endpointURL: '/graphql'
          }));

          app.listen(PORT, function () {
            console.log('Visit ' + URL + ':' + PORT);
          });

          _context17.next = 22;
          break;

        case 19:
          _context17.prev = 19;
          _context17.t0 = _context17['catch'](0);

          console.log(_context17.t0);

        case 22:
        case 'end':
          return _context17.stop();
      }
    }
  }, null, undefined, [[0, 19]]);
};