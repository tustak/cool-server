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

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

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

var URL = 'http://localhost';

//-Files---

var PORT = 3001;
//const MONGO_URL = 'mongodb://localhost:27017/tustak'
var MONGO_URL = _config2.default.mongoURL;

var prepare = function prepare(o) {
  o._id = o._id.toString();
  return o;
};

var start = exports.start = function _callee() {
  var models, Users, Items, resolvers, schema, app;
  return regeneratorRuntime.async(function _callee$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap((0, _models2.default)());

        case 3:
          models = _context13.sent;
          Users = models.Users; //db.collection('users')

          Items = models.Items; //db.collection('items')

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
              item: function item(root, _ref2) {
                var _id = _ref2._id;
                return regeneratorRuntime.async(function item$(_context3) {
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
              published: function published(_ref3) {
                var _id = _ref3._id;
                return regeneratorRuntime.async(function published$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return regeneratorRuntime.awrap(Items.find({ itemId: _id }).toArray());

                      case 2:
                        _context5.t0 = prepare;
                        return _context5.abrupt('return', _context5.sent.map(_context5.t0));

                      case 4:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, null, undefined);
              },
              requested: function requested(_ref4) {
                var _id = _ref4._id;
                return regeneratorRuntime.async(function requested$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return regeneratorRuntime.awrap(Items.find({ itemId: _id }).toArray());

                      case 2:
                        _context6.t0 = prepare;
                        return _context6.abrupt('return', _context6.sent.map(_context6.t0));

                      case 4:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Item: {
              user: function user(_ref5) {
                var userId = _ref5.userId;
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
              }
            },
            Mutation: {
              createUser: function createUser(root, args, context, info) {
                var errors, errorList, res, user, token;
                return regeneratorRuntime.async(function createUser$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        errors = (0, _formValidation2.default)(args);
                        _context8.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.username.toLowerCase() }));

                      case 3:
                        if (!_context8.sent) {
                          _context8.next = 5;
                          break;
                        }

                        errors['username'] = 'User ' + args.username.toLowerCase() + ' already exists';

                      case 5:
                        _context8.next = 7;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.email.toLowerCase() }));

                      case 7:
                        if (!_context8.sent) {
                          _context8.next = 9;
                          break;
                        }

                        errors['email'] = 'Email already used';

                      case 9:
                        if ((0, _isEmpty2.default)(errors)) {
                          _context8.next = 15;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 15:
                        _context8.next = 17;
                        return regeneratorRuntime.awrap(Users.insert((0, _fix2.default)(args)));

                      case 17:
                        res = _context8.sent;
                        _context8.t0 = prepare;
                        _context8.next = 21;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: res.insertedIds[0] }));

                      case 21:
                        _context8.t1 = _context8.sent;
                        user = (0, _context8.t0)(_context8.t1);
                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), _config2.default.jwtSecret);
                        return _context8.abrupt('return', { token: token, user: user });

                      case 25:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, null, undefined);
              },
              signinUser: function signinUser(root, args, context, info) {
                var user, token, _user, _token;

                return regeneratorRuntime.async(function signinUser$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.usernameOrEmail.toLowerCase() }));

                      case 2:
                        if (!_context9.sent) {
                          _context9.next = 14;
                          break;
                        }

                        _context9.next = 5;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.usernameOrEmail.toLowerCase(), password: args.password }));

                      case 5:
                        user = _context9.sent;

                        if (!user) {
                          _context9.next = 11;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), _config2.default.jwtSecret);
                        return _context9.abrupt('return', { token: token, user: user });

                      case 11:
                        throw new _validationError2.default('Password incorrect');

                      case 12:
                        _context9.next = 29;
                        break;

                      case 14:
                        _context9.next = 16;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.usernameOrEmail.toLowerCase() }));

                      case 16:
                        if (!_context9.sent) {
                          _context9.next = 28;
                          break;
                        }

                        _context9.next = 19;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.usernameOrEmail.toLowerCase(), password: args.password }));

                      case 19:
                        _user = _context9.sent;

                        if (!_user) {
                          _context9.next = 25;
                          break;
                        }

                        _token = _jsonwebtoken2.default.sign(_lodash2.default.omit(_user, 'password'), _config2.default.jwtSecret);
                        return _context9.abrupt('return', { token: _token, user: _user });

                      case 25:
                        throw new _validationError2.default('Password incorrect');

                      case 26:
                        _context9.next = 29;
                        break;

                      case 28:
                        throw new _validationError2.default("User not found");

                      case 29:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                }, null, undefined);
              },
              updateUser: function updateUser(root, args, context, info) {
                var currentUser, errors, errorList, updateArgs, updatedUser, user, token;
                return regeneratorRuntime.async(function updateUser$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        currentUser = (0, _authenticate2.default)(context.req, context.res, models);
                        errors = (0, _formValidation2.default)(args, true);

                        if ((0, _isEmpty2.default)(errors)) {
                          _context10.next = 6;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 6:
                        updateArgs = _lodash2.default.omit(args, '_id');
                        _context10.next = 9;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args._id) }, { $set: updateArgs
                        }, { returnNewDocument: true }));

                      case 9:
                        updatedUser = _context10.sent;
                        _context10.next = 12;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args._id) }));

                      case 12:
                        user = _context10.sent;

                        if (!user) {
                          _context10.next = 16;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), _config2.default.jwtSecret);
                        return _context10.abrupt('return', { token: token, user: user });

                      case 16:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                }, null, undefined);
              },
              deleteUser: function deleteUser(root, args, context, info) {
                var res;
                return regeneratorRuntime.async(function deleteUser$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.next = 2;
                        return regeneratorRuntime.awrap(Users.findOneAndDelete(args));

                      case 2:
                        res = _context11.sent;
                        _context11.t0 = prepare;
                        _context11.next = 6;
                        return regeneratorRuntime.awrap(res.value);

                      case 6:
                        _context11.t1 = _context11.sent;
                        return _context11.abrupt('return', (0, _context11.t0)(_context11.t1));

                      case 8:
                      case 'end':
                        return _context11.stop();
                    }
                  }
                }, null, undefined);
              },
              createItem: function createItem(root, args) {
                var res;
                return regeneratorRuntime.async(function createItem$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return regeneratorRuntime.awrap(Items.insert(args));

                      case 2:
                        res = _context12.sent;
                        _context12.t0 = prepare;
                        _context12.next = 6;
                        return regeneratorRuntime.awrap(Items.findOne({ _id: res.insertedIds[0] }));

                      case 6:
                        _context12.t1 = _context12.sent;
                        return _context12.abrupt('return', (0, _context12.t0)(_context12.t1));

                      case 8:
                      case 'end':
                        return _context12.stop();
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


          app.use((0, _cors2.default)());

          /*app.use('/graphql', bodyParser.json(), graphqlExpress({
            schema: schema,
            context: 'asd'
          }))*/

          app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)(function (req, res) {
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

          _context13.next = 18;
          break;

        case 15:
          _context13.prev = 15;
          _context13.t0 = _context13['catch'](0);

          console.log(_context13.t0);

        case 18:
        case 'end':
          return _context13.stop();
      }
    }
  }, null, undefined, [[0, 15]]);
};