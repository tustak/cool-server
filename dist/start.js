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

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

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

var _distance = require('./utils/distance');

var _distance2 = _interopRequireDefault(_distance);

var _validationError = require('./errors/validationError');

var _validationError2 = _interopRequireDefault(_validationError);

var _authenticate = require('./middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _fix = require('./utils/fix');

var _fix2 = _interopRequireDefault(_fix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//---------

// COnfig
var jwtSecret = process.env.jwtSecret || require('../config').default.jwtSecret;

//-Files---

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
  var models, Users, Items, Views, Reviews, Activities, Messages, Conversations, Transactions, Requests, resolvers, schema, app, upload;
  return regeneratorRuntime.async(function _callee$(_context75) {
    while (1) {
      switch (_context75.prev = _context75.next) {
        case 0:
          _context75.prev = 0;
          _context75.next = 3;
          return regeneratorRuntime.awrap((0, _models2.default)());

        case 3:
          models = _context75.sent;
          Users = models.Users; //db.collection('users')

          Items = models.Items; //db.collection('items')

          Views = models.Views;
          Reviews = models.Reviews;
          Activities = models.Activities;
          Messages = models.Messages;
          Conversations = models.Conversations;
          Transactions = models.Transactions;
          Requests = models.Requests;
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
              },
              lastOffers: function lastOffers(root, _ref3) {
                var _id = _ref3._id;
                return regeneratorRuntime.async(function lastOffers$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return regeneratorRuntime.awrap(Items.find({ type: "offer", userId: { $ne: _id } }).limit(10).toArray());

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
              lastRequests: function lastRequests(root, _ref4) {
                var _id = _ref4._id;
                return regeneratorRuntime.async(function lastRequests$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return regeneratorRuntime.awrap(Items.find({ type: "request", userId: { $ne: _id } }).limit(10).toArray());

                      case 2:
                        _context6.t0 = prepare;
                        return _context6.abrupt('return', _context6.sent.map(_context6.t0));

                      case 4:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, null, undefined);
              },
              reviewsByFrom: function reviewsByFrom(root, _ref5) {
                var userId = _ref5.userId;
                var reviews;
                return regeneratorRuntime.async(function reviewsByFrom$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return regeneratorRuntime.awrap(Reviews.find({ from: (0, _mongodb.ObjectId)(userId) }));

                      case 2:
                        reviews = _context7.sent;

                        console.log(reviews);
                        return _context7.abrupt('return', 3.5);

                      case 5:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, null, undefined);
              },
              reviewsByTo: function reviewsByTo(root, _ref6) {
                var userId = _ref6.userId;
                var reviews;
                return regeneratorRuntime.async(function reviewsByTo$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return regeneratorRuntime.awrap(Reviews.find({ to: (0, _mongodb.ObjectId)(userId) }));

                      case 2:
                        reviews = _context8.sent;

                        console.log(reviews);
                        return _context8.abrupt('return', 3.5);

                      case 5:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, null, undefined);
              },
              reviewsByItem: function reviewsByItem(root, _ref7) {
                var itemId = _ref7.itemId;
                var reviews;
                return regeneratorRuntime.async(function reviewsByItem$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return regeneratorRuntime.awrap(Reviews.findOne({ tem: (0, _mongodb.ObjectId)(userId) }));

                      case 2:
                        reviews = _context9.sent;

                        console.log(reviews);
                        return _context9.abrupt('return', 3.5);

                      case 5:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                }, null, undefined);
              },
              reviewById: function reviewById(root, _ref8) {
                var _id = _ref8._id;
                return regeneratorRuntime.async(function reviewById$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.t0 = prepare;
                        _context10.next = 3;
                        return regeneratorRuntime.awrap(Reviews.findOne({ _id: (0, _mongodb.ObjectId)(_id) }));

                      case 3:
                        _context10.t1 = _context10.sent;
                        return _context10.abrupt('return', (0, _context10.t0)(_context10.t1));

                      case 5:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                }, null, undefined);
              },
              reviewByTransactionAndUserFrom: function reviewByTransactionAndUserFrom(root, _ref9) {
                var transaction = _ref9.transaction,
                    userFrom = _ref9.userFrom;
                return regeneratorRuntime.async(function reviewByTransactionAndUserFrom$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.t0 = console;
                        _context11.next = 3;
                        return regeneratorRuntime.awrap(Reviews.findOne({ transaction: transaction.toString(), userFrom: userFrom }));

                      case 3:
                        _context11.t1 = _context11.sent;

                        _context11.t0.log.call(_context11.t0, _context11.t1);

                        _context11.t2 = prepare;
                        _context11.next = 8;
                        return regeneratorRuntime.awrap(Reviews.findOne({ transaction: transaction.toString(), userFrom: userFrom }));

                      case 8:
                        _context11.t3 = _context11.sent;
                        return _context11.abrupt('return', (0, _context11.t2)(_context11.t3));

                      case 10:
                      case 'end':
                        return _context11.stop();
                    }
                  }
                }, null, undefined);
              },
              transactionById: function transactionById(root, _ref10) {
                var _id = _ref10._id;
                return regeneratorRuntime.async(function transactionById$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.t0 = prepare;
                        _context12.next = 3;
                        return regeneratorRuntime.awrap(Transactions.findOne({ _id: (0, _mongodb.ObjectId)(_id) }));

                      case 3:
                        _context12.t1 = _context12.sent;
                        return _context12.abrupt('return', (0, _context12.t0)(_context12.t1));

                      case 5:
                      case 'end':
                        return _context12.stop();
                    }
                  }
                }, null, undefined);
              },
              activityByUserIdItem: function activityByUserIdItem(root, _ref11) {
                var _id = _ref11._id,
                    type = _ref11.type;
                return regeneratorRuntime.async(function activityByUserIdItem$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.next = 2;
                        return regeneratorRuntime.awrap(Activities.find({ user: _id, type: type }).sort({ date: -1 }).toArray());

                      case 2:
                        _context13.t0 = prepare;
                        return _context13.abrupt('return', _context13.sent.map(_context13.t0));

                      case 4:
                      case 'end':
                        return _context13.stop();
                    }
                  }
                }, null, undefined);
              },
              activityByUserIdMessage: function activityByUserIdMessage(root, _ref12) {
                var _id = _ref12._id,
                    type = _ref12.type;
                var messageList, messages;
                return regeneratorRuntime.async(function activityByUserIdMessage$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        messageList = [];
                        _context14.next = 3;
                        return regeneratorRuntime.awrap(Messages.find({ userTo: _id }).toArray());

                      case 3:
                        _context14.t0 = prepare;

                        _context14.t1 = function (message) {
                          messageList.push(message._id);
                        };

                        messages = _context14.sent.map(_context14.t0).map(_context14.t1);
                        _context14.next = 8;
                        return regeneratorRuntime.awrap(Activities.find({ message: { $in: messageList }, type: type }).sort({ date: -1 }).toArray());

                      case 8:
                        _context14.t2 = prepare;
                        return _context14.abrupt('return', _context14.sent.map(_context14.t2));

                      case 10:
                      case 'end':
                        return _context14.stop();
                    }
                  }
                }, null, undefined);
              },
              conversationsByUserId: function conversationsByUserId(root, _ref13) {
                var _id = _ref13._id;
                return regeneratorRuntime.async(function conversationsByUserId$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.t0 = prepare;
                        _context15.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_id)));

                      case 3:
                        _context15.t1 = _context15.sent;
                        return _context15.abrupt('return', (0, _context15.t0)(_context15.t1));

                      case 5:
                      case 'end':
                        return _context15.stop();
                    }
                  }
                }, null, undefined);
              },
              messagesByConversationId: function messagesByConversationId(root, _ref14) {
                var _id = _ref14._id;
                var messageList, messages;
                return regeneratorRuntime.async(function messagesByConversationId$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        messageList = [];
                        _context16.next = 3;
                        return regeneratorRuntime.awrap(Messages.find({ conversation: _id }).toArray());

                      case 3:
                        _context16.t0 = prepare;

                        _context16.t1 = function (message) {
                          messageList.push(message._id);
                        };

                        messages = _context16.sent.map(_context16.t0).map(_context16.t1);
                        _context16.next = 8;
                        return regeneratorRuntime.awrap(Messages.find({ _id: { $in: messageList } }).sort({ date: -1 }).toArray());

                      case 8:
                        _context16.t2 = prepare;
                        return _context16.abrupt('return', _context16.sent.map(_context16.t2));

                      case 10:
                      case 'end':
                        return _context16.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            User: {
              offered: function offered(user) {
                return regeneratorRuntime.async(function offered$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        _context17.next = 2;
                        return regeneratorRuntime.awrap(Items.find({ _id: { $in: user.offered } }).toArray());

                      case 2:
                        return _context17.abrupt('return', _context17.sent);

                      case 3:
                      case 'end':
                        return _context17.stop();
                    }
                  }
                }, null, undefined);
              },
              requested: function requested(user) {
                return regeneratorRuntime.async(function requested$(_context18) {
                  while (1) {
                    switch (_context18.prev = _context18.next) {
                      case 0:
                        _context18.next = 2;
                        return regeneratorRuntime.awrap(Items.find({ _id: { $in: user.requested } }).toArray());

                      case 2:
                        return _context18.abrupt('return', _context18.sent);

                      case 3:
                      case 'end':
                        return _context18.stop();
                    }
                  }
                }, null, undefined);
              },
              activity: function activity(user) {
                return regeneratorRuntime.async(function activity$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        _context19.next = 2;
                        return regeneratorRuntime.awrap(Activities.find({ _id: { $in: user.activity } }).toArray());

                      case 2:
                        return _context19.abrupt('return', _context19.sent);

                      case 3:
                      case 'end':
                        return _context19.stop();
                    }
                  }
                }, null, undefined);
              },
              conversations: function conversations(user) {
                return regeneratorRuntime.async(function conversations$(_context20) {
                  while (1) {
                    switch (_context20.prev = _context20.next) {
                      case 0:
                        _context20.next = 2;
                        return regeneratorRuntime.awrap(Conversations.find({ _id: { $in: user.conversations } }).toArray());

                      case 2:
                        return _context20.abrupt('return', _context20.sent);

                      case 3:
                      case 'end':
                        return _context20.stop();
                    }
                  }
                }, null, undefined);
              },
              reviews: function reviews(user) {
                return regeneratorRuntime.async(function reviews$(_context21) {
                  while (1) {
                    switch (_context21.prev = _context21.next) {
                      case 0:
                        _context21.next = 2;
                        return regeneratorRuntime.awrap(Reviews.find({ _id: { $in: user.reviews } }).toArray());

                      case 2:
                        return _context21.abrupt('return', _context21.sent);

                      case 3:
                      case 'end':
                        return _context21.stop();
                    }
                  }
                }, null, undefined);
              },
              transactions: function transactions(user) {
                var transactionList;
                return regeneratorRuntime.async(function transactions$(_context22) {
                  while (1) {
                    switch (_context22.prev = _context22.next) {
                      case 0:
                        transactionList = [];

                        user.transactions.map(function (transaction) {
                          transactionList.push((0, _mongodb.ObjectId)(transaction.toString()));
                        });
                        _context22.next = 4;
                        return regeneratorRuntime.awrap(Transactions.find({ _id: { $in: transactionList } }).toArray());

                      case 4:
                        return _context22.abrupt('return', _context22.sent);

                      case 5:
                      case 'end':
                        return _context22.stop();
                    }
                  }
                }, null, undefined);
              },
              requests: function requests(user) {
                var requestList;
                return regeneratorRuntime.async(function requests$(_context23) {
                  while (1) {
                    switch (_context23.prev = _context23.next) {
                      case 0:
                        requestList = [];

                        user.requests.map(function (req) {
                          requestList.push((0, _mongodb.ObjectId)(req.toString()));
                        });
                        _context23.next = 4;
                        return regeneratorRuntime.awrap(Requests.find({ _id: { $in: requestList } }).toArray());

                      case 4:
                        return _context23.abrupt('return', _context23.sent);

                      case 5:
                      case 'end':
                        return _context23.stop();
                    }
                  }
                }, null, undefined);
              }
            },

            Item: {
              user: function user(_ref15) {
                var userId = _ref15.userId;
                return regeneratorRuntime.async(function user$(_context24) {
                  while (1) {
                    switch (_context24.prev = _context24.next) {
                      case 0:
                        _context24.t0 = prepare;
                        _context24.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context24.t1 = _context24.sent;
                        return _context24.abrupt('return', (0, _context24.t0)(_context24.t1));

                      case 5:
                      case 'end':
                        return _context24.stop();
                    }
                  }
                }, null, undefined);
              },
              views: function views(item) {
                return regeneratorRuntime.async(function views$(_context25) {
                  while (1) {
                    switch (_context25.prev = _context25.next) {
                      case 0:
                        _context25.next = 2;
                        return regeneratorRuntime.awrap(Views.find({ _id: { $in: item.views } }).toArray());

                      case 2:
                        return _context25.abrupt('return', _context25.sent);

                      case 3:
                      case 'end':
                        return _context25.stop();
                    }
                  }
                }, null, undefined);
              },
              reviews: function reviews(item) {
                return regeneratorRuntime.async(function reviews$(_context26) {
                  while (1) {
                    switch (_context26.prev = _context26.next) {
                      case 0:
                        _context26.next = 2;
                        return regeneratorRuntime.awrap(Reviews.find({
                          _id: { $in: item.reviews }
                        }).toArray());

                      case 2:
                        return _context26.abrupt('return', _context26.sent);

                      case 3:
                      case 'end':
                        return _context26.stop();
                    }
                  }
                }, null, undefined);
              },
              transactions: function transactions(item) {
                return regeneratorRuntime.async(function transactions$(_context27) {
                  while (1) {
                    switch (_context27.prev = _context27.next) {
                      case 0:
                        _context27.next = 2;
                        return regeneratorRuntime.awrap(Transactions.find({
                          _id: { $in: item.transactions }
                        }).toArray());

                      case 2:
                        return _context27.abrupt('return', _context27.sent);

                      case 3:
                      case 'end':
                        return _context27.stop();
                    }
                  }
                }, null, undefined);
              },
              requests: function requests(item) {
                var requestList;
                return regeneratorRuntime.async(function requests$(_context28) {
                  while (1) {
                    switch (_context28.prev = _context28.next) {
                      case 0:
                        requestList = [];

                        item.requests.map(function (req) {
                          requestList.push((0, _mongodb.ObjectId)(req.toString()));
                        });
                        _context28.next = 4;
                        return regeneratorRuntime.awrap(Requests.find({ _id: { $in: requestList } }).toArray());

                      case 4:
                        return _context28.abrupt('return', _context28.sent);

                      case 5:
                      case 'end':
                        return _context28.stop();
                    }
                  }
                }, null, undefined);
              }
            },

            Transaction: {
              item: function item(_ref16) {
                var _item = _ref16.item;
                return regeneratorRuntime.async(function item$(_context29) {
                  while (1) {
                    switch (_context29.prev = _context29.next) {
                      case 0:
                        _context29.t0 = prepare;
                        _context29.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(_item)));

                      case 3:
                        _context29.t1 = _context29.sent;
                        return _context29.abrupt('return', (0, _context29.t0)(_context29.t1));

                      case 5:
                      case 'end':
                        return _context29.stop();
                    }
                  }
                }, null, undefined);
              },
              userFrom: function userFrom(_ref17) {
                var _userFrom = _ref17.userFrom;
                return regeneratorRuntime.async(function userFrom$(_context30) {
                  while (1) {
                    switch (_context30.prev = _context30.next) {
                      case 0:
                        _context30.t0 = prepare;
                        _context30.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userFrom)));

                      case 3:
                        _context30.t1 = _context30.sent;
                        return _context30.abrupt('return', (0, _context30.t0)(_context30.t1));

                      case 5:
                      case 'end':
                        return _context30.stop();
                    }
                  }
                }, null, undefined);
              },
              userTo: function userTo(_ref18) {
                var _userTo = _ref18.userTo;
                return regeneratorRuntime.async(function userTo$(_context31) {
                  while (1) {
                    switch (_context31.prev = _context31.next) {
                      case 0:
                        _context31.t0 = prepare;
                        _context31.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userTo)));

                      case 3:
                        _context31.t1 = _context31.sent;
                        return _context31.abrupt('return', (0, _context31.t0)(_context31.t1));

                      case 5:
                      case 'end':
                        return _context31.stop();
                    }
                  }
                }, null, undefined);
              },
              reviewFrom: function reviewFrom(_ref19) {
                var _reviewFrom = _ref19.reviewFrom;
                return regeneratorRuntime.async(function reviewFrom$(_context32) {
                  while (1) {
                    switch (_context32.prev = _context32.next) {
                      case 0:
                        _context32.t0 = prepare;
                        _context32.next = 3;
                        return regeneratorRuntime.awrap(Reviews.findOne((0, _mongodb.ObjectId)(_reviewFrom)));

                      case 3:
                        _context32.t1 = _context32.sent;
                        return _context32.abrupt('return', (0, _context32.t0)(_context32.t1));

                      case 5:
                      case 'end':
                        return _context32.stop();
                    }
                  }
                }, null, undefined);
              },
              reviewTo: function reviewTo(_ref20) {
                var _reviewTo = _ref20.reviewTo;
                return regeneratorRuntime.async(function reviewTo$(_context33) {
                  while (1) {
                    switch (_context33.prev = _context33.next) {
                      case 0:
                        _context33.t0 = prepare;
                        _context33.next = 3;
                        return regeneratorRuntime.awrap(Reviews.findOne((0, _mongodb.ObjectId)(_reviewTo)));

                      case 3:
                        _context33.t1 = _context33.sent;
                        return _context33.abrupt('return', (0, _context33.t0)(_context33.t1));

                      case 5:
                      case 'end':
                        return _context33.stop();
                    }
                  }
                }, null, undefined);
              },
              request: function request(_ref21) {
                var _request = _ref21.request;
                return regeneratorRuntime.async(function request$(_context34) {
                  while (1) {
                    switch (_context34.prev = _context34.next) {
                      case 0:
                        _context34.t0 = prepare;
                        _context34.next = 3;
                        return regeneratorRuntime.awrap(Requests.findOne((0, _mongodb.ObjectId)(_request)));

                      case 3:
                        _context34.t1 = _context34.sent;
                        return _context34.abrupt('return', (0, _context34.t0)(_context34.t1));

                      case 5:
                      case 'end':
                        return _context34.stop();
                    }
                  }
                }, null, undefined);
              }
            },

            Request: {
              item: function item(_ref22) {
                var _item2 = _ref22.item;
                return regeneratorRuntime.async(function item$(_context35) {
                  while (1) {
                    switch (_context35.prev = _context35.next) {
                      case 0:
                        _context35.t0 = prepare;
                        _context35.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(_item2)));

                      case 3:
                        _context35.t1 = _context35.sent;
                        return _context35.abrupt('return', (0, _context35.t0)(_context35.t1));

                      case 5:
                      case 'end':
                        return _context35.stop();
                    }
                  }
                }, null, undefined);
              },
              userFrom: function userFrom(request) {
                return regeneratorRuntime.async(function userFrom$(_context36) {
                  while (1) {
                    switch (_context36.prev = _context36.next) {
                      case 0:
                        _context36.t0 = prepare;
                        _context36.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(request.userFrom)));

                      case 3:
                        _context36.t1 = _context36.sent;
                        return _context36.abrupt('return', (0, _context36.t0)(_context36.t1));

                      case 5:
                      case 'end':
                        return _context36.stop();
                    }
                  }
                }, null, undefined);
              },
              userTo: function userTo(request) {
                return regeneratorRuntime.async(function userTo$(_context37) {
                  while (1) {
                    switch (_context37.prev = _context37.next) {
                      case 0:
                        _context37.t0 = prepare;
                        _context37.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(request.userTo)));

                      case 3:
                        _context37.t1 = _context37.sent;
                        return _context37.abrupt('return', (0, _context37.t0)(_context37.t1));

                      case 5:
                      case 'end':
                        return _context37.stop();
                    }
                  }
                }, null, undefined);
              }
            },

            Activity: {
              user: function user(_ref23) {
                var _user = _ref23.user;
                return regeneratorRuntime.async(function user$(_context38) {
                  while (1) {
                    switch (_context38.prev = _context38.next) {
                      case 0:
                        _context38.t0 = prepare;
                        _context38.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_user)));

                      case 3:
                        _context38.t1 = _context38.sent;
                        return _context38.abrupt('return', (0, _context38.t0)(_context38.t1));

                      case 5:
                      case 'end':
                        return _context38.stop();
                    }
                  }
                }, null, undefined);
              },
              item: function item(_ref24) {
                var _item3 = _ref24.item;
                return regeneratorRuntime.async(function item$(_context39) {
                  while (1) {
                    switch (_context39.prev = _context39.next) {
                      case 0:
                        _context39.t0 = prepare;
                        _context39.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(_item3)));

                      case 3:
                        _context39.t1 = _context39.sent;
                        return _context39.abrupt('return', (0, _context39.t0)(_context39.t1));

                      case 5:
                      case 'end':
                        return _context39.stop();
                    }
                  }
                }, null, undefined);
              },
              review: function review(_ref25) {
                var _review = _ref25.review;
                return regeneratorRuntime.async(function review$(_context40) {
                  while (1) {
                    switch (_context40.prev = _context40.next) {
                      case 0:
                        _context40.t0 = prepare;
                        _context40.next = 3;
                        return regeneratorRuntime.awrap(Reviews.findOne((0, _mongodb.ObjectId)(_review)));

                      case 3:
                        _context40.t1 = _context40.sent;
                        return _context40.abrupt('return', (0, _context40.t0)(_context40.t1));

                      case 5:
                      case 'end':
                        return _context40.stop();
                    }
                  }
                }, null, undefined);
              },
              message: function message(_ref26) {
                var _message = _ref26.message;
                return regeneratorRuntime.async(function message$(_context41) {
                  while (1) {
                    switch (_context41.prev = _context41.next) {
                      case 0:
                        _context41.t0 = prepare;
                        _context41.next = 3;
                        return regeneratorRuntime.awrap(Messages.findOne((0, _mongodb.ObjectId)(_message)));

                      case 3:
                        _context41.t1 = _context41.sent;
                        return _context41.abrupt('return', (0, _context41.t0)(_context41.t1));

                      case 5:
                      case 'end':
                        return _context41.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Conversation: {
              userFrom: function userFrom(_ref27) {
                var _userFrom2 = _ref27.userFrom;
                return regeneratorRuntime.async(function userFrom$(_context42) {
                  while (1) {
                    switch (_context42.prev = _context42.next) {
                      case 0:
                        _context42.t0 = prepare;
                        _context42.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userFrom2)));

                      case 3:
                        _context42.t1 = _context42.sent;
                        return _context42.abrupt('return', (0, _context42.t0)(_context42.t1));

                      case 5:
                      case 'end':
                        return _context42.stop();
                    }
                  }
                }, null, undefined);
              },
              userTo: function userTo(_ref28) {
                var _userTo2 = _ref28.userTo;
                return regeneratorRuntime.async(function userTo$(_context43) {
                  while (1) {
                    switch (_context43.prev = _context43.next) {
                      case 0:
                        _context43.t0 = prepare;
                        _context43.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userTo2)));

                      case 3:
                        _context43.t1 = _context43.sent;
                        return _context43.abrupt('return', (0, _context43.t0)(_context43.t1));

                      case 5:
                      case 'end':
                        return _context43.stop();
                    }
                  }
                }, null, undefined);
              },
              messages: function messages(conversation) {
                return regeneratorRuntime.async(function messages$(_context44) {
                  while (1) {
                    switch (_context44.prev = _context44.next) {
                      case 0:
                        _context44.next = 2;
                        return regeneratorRuntime.awrap(Messages.find({ _id: { $in: conversation.messages } }).toArray());

                      case 2:
                        return _context44.abrupt('return', _context44.sent);

                      case 3:
                      case 'end':
                        return _context44.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Message: {
              conversation: function conversation(_ref29) {
                var _conversation = _ref29.conversation;
                return regeneratorRuntime.async(function conversation$(_context45) {
                  while (1) {
                    switch (_context45.prev = _context45.next) {
                      case 0:
                        _context45.t0 = prepare;
                        _context45.next = 3;
                        return regeneratorRuntime.awrap(Conversations.findOne((0, _mongodb.ObjectId)(_conversation)));

                      case 3:
                        _context45.t1 = _context45.sent;
                        return _context45.abrupt('return', (0, _context45.t0)(_context45.t1));

                      case 5:
                      case 'end':
                        return _context45.stop();
                    }
                  }
                }, null, undefined);
              },
              userFrom: function userFrom(_ref30) {
                var _userFrom3 = _ref30.userFrom;
                return regeneratorRuntime.async(function userFrom$(_context46) {
                  while (1) {
                    switch (_context46.prev = _context46.next) {
                      case 0:
                        _context46.t0 = prepare;
                        _context46.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userFrom3)));

                      case 3:
                        _context46.t1 = _context46.sent;
                        return _context46.abrupt('return', (0, _context46.t0)(_context46.t1));

                      case 5:
                      case 'end':
                        return _context46.stop();
                    }
                  }
                }, null, undefined);
              },
              userTo: function userTo(_ref31) {
                var _userTo3 = _ref31.userTo;
                return regeneratorRuntime.async(function userTo$(_context47) {
                  while (1) {
                    switch (_context47.prev = _context47.next) {
                      case 0:
                        _context47.t0 = prepare;
                        _context47.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userTo3)));

                      case 3:
                        _context47.t1 = _context47.sent;
                        return _context47.abrupt('return', (0, _context47.t0)(_context47.t1));

                      case 5:
                      case 'end':
                        return _context47.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            View: {
              user: function user(_ref32) {
                var userId = _ref32.userId;
                return regeneratorRuntime.async(function user$(_context48) {
                  while (1) {
                    switch (_context48.prev = _context48.next) {
                      case 0:
                        _context48.t0 = prepare;
                        _context48.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context48.t1 = _context48.sent;
                        return _context48.abrupt('return', (0, _context48.t0)(_context48.t1));

                      case 5:
                      case 'end':
                        return _context48.stop();
                    }
                  }
                }, null, undefined);
              },
              item: function item(_ref33) {
                var itemId = _ref33.itemId;
                return regeneratorRuntime.async(function item$(_context49) {
                  while (1) {
                    switch (_context49.prev = _context49.next) {
                      case 0:
                        _context49.t0 = prepare;
                        _context49.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(itemId)));

                      case 3:
                        _context49.t1 = _context49.sent;
                        return _context49.abrupt('return', (0, _context49.t0)(_context49.t1));

                      case 5:
                      case 'end':
                        return _context49.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Review: {
              transaction: function transaction(_ref34) {
                var review = _ref34.review;
                return regeneratorRuntime.async(function transaction$(_context50) {
                  while (1) {
                    switch (_context50.prev = _context50.next) {
                      case 0:
                        console.log(review);
                        _context50.t0 = prepare;
                        _context50.next = 4;
                        return regeneratorRuntime.awrap(Transactions.findOne((0, _mongodb.ObjectId)(review.transaction)));

                      case 4:
                        _context50.t1 = _context50.sent;
                        return _context50.abrupt('return', (0, _context50.t0)(_context50.t1));

                      case 6:
                      case 'end':
                        return _context50.stop();
                    }
                  }
                }, null, undefined);
              },
              userFrom: function userFrom(_ref35) {
                var _userFrom4 = _ref35.userFrom;
                return regeneratorRuntime.async(function userFrom$(_context51) {
                  while (1) {
                    switch (_context51.prev = _context51.next) {
                      case 0:
                        _context51.t0 = prepare;
                        _context51.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userFrom4)));

                      case 3:
                        _context51.t1 = _context51.sent;
                        return _context51.abrupt('return', (0, _context51.t0)(_context51.t1));

                      case 5:
                      case 'end':
                        return _context51.stop();
                    }
                  }
                }, null, undefined);
              },
              userTo: function userTo(_ref36) {
                var _userTo4 = _ref36.userTo;
                return regeneratorRuntime.async(function userTo$(_context52) {
                  while (1) {
                    switch (_context52.prev = _context52.next) {
                      case 0:
                        _context52.t0 = prepare;
                        _context52.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userTo4)));

                      case 3:
                        _context52.t1 = _context52.sent;
                        return _context52.abrupt('return', (0, _context52.t0)(_context52.t1));

                      case 5:
                      case 'end':
                        return _context52.stop();
                    }
                  }
                }, null, undefined);
              },
              item: function item(_ref37) {
                var itemId = _ref37.itemId;
                return regeneratorRuntime.async(function item$(_context53) {
                  while (1) {
                    switch (_context53.prev = _context53.next) {
                      case 0:
                        _context53.t0 = prepare;
                        _context53.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(itemId)));

                      case 3:
                        _context53.t1 = _context53.sent;
                        return _context53.abrupt('return', (0, _context53.t0)(_context53.t1));

                      case 5:
                      case 'end':
                        return _context53.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Mutation: {
              createUser: function createUser(root, args, context, info) {
                var errors, errorList, res, user, token;
                return regeneratorRuntime.async(function createUser$(_context54) {
                  while (1) {
                    switch (_context54.prev = _context54.next) {
                      case 0:
                        errors = (0, _formValidation2.default)(_lodash2.default.omit(args, 'offered', 'requested', 'activity', 'conversations', 'reviews', 'transactions', 'requests'));
                        _context54.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.username.toLowerCase() }));

                      case 3:
                        if (!_context54.sent) {
                          _context54.next = 5;
                          break;
                        }

                        errors['username'] = 'User ' + args.username.toLowerCase() + ' already exists';

                      case 5:
                        _context54.next = 7;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.email.toLowerCase() }));

                      case 7:
                        if (!_context54.sent) {
                          _context54.next = 9;
                          break;
                        }

                        errors['email'] = 'Email already used';

                      case 9:
                        if ((0, _isEmpty2.default)(errors)) {
                          _context54.next = 15;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 15:
                        _context54.next = 17;
                        return regeneratorRuntime.awrap(Users.insert((0, _fix2.default)(args)));

                      case 17:
                        res = _context54.sent;
                        _context54.t0 = prepare;
                        _context54.next = 21;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: res.insertedIds[0] }));

                      case 21:
                        _context54.t1 = _context54.sent;
                        user = (0, _context54.t0)(_context54.t1);
                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context54.abrupt('return', { token: token, user: user });

                      case 25:
                      case 'end':
                        return _context54.stop();
                    }
                  }
                }, null, undefined);
              },
              signinUser: function signinUser(root, args, context, info) {
                var user, token, _user2, _token;

                return regeneratorRuntime.async(function signinUser$(_context55) {
                  while (1) {
                    switch (_context55.prev = _context55.next) {
                      case 0:
                        _context55.next = 2;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.usernameOrEmail.toLowerCase() }));

                      case 2:
                        if (!_context55.sent) {
                          _context55.next = 14;
                          break;
                        }

                        _context55.next = 5;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.usernameOrEmail.toLowerCase(), password: args.password }));

                      case 5:
                        user = _context55.sent;

                        if (!user) {
                          _context55.next = 11;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context55.abrupt('return', { token: token, user: user });

                      case 11:
                        throw new _validationError2.default('Password incorrect');

                      case 12:
                        _context55.next = 29;
                        break;

                      case 14:
                        _context55.next = 16;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.usernameOrEmail.toLowerCase() }));

                      case 16:
                        if (!_context55.sent) {
                          _context55.next = 28;
                          break;
                        }

                        _context55.next = 19;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.usernameOrEmail.toLowerCase(), password: args.password }));

                      case 19:
                        _user2 = _context55.sent;

                        if (!_user2) {
                          _context55.next = 25;
                          break;
                        }

                        _token = _jsonwebtoken2.default.sign(_lodash2.default.omit(_user2, 'password'), jwtSecret);
                        return _context55.abrupt('return', { token: _token, user: _user2 });

                      case 25:
                        throw new _validationError2.default('Password incorrect');

                      case 26:
                        _context55.next = 29;
                        break;

                      case 28:
                        throw new _validationError2.default("User not found");

                      case 29:
                      case 'end':
                        return _context55.stop();
                    }
                  }
                }, null, undefined);
              },
              updateUser: function updateUser(root, args, context, info) {
                var currentUser, errors, errorList, updateArgs, updatedUser, user, token;
                return regeneratorRuntime.async(function updateUser$(_context56) {
                  while (1) {
                    switch (_context56.prev = _context56.next) {
                      case 0:
                        currentUser = (0, _authenticate2.default)(context.req, context.res, models);
                        errors = (0, _formValidation2.default)(args, true);

                        if ((0, _isEmpty2.default)(errors)) {
                          _context56.next = 6;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 6:
                        updateArgs = _lodash2.default.omit(args, '_id');
                        _context56.next = 9;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args._id) }, { $set: updateArgs
                        }, { returnNewDocument: true }));

                      case 9:
                        updatedUser = _context56.sent;
                        _context56.next = 12;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args._id) }));

                      case 12:
                        user = _context56.sent;

                        if (!user) {
                          _context56.next = 16;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context56.abrupt('return', { token: token, user: user });

                      case 16:
                      case 'end':
                        return _context56.stop();
                    }
                  }
                }, null, undefined);
              },

              changeUserPicture: function changeUserPicture(root, args, context, info) {
                var updatedUser, user, token;
                return regeneratorRuntime.async(function changeUserPicture$(_context57) {
                  while (1) {
                    switch (_context57.prev = _context57.next) {
                      case 0:
                        _context57.next = 2;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.userId) }, { $set: { picturePath: args.picturePath }
                        }, { returnNewDocument: true }));

                      case 2:
                        updatedUser = _context57.sent;
                        _context57.next = 5;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userId) }));

                      case 5:
                        user = _context57.sent;

                        if (!user) {
                          _context57.next = 9;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context57.abrupt('return', { token: token, user: user });

                      case 9:
                      case 'end':
                        return _context57.stop();
                    }
                  }
                }, null, undefined);
              },

              changePassword: function changePassword(root, args, context, info) {
                var currentUser, errors, errorList, updatedUser, user, token;
                return regeneratorRuntime.async(function changePassword$(_context58) {
                  while (1) {
                    switch (_context58.prev = _context58.next) {
                      case 0:
                        currentUser = (0, _authenticate2.default)(context.req, context.res, models);
                        errors = (0, _formValidation2.default)(args, true);

                        if ((0, _isEmpty2.default)(errors)) {
                          _context58.next = 6;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 6:
                        _context58.next = 8;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args._id), password: args.currentPassword }, { $set: { password: args.password }
                        }, { returnNewDocument: true }));

                      case 8:
                        updatedUser = _context58.sent;
                        _context58.next = 11;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args._id), password: args.password }));

                      case 11:
                        user = _context58.sent;

                        if (!user) {
                          _context58.next = 17;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context58.abrupt('return', { token: token, user: user });

                      case 17:
                        throw new _validationError2.default("Password incorrect");

                      case 18:
                      case 'end':
                        return _context58.stop();
                    }
                  }
                }, null, undefined);
              },
              createItem: function createItem(root, args, context, info) {
                var errors, errorList, res, item, updatedUser, _updatedUser, user, token;

                return regeneratorRuntime.async(function createItem$(_context59) {
                  while (1) {
                    switch (_context59.prev = _context59.next) {
                      case 0:
                        errors = (0, _formValidation2.default)(_lodash2.default.omit(args, 'views', 'activated', 'deleted', 'reviews', 'transactions', 'requests'));

                        if ((0, _isEmpty2.default)(errors)) {
                          _context59.next = 7;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 7:
                        _context59.next = 9;
                        return regeneratorRuntime.awrap(Items.insert((0, _fix2.default)(args)));

                      case 9:
                        res = _context59.sent;
                        _context59.t0 = prepare;
                        _context59.next = 13;
                        return regeneratorRuntime.awrap(Items.findOne({ _id: res.insertedIds[0] }));

                      case 13:
                        _context59.t1 = _context59.sent;
                        item = (0, _context59.t0)(_context59.t1);

                        if (!(args.type === 'offer')) {
                          _context59.next = 21;
                          break;
                        }

                        _context59.next = 18;
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
                        updatedUser = _context59.sent;
                        _context59.next = 24;
                        break;

                      case 21:
                        _context59.next = 23;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.userId) }, { $set: {
                            lastLocation: args.location,
                            lastLatitude: args.latitude,
                            lastLongitude: args.longitude
                          },
                          $push: {
                            requested: res.insertedIds[0]
                          }
                        }, { returnNewDocument: true }));

                      case 23:
                        _updatedUser = _context59.sent;

                      case 24:
                        _context59.next = 26;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userId) }));

                      case 26:
                        user = _context59.sent;

                        if (!(item && user)) {
                          _context59.next = 30;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context59.abrupt('return', { token: token, item: item });

                      case 30:
                      case 'end':
                        return _context59.stop();
                    }
                  }
                }, null, undefined);
              },

              deleteItem: function deleteItem(root, args, context, info) {
                var deleteItem;
                return regeneratorRuntime.async(function deleteItem$(_context60) {
                  while (1) {
                    switch (_context60.prev = _context60.next) {
                      case 0:
                        _context60.next = 2;
                        return regeneratorRuntime.awrap(Items.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args._id) }, {
                          $set: { active: false },
                          $push: { deleted: args.date }
                        }));

                      case 2:
                        deleteItem = _context60.sent;

                        console.log(deleteItem);
                        return _context60.abrupt('return', true);

                      case 5:
                      case 'end':
                        return _context60.stop();
                    }
                  }
                }, null, undefined);
              },

              activateItem: function activateItem(root, args, context, info) {
                var activateItem;
                return regeneratorRuntime.async(function activateItem$(_context61) {
                  while (1) {
                    switch (_context61.prev = _context61.next) {
                      case 0:
                        _context61.next = 2;
                        return regeneratorRuntime.awrap(Items.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args._id) }, {
                          $set: { active: true },
                          $push: { activated: args.date }
                        }));

                      case 2:
                        activateItem = _context61.sent;
                        return _context61.abrupt('return', true);

                      case 4:
                      case 'end':
                        return _context61.stop();
                    }
                  }
                }, null, undefined);
              },

              // DONT USE ACTIVITIES ANYMORE
              createActivity: function createActivity(root, args, context, info) {
                var res, activity, updateUser;
                return regeneratorRuntime.async(function createActivity$(_context62) {
                  while (1) {
                    switch (_context62.prev = _context62.next) {
                      case 0:
                        _context62.next = 2;
                        return regeneratorRuntime.awrap(Activities.insert(args));

                      case 2:
                        res = _context62.sent;
                        _context62.t0 = prepare;
                        _context62.next = 6;
                        return regeneratorRuntime.awrap(Activities.findOne({ _id: res.insertedIds[0] }));

                      case 6:
                        _context62.t1 = _context62.sent;
                        activity = (0, _context62.t0)(_context62.t1);
                        _context62.next = 10;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.userId) }, { $set: {
                            $push: {
                              activity: res.insertedIds[0]
                            }
                          }
                        }));

                      case 10:
                        updateUser = _context62.sent;
                        return _context62.abrupt('return', true);

                      case 12:
                      case 'end':
                        return _context62.stop();
                    }
                  }
                }, null, undefined);
              },

              createConversation: function createConversation(root, args, context, info) {
                var conv1, conv2, res, updateUserFrom, updateUserTo;
                return regeneratorRuntime.async(function createConversation$(_context63) {
                  while (1) {
                    switch (_context63.prev = _context63.next) {
                      case 0:
                        _context63.next = 2;
                        return regeneratorRuntime.awrap(Conversations.findOne({
                          userFrom: args.userFrom,
                          userTo: args.userTo
                        }));

                      case 2:
                        conv1 = _context63.sent;
                        _context63.next = 5;
                        return regeneratorRuntime.awrap(Conversations.findOne({
                          userFrom: args.userTo,
                          userTo: args.userConv
                        }));

                      case 5:
                        conv2 = _context63.sent;

                        if (!(!conv1 && !conv2)) {
                          _context63.next = 19;
                          break;
                        }

                        _context63.next = 9;
                        return regeneratorRuntime.awrap(Conversations.insert(args));

                      case 9:
                        res = _context63.sent;
                        _context63.next = 12;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.userFrom) }, {
                          $push: {
                            conversations: res.insertedIds[0]
                          }
                        }));

                      case 12:
                        updateUserFrom = _context63.sent;
                        _context63.next = 15;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.userTo) }, {
                          $push: {
                            conversations: res.insertedIds[0]
                          }
                        }));

                      case 15:
                        updateUserTo = _context63.sent;
                        return _context63.abrupt('return', res.insertedIds[0]);

                      case 19:
                        if (!conv1) {
                          _context63.next = 23;
                          break;
                        }

                        return _context63.abrupt('return', conv1._id.toString());

                      case 23:
                        if (!conv2) {
                          _context63.next = 25;
                          break;
                        }

                        return _context63.abrupt('return', conv2._id.toString());

                      case 25:
                      case 'end':
                        return _context63.stop();
                    }
                  }
                }, null, undefined);
              },

              createMessage: function createMessage(root, args, context, info) {
                var res, updateConversation, user, token;
                return regeneratorRuntime.async(function createMessage$(_context64) {
                  while (1) {
                    switch (_context64.prev = _context64.next) {
                      case 0:
                        _context64.next = 2;
                        return regeneratorRuntime.awrap(Messages.insert(args));

                      case 2:
                        res = _context64.sent;
                        _context64.next = 5;
                        return regeneratorRuntime.awrap(Conversations.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.conversation) }, {
                          $set: {
                            lastDate: new Date().toISOString()
                          },
                          $push: {
                            messages: res.insertedIds[0]
                          }
                        }));

                      case 5:
                        updateConversation = _context64.sent;
                        _context64.next = 8;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userFrom) }));

                      case 8:
                        user = _context64.sent;

                        if (!user) {
                          _context64.next = 14;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context64.abrupt('return', { token: token, user: user });

                      case 14:
                        throw new _validationError2.default("Error");

                      case 15:
                      case 'end':
                        return _context64.stop();
                    }
                  }
                }, null, undefined);
              },

              createRequest: function createRequest(root, args, context, info) {
                var res, userList, updateUsers, updateItem, user, token;
                return regeneratorRuntime.async(function createRequest$(_context65) {
                  while (1) {
                    switch (_context65.prev = _context65.next) {
                      case 0:
                        _context65.next = 2;
                        return regeneratorRuntime.awrap(Requests.insert(args));

                      case 2:
                        res = _context65.sent;
                        userList = [(0, _mongodb.ObjectId)(args.userFrom), (0, _mongodb.ObjectId)(args.userTo)];
                        _context65.next = 6;
                        return regeneratorRuntime.awrap(Users.update({ _id: { $in: userList } }, {
                          $push: { requests: res.insertedIds[0] }
                        }, { multi: true }));

                      case 6:
                        updateUsers = _context65.sent;
                        _context65.next = 9;
                        return regeneratorRuntime.awrap(Items.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.item) }, {
                          $push: { requests: res.insertedIds[0] }
                        }));

                      case 9:
                        updateItem = _context65.sent;
                        _context65.next = 12;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userFrom) }));

                      case 12:
                        user = _context65.sent;

                        if (!user) {
                          _context65.next = 18;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context65.abrupt('return', { token: token, user: user });

                      case 18:
                        throw new _validationError2.default("Error");

                      case 19:
                      case 'end':
                        return _context65.stop();
                    }
                  }
                }, null, undefined);
              },

              cancelRequest: function cancelRequest(root, args, context, info) {
                var res, userList, updateUsers, updateItem, user, token;
                return regeneratorRuntime.async(function cancelRequest$(_context66) {
                  while (1) {
                    switch (_context66.prev = _context66.next) {
                      case 0:
                        _context66.next = 2;
                        return regeneratorRuntime.awrap(Requests.deleteOne({ _id: (0, _mongodb.ObjectId)(args._id) }));

                      case 2:
                        res = _context66.sent;
                        userList = [(0, _mongodb.ObjectId)(args.userFrom), (0, _mongodb.ObjectId)(args.userTo)];
                        _context66.next = 6;
                        return regeneratorRuntime.awrap(Users.update({ _id: { $in: userList } }, {
                          $pull: { requests: (0, _mongodb.ObjectId)(args._id) }
                        }, { multi: true }));

                      case 6:
                        updateUsers = _context66.sent;
                        _context66.next = 9;
                        return regeneratorRuntime.awrap(Items.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.item) }, {
                          $pull: { requests: (0, _mongodb.ObjectId)(args._id) }
                        }));

                      case 9:
                        updateItem = _context66.sent;
                        _context66.next = 12;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userFrom) }));

                      case 12:
                        user = _context66.sent;

                        if (!user) {
                          _context66.next = 18;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context66.abrupt('return', { token: token, user: user });

                      case 18:
                        throw new _validationError2.default("Error");

                      case 19:
                      case 'end':
                        return _context66.stop();
                    }
                  }
                }, null, undefined);
              },

              acceptRequest: function acceptRequest(root, args, context, info) {
                var updateRequest;
                return regeneratorRuntime.async(function acceptRequest$(_context67) {
                  while (1) {
                    switch (_context67.prev = _context67.next) {
                      case 0:
                        _context67.next = 2;
                        return regeneratorRuntime.awrap(Requests.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args._id) }, { $set: {
                            active: false,
                            accepted: true,
                            responseDate: new Date().toISOString(),
                            responseMessage: ''
                          } }));

                      case 2:
                        updateRequest = _context67.sent;
                        return _context67.abrupt('return', args._id);

                      case 4:
                      case 'end':
                        return _context67.stop();
                    }
                  }
                }, null, undefined);
              },

              createTransaction: function createTransaction(root, args, context, info) {
                var res, updateUserFrom, updateUserTo, updateItem, user, token;
                return regeneratorRuntime.async(function createTransaction$(_context68) {
                  while (1) {
                    switch (_context68.prev = _context68.next) {
                      case 0:
                        _context68.next = 2;
                        return regeneratorRuntime.awrap(Transactions.insert(args));

                      case 2:
                        res = _context68.sent;
                        _context68.next = 5;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.userFrom) }, {
                          $push: { transactions: res.insertedIds[0] }
                        }));

                      case 5:
                        updateUserFrom = _context68.sent;
                        _context68.next = 8;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.userTo) }, {
                          $push: { transactions: res.insertedIds[0] }
                        }));

                      case 8:
                        updateUserTo = _context68.sent;
                        _context68.next = 11;
                        return regeneratorRuntime.awrap(Items.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.item) }, {
                          $set: { active: false },
                          $push: { transactions: res.insertedIds[0] }
                        }));

                      case 11:
                        updateItem = _context68.sent;


                        // return userPayload
                        user = void 0;

                        if (!(args.user === args.userFrom)) {
                          _context68.next = 17;
                          break;
                        }

                        _context68.next = 16;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userFrom) }));

                      case 16:
                        user = _context68.sent;

                      case 17:
                        if (!(args.user === args.userTo)) {
                          _context68.next = 21;
                          break;
                        }

                        _context68.next = 20;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userTo) }));

                      case 20:
                        user = _context68.sent;

                      case 21:
                        if (!user) {
                          _context68.next = 26;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context68.abrupt('return', { token: token, user: user });

                      case 26:
                        throw new _validationError2.default("Error");

                      case 27:
                      case 'end':
                        return _context68.stop();
                    }
                  }
                }, null, undefined);
              },

              rejectRequest: function rejectRequest(root, args, context, info) {
                var res, user, token;
                return regeneratorRuntime.async(function rejectRequest$(_context69) {
                  while (1) {
                    switch (_context69.prev = _context69.next) {
                      case 0:
                        _context69.next = 2;
                        return regeneratorRuntime.awrap(Requests.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args._id) }, { $set: {
                            active: false,
                            accepted: false,
                            responseDate: new Date().toISOString(),
                            responseMessage: ''
                          } }));

                      case 2:
                        res = _context69.sent;


                        // return userPayload
                        user = void 0;

                        if (!(args.user === args.userFrom)) {
                          _context69.next = 8;
                          break;
                        }

                        _context69.next = 7;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userFrom) }));

                      case 7:
                        user = _context69.sent;

                      case 8:
                        if (!(args.user === args.userTo)) {
                          _context69.next = 12;
                          break;
                        }

                        _context69.next = 11;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userTo) }));

                      case 11:
                        user = _context69.sent;

                      case 12:
                        if (!user) {
                          _context69.next = 17;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context69.abrupt('return', { token: token, user: user });

                      case 17:
                        throw new _validationError2.default("Error");

                      case 18:
                      case 'end':
                        return _context69.stop();
                    }
                  }
                }, null, undefined);
              },

              returnItem: function returnItem(root, args, context, info) {
                var resReview, review, resTransaction, _review2, _resTransaction, userList, updateUsers, resItem, user, token;

                return regeneratorRuntime.async(function returnItem$(_context70) {
                  while (1) {
                    switch (_context70.prev = _context70.next) {
                      case 0:

                        // Update transaction
                        resReview = void 0;

                        if (!(args.user === args.userFrom)) {
                          _context70.next = 11;
                          break;
                        }

                        review = {
                          transaction: args.transaction,
                          userFrom: args.userFrom,
                          userTo: args.userTo,
                          date: args.date,
                          item: args.item,
                          rate: args.rate,
                          comment: args.comment
                        };
                        _context70.next = 5;
                        return regeneratorRuntime.awrap(Reviews.insert(review));

                      case 5:
                        resReview = _context70.sent;
                        _context70.next = 8;
                        return regeneratorRuntime.awrap(Transactions.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.transaction) }, { $set: {
                            active: false,
                            dateFinished: args.date,
                            reviewFrom: resReview.insertedIds[0]
                          }
                        }));

                      case 8:
                        resTransaction = _context70.sent;
                        _context70.next = 22;
                        break;

                      case 11:
                        if (!(args.user === args.userTo)) {
                          _context70.next = 21;
                          break;
                        }

                        _review2 = {
                          transaction: args.transaction,
                          userFrom: args.userTo,
                          userTo: args.userFrom,
                          date: args.date,
                          item: args.item,
                          rate: args.rate,
                          comment: args.comment
                        };
                        _context70.next = 15;
                        return regeneratorRuntime.awrap(Reviews.insert(_review2));

                      case 15:
                        resReview = _context70.sent;
                        _context70.next = 18;
                        return regeneratorRuntime.awrap(Transactions.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.transaction) }, { $set: {
                            active: false,
                            dateFinished: args.date,
                            reviewTo: resReview.insertedIds[0]
                          }
                        }));

                      case 18:
                        _resTransaction = _context70.sent;
                        _context70.next = 22;
                        break;

                      case 21:
                        console.log('aca esta el error');

                      case 22:

                        // Update users
                        userList = [(0, _mongodb.ObjectId)(args.userFrom), (0, _mongodb.ObjectId)(args.userTo)];
                        _context70.next = 25;
                        return regeneratorRuntime.awrap(Users.update({ _id: { $in: userList } }, {
                          $push: { reviews: resReview.insertedIds[0] }
                        }, { multi: true }));

                      case 25:
                        updateUsers = _context70.sent;
                        _context70.next = 28;
                        return regeneratorRuntime.awrap(Items.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.item) }, { $set: { active: true } }));

                      case 28:
                        resItem = _context70.sent;


                        // return userPayload
                        user = void 0;

                        if (!(args.user === args.userFrom)) {
                          _context70.next = 34;
                          break;
                        }

                        _context70.next = 33;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userFrom) }));

                      case 33:
                        user = _context70.sent;

                      case 34:
                        if (!(args.user === args.userTo)) {
                          _context70.next = 38;
                          break;
                        }

                        _context70.next = 37;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userTo) }));

                      case 37:
                        user = _context70.sent;

                      case 38:
                        if (!user) {
                          _context70.next = 43;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context70.abrupt('return', { token: token, user: user });

                      case 43:
                        throw new _validationError2.default("Error");

                      case 44:
                      case 'end':
                        return _context70.stop();
                    }
                  }
                }, null, undefined);
              },

              viewActivity: function viewActivity(root, args, context, info) {
                var activityList, res;
                return regeneratorRuntime.async(function viewActivity$(_context71) {
                  while (1) {
                    switch (_context71.prev = _context71.next) {
                      case 0:
                        activityList = [];

                        args.activityId.map(function (act) {
                          activityList.push((0, _mongodb.ObjectId)(act));
                        });
                        _context71.next = 4;
                        return regeneratorRuntime.awrap(Activities.update({
                          _id: { $in: activityList } }, { $set: { viewed: true } }, { multi: true }));

                      case 4:
                        res = _context71.sent;
                        return _context71.abrupt('return', true);

                      case 6:
                      case 'end':
                        return _context71.stop();
                    }
                  }
                }, null, undefined);
              },

              viewMessage: function viewMessage(root, args, context, info) {
                var res;
                return regeneratorRuntime.async(function viewMessage$(_context72) {
                  while (1) {
                    switch (_context72.prev = _context72.next) {
                      case 0:
                        if (!(args.userFrom !== args.userId)) {
                          _context72.next = 5;
                          break;
                        }

                        _context72.next = 3;
                        return regeneratorRuntime.awrap(Messages.update({
                          conversation: args.conversationId.toString() }, { $set: { read: true } }, { multi: true }));

                      case 3:
                        res = _context72.sent;
                        return _context72.abrupt('return', true);

                      case 5:
                        return _context72.abrupt('return', false);

                      case 6:
                      case 'end':
                        return _context72.stop();
                    }
                  }
                }, null, undefined);
              },

              createView: function createView(root, args, context, info) {
                var thisItem, checkView, res, updateItemViews, updateItemViewCOunt;
                return regeneratorRuntime.async(function createView$(_context73) {
                  while (1) {
                    switch (_context73.prev = _context73.next) {
                      case 0:
                        _context73.next = 2;
                        return regeneratorRuntime.awrap(Items.findOne({ _id: (0, _mongodb.ObjectId)(args.item) }));

                      case 2:
                        thisItem = _context73.sent;
                        _context73.next = 5;
                        return regeneratorRuntime.awrap(Views.findOne({
                          user: args.user,
                          item: args.item
                        }));

                      case 5:
                        checkView = _context73.sent;
                        _context73.next = 8;
                        return regeneratorRuntime.awrap(Views.insert(args));

                      case 8:
                        res = _context73.sent;
                        _context73.next = 11;
                        return regeneratorRuntime.awrap(Items.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.item) }, {
                          $push: {
                            views: res.insertedIds[0]
                          }
                        }));

                      case 11:
                        updateItemViews = _context73.sent;

                        if (checkView) {
                          _context73.next = 16;
                          break;
                        }

                        _context73.next = 15;
                        return regeneratorRuntime.awrap(Items.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.item) }, {
                          $inc: {
                            viewCount: 1
                          }
                        }));

                      case 15:
                        updateItemViewCOunt = _context73.sent;

                      case 16:
                        return _context73.abrupt('return', true);

                      case 17:
                      case 'end':
                        return _context73.stop();
                    }
                  }
                }, null, undefined);
              },

              testCreateUsers: function testCreateUsers(root, args, context, info) {
                var user1, user2, users, res;
                return regeneratorRuntime.async(function testCreateUsers$(_context74) {
                  while (1) {
                    switch (_context74.prev = _context74.next) {
                      case 0:
                        user1 = {
                          username: "andresmechali",
                          email: "andresmechali@gmail.com",
                          firstName: "Andres",
                          lastName: "Mechali",
                          password: "asd",
                          picturePath: 'no-image.png',
                          status: 'NEW MEMBER',
                          offered: [],
                          requested: [],
                          registered: new Date().toISOString(),
                          lastConnection: new Date().toISOString(),
                          radiusOfSearch: 20,
                          isAdmin: false,
                          isSuperAdmin: false,
                          activity: [],
                          conversations: [],
                          reviews: [],
                          transactions: [],
                          requests: []
                        };
                        user2 = {
                          username: "juanperez",
                          email: "juanperez@gmail.com",
                          firstName: "Juan",
                          lastName: "Perez",
                          password: "asd",
                          picturePath: 'no-image.png',
                          status: 'NEW MEMBER',
                          offered: [],
                          requested: [],
                          registered: new Date().toISOString(),
                          lastConnection: new Date().toISOString(),
                          radiusOfSearch: 20,
                          isAdmin: false,
                          isSuperAdmin: false,
                          activity: [],
                          conversations: [],
                          reviews: [],
                          transactions: [],
                          requests: []
                        };
                        users = [user1, user2];
                        _context74.next = 5;
                        return regeneratorRuntime.awrap(Users.insertMany(users));

                      case 5:
                        res = _context74.sent;
                        return _context74.abrupt('return', true);

                      case 7:
                      case 'end':
                        return _context74.stop();
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

          // Receive photo and store it
          upload = (0, _multer2.default)({
            dest: './public/images/',
            rename: function rename(fieldname, filename) {
              return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
            },
            onFileUploadStart: function onFileUploadStart(file) {
              console.log(file.fieldname + ' is starting ...');
            },
            onFileUploadData: function onFileUploadData(file, data) {
              console.log(data.length + ' of ' + file.fieldname + ' arrived');
            },
            onFileUploadComplete: function onFileUploadComplete(file) {
              console.log(file.fieldname + ' uploaded to  ' + file.path);
            }
          });

          // Apply bodyParser to all requests

          app.use(_bodyParser2.default.urlencoded({ extended: false, limit: '5mb', parameterLimit: 100000 }));
          app.use(_bodyParser2.default.json({ limit: '5mb', parameterLimit: 100000 }));
          app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
          /*
          // Check if token has been modified
          app.use(function(req, res, next) {
            if (req.headers.authorization) {
              const token = req.headers.authorization.split(' ')[1]
              if(token != "null") { // null or undefined
                try {
                  const decoded = jwt.verify(token, jwtSecret)
                  res.locals.user = decoded
                  next()
                } catch(err) {
                  res.sendStatus(401)
                }  
              }
              else {
                next()
              }
            }
            else {
              res.sendStatus(401)
            }
          });*/

          process.on('unhandledRejection', function (reason, p) {
            console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
            // application specific logging, throwing an error, or other logic here
          });

          // Register last activity of user
          app.use(function (req, res, next) {
            if (res.locals.user) {
              var _userId = res.locals.user._id;
              var now = new Date().toISOString();
              var updatedUser = Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(_userId) }, { $set: { lastConnection: now }
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

          app.post('/upload/photo', upload.single('image'), function (req, res) {
            res.header("Access-Control-Allow-Origin", "*");
            console.log(req.file);
            var filename = req.file.filename;
            var mimetype = req.file.mimetype.split("/")[1];
            res.status(200).send({ 'filename': filename + '.' + mimetype });
          });

          app.listen(PORT, function () {
            console.log('Visit ' + URL + ':' + PORT);
          });

          _context75.next = 32;
          break;

        case 29:
          _context75.prev = 29;
          _context75.t0 = _context75['catch'](0);

          console.log(_context75.t0);

        case 32:
        case 'end':
          return _context75.stop();
      }
    }
  }, null, undefined, [[0, 29]]);
};