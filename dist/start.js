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
  var models, Users, Items, Views, Reviews, Activities, Messages, Conversations, resolvers, schema, app;
  return regeneratorRuntime.async(function _callee$(_context49) {
    while (1) {
      switch (_context49.prev = _context49.next) {
        case 0:
          _context49.prev = 0;
          _context49.next = 3;
          return regeneratorRuntime.awrap((0, _models2.default)());

        case 3:
          models = _context49.sent;
          Users = models.Users; //db.collection('users')

          Items = models.Items; //db.collection('items')

          Views = models.Views;
          Reviews = models.Reviews;
          Activities = models.Activities;
          Messages = models.Messages;
          Conversations = models.Conversations;
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
              activityByUserIdItem: function activityByUserIdItem(root, _ref8) {
                var _id = _ref8._id,
                    type = _ref8.type;
                return regeneratorRuntime.async(function activityByUserIdItem$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return regeneratorRuntime.awrap(Activities.find({ user: _id, type: type }).sort({ date: -1 }).toArray());

                      case 2:
                        _context10.t0 = prepare;
                        return _context10.abrupt('return', _context10.sent.map(_context10.t0));

                      case 4:
                      case 'end':
                        return _context10.stop();
                    }
                  }
                }, null, undefined);
              },
              activityByUserIdMessage: function activityByUserIdMessage(root, _ref9) {
                var _id = _ref9._id,
                    type = _ref9.type;
                var messageList, messages;
                return regeneratorRuntime.async(function activityByUserIdMessage$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        messageList = [];
                        _context11.next = 3;
                        return regeneratorRuntime.awrap(Messages.find({ userTo: _id }).toArray());

                      case 3:
                        _context11.t0 = prepare;

                        _context11.t1 = function (message) {
                          messageList.push(message._id);
                        };

                        messages = _context11.sent.map(_context11.t0).map(_context11.t1);
                        _context11.next = 8;
                        return regeneratorRuntime.awrap(Activities.find({ message: { $in: messageList }, type: type }).sort({ date: -1 }).toArray());

                      case 8:
                        _context11.t2 = prepare;
                        return _context11.abrupt('return', _context11.sent.map(_context11.t2));

                      case 10:
                      case 'end':
                        return _context11.stop();
                    }
                  }
                }, null, undefined);
              },
              conversationsByUserId: function conversationsByUserId(root, _ref10) {
                var _id = _ref10._id;
                return regeneratorRuntime.async(function conversationsByUserId$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.t0 = prepare;
                        _context12.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_id)));

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
              messagesByConversationId: function messagesByConversationId(root, _ref11) {
                var _id = _ref11._id;
                var messageList, messages;
                return regeneratorRuntime.async(function messagesByConversationId$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        messageList = [];
                        _context13.next = 3;
                        return regeneratorRuntime.awrap(Messages.find({ conversation: _id }).toArray());

                      case 3:
                        _context13.t0 = prepare;

                        _context13.t1 = function (message) {
                          messageList.push(message._id);
                        };

                        messages = _context13.sent.map(_context13.t0).map(_context13.t1);
                        _context13.next = 8;
                        return regeneratorRuntime.awrap(Messages.find({ _id: { $in: messageList } }).sort({ date: -1 }).toArray());

                      case 8:
                        _context13.t2 = prepare;
                        return _context13.abrupt('return', _context13.sent.map(_context13.t2));

                      case 10:
                      case 'end':
                        return _context13.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            User: {
              offered: function offered(user) {
                return regeneratorRuntime.async(function offered$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        _context14.next = 2;
                        return regeneratorRuntime.awrap(Items.find({ _id: { $in: user.offered } }).toArray());

                      case 2:
                        return _context14.abrupt('return', _context14.sent);

                      case 3:
                      case 'end':
                        return _context14.stop();
                    }
                  }
                }, null, undefined);
              },
              requested: function requested(user) {
                return regeneratorRuntime.async(function requested$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.next = 2;
                        return regeneratorRuntime.awrap(Items.find({ _id: { $in: user.requested } }).toArray());

                      case 2:
                        return _context15.abrupt('return', _context15.sent);

                      case 3:
                      case 'end':
                        return _context15.stop();
                    }
                  }
                }, null, undefined);
              },
              activity: function activity(user) {
                return regeneratorRuntime.async(function activity$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        _context16.next = 2;
                        return regeneratorRuntime.awrap(Activities.find({ _id: { $in: user.activity } }).toArray());

                      case 2:
                        return _context16.abrupt('return', _context16.sent);

                      case 3:
                      case 'end':
                        return _context16.stop();
                    }
                  }
                }, null, undefined);
              },
              conversations: function conversations(user) {
                return regeneratorRuntime.async(function conversations$(_context17) {
                  while (1) {
                    switch (_context17.prev = _context17.next) {
                      case 0:
                        _context17.next = 2;
                        return regeneratorRuntime.awrap(Conversations.find({ _id: { $in: user.conversations } }).toArray());

                      case 2:
                        return _context17.abrupt('return', _context17.sent);

                      case 3:
                      case 'end':
                        return _context17.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Item: {
              user: function user(_ref12) {
                var userId = _ref12.userId;
                return regeneratorRuntime.async(function user$(_context18) {
                  while (1) {
                    switch (_context18.prev = _context18.next) {
                      case 0:
                        _context18.t0 = prepare;
                        _context18.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context18.t1 = _context18.sent;
                        return _context18.abrupt('return', (0, _context18.t0)(_context18.t1));

                      case 5:
                      case 'end':
                        return _context18.stop();
                    }
                  }
                }, null, undefined);
              },
              views: function views(item) {
                return regeneratorRuntime.async(function views$(_context19) {
                  while (1) {
                    switch (_context19.prev = _context19.next) {
                      case 0:
                        _context19.next = 2;
                        return regeneratorRuntime.awrap(Views.find({ _id: { $in: item.views } }).toArray());

                      case 2:
                        return _context19.abrupt('return', _context19.sent);

                      case 3:
                      case 'end':
                        return _context19.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Activity: {
              user: function user(_ref13) {
                var _user = _ref13.user;
                return regeneratorRuntime.async(function user$(_context20) {
                  while (1) {
                    switch (_context20.prev = _context20.next) {
                      case 0:
                        _context20.t0 = prepare;
                        _context20.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_user)));

                      case 3:
                        _context20.t1 = _context20.sent;
                        return _context20.abrupt('return', (0, _context20.t0)(_context20.t1));

                      case 5:
                      case 'end':
                        return _context20.stop();
                    }
                  }
                }, null, undefined);
              },
              item: function item(_ref14) {
                var _item = _ref14.item;
                return regeneratorRuntime.async(function item$(_context21) {
                  while (1) {
                    switch (_context21.prev = _context21.next) {
                      case 0:
                        _context21.t0 = prepare;
                        _context21.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(_item)));

                      case 3:
                        _context21.t1 = _context21.sent;
                        return _context21.abrupt('return', (0, _context21.t0)(_context21.t1));

                      case 5:
                      case 'end':
                        return _context21.stop();
                    }
                  }
                }, null, undefined);
              },
              review: function review(_ref15) {
                var _review = _ref15.review;
                return regeneratorRuntime.async(function review$(_context22) {
                  while (1) {
                    switch (_context22.prev = _context22.next) {
                      case 0:
                        _context22.t0 = prepare;
                        _context22.next = 3;
                        return regeneratorRuntime.awrap(Reviews.findOne((0, _mongodb.ObjectId)(_review)));

                      case 3:
                        _context22.t1 = _context22.sent;
                        return _context22.abrupt('return', (0, _context22.t0)(_context22.t1));

                      case 5:
                      case 'end':
                        return _context22.stop();
                    }
                  }
                }, null, undefined);
              },
              message: function message(_ref16) {
                var _message = _ref16.message;
                return regeneratorRuntime.async(function message$(_context23) {
                  while (1) {
                    switch (_context23.prev = _context23.next) {
                      case 0:
                        _context23.t0 = prepare;
                        _context23.next = 3;
                        return regeneratorRuntime.awrap(Messages.findOne((0, _mongodb.ObjectId)(_message)));

                      case 3:
                        _context23.t1 = _context23.sent;
                        return _context23.abrupt('return', (0, _context23.t0)(_context23.t1));

                      case 5:
                      case 'end':
                        return _context23.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Conversation: {
              item: function item(_ref17) {
                var _item2 = _ref17.item;
                return regeneratorRuntime.async(function item$(_context24) {
                  while (1) {
                    switch (_context24.prev = _context24.next) {
                      case 0:
                        _context24.t0 = prepare;
                        _context24.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(_item2)));

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
              userFrom: function userFrom(_ref18) {
                var _userFrom = _ref18.userFrom;
                return regeneratorRuntime.async(function userFrom$(_context25) {
                  while (1) {
                    switch (_context25.prev = _context25.next) {
                      case 0:
                        _context25.t0 = prepare;
                        _context25.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userFrom)));

                      case 3:
                        _context25.t1 = _context25.sent;
                        return _context25.abrupt('return', (0, _context25.t0)(_context25.t1));

                      case 5:
                      case 'end':
                        return _context25.stop();
                    }
                  }
                }, null, undefined);
              },
              userTo: function userTo(_ref19) {
                var _userTo = _ref19.userTo;
                return regeneratorRuntime.async(function userTo$(_context26) {
                  while (1) {
                    switch (_context26.prev = _context26.next) {
                      case 0:
                        _context26.t0 = prepare;
                        _context26.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userTo)));

                      case 3:
                        _context26.t1 = _context26.sent;
                        return _context26.abrupt('return', (0, _context26.t0)(_context26.t1));

                      case 5:
                      case 'end':
                        return _context26.stop();
                    }
                  }
                }, null, undefined);
              },
              messages: function messages(conversation) {
                return regeneratorRuntime.async(function messages$(_context27) {
                  while (1) {
                    switch (_context27.prev = _context27.next) {
                      case 0:
                        _context27.next = 2;
                        return regeneratorRuntime.awrap(Messages.find({ _id: { $in: conversation.messages } }).toArray());

                      case 2:
                        return _context27.abrupt('return', _context27.sent);

                      case 3:
                      case 'end':
                        return _context27.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Message: {
              conversation: function conversation(_ref20) {
                var _conversation = _ref20.conversation;
                return regeneratorRuntime.async(function conversation$(_context28) {
                  while (1) {
                    switch (_context28.prev = _context28.next) {
                      case 0:
                        _context28.t0 = prepare;
                        _context28.next = 3;
                        return regeneratorRuntime.awrap(Conversations.findOne((0, _mongodb.ObjectId)(_conversation)));

                      case 3:
                        _context28.t1 = _context28.sent;
                        return _context28.abrupt('return', (0, _context28.t0)(_context28.t1));

                      case 5:
                      case 'end':
                        return _context28.stop();
                    }
                  }
                }, null, undefined);
              },
              item: function item(_ref21) {
                var _item3 = _ref21.item;
                return regeneratorRuntime.async(function item$(_context29) {
                  while (1) {
                    switch (_context29.prev = _context29.next) {
                      case 0:
                        _context29.t0 = prepare;
                        _context29.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(_item3)));

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
              userFrom: function userFrom(_ref22) {
                var _userFrom2 = _ref22.userFrom;
                return regeneratorRuntime.async(function userFrom$(_context30) {
                  while (1) {
                    switch (_context30.prev = _context30.next) {
                      case 0:
                        _context30.t0 = prepare;
                        _context30.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userFrom2)));

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
              userTo: function userTo(_ref23) {
                var _userTo2 = _ref23.userTo;
                return regeneratorRuntime.async(function userTo$(_context31) {
                  while (1) {
                    switch (_context31.prev = _context31.next) {
                      case 0:
                        _context31.t0 = prepare;
                        _context31.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(_userTo2)));

                      case 3:
                        _context31.t1 = _context31.sent;
                        return _context31.abrupt('return', (0, _context31.t0)(_context31.t1));

                      case 5:
                      case 'end':
                        return _context31.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            View: {
              user: function user(_ref24) {
                var userId = _ref24.userId;
                return regeneratorRuntime.async(function user$(_context32) {
                  while (1) {
                    switch (_context32.prev = _context32.next) {
                      case 0:
                        _context32.t0 = prepare;
                        _context32.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

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
              item: function item(_ref25) {
                var itemId = _ref25.itemId;
                return regeneratorRuntime.async(function item$(_context33) {
                  while (1) {
                    switch (_context33.prev = _context33.next) {
                      case 0:
                        _context33.t0 = prepare;
                        _context33.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(itemId)));

                      case 3:
                        _context33.t1 = _context33.sent;
                        return _context33.abrupt('return', (0, _context33.t0)(_context33.t1));

                      case 5:
                      case 'end':
                        return _context33.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Review: {
              from: function from(_ref26) {
                var userId = _ref26.userId;
                return regeneratorRuntime.async(function from$(_context34) {
                  while (1) {
                    switch (_context34.prev = _context34.next) {
                      case 0:
                        _context34.t0 = prepare;
                        _context34.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

                      case 3:
                        _context34.t1 = _context34.sent;
                        return _context34.abrupt('return', (0, _context34.t0)(_context34.t1));

                      case 5:
                      case 'end':
                        return _context34.stop();
                    }
                  }
                }, null, undefined);
              },
              to: function to(_ref27) {
                var userId = _ref27.userId;
                return regeneratorRuntime.async(function to$(_context35) {
                  while (1) {
                    switch (_context35.prev = _context35.next) {
                      case 0:
                        _context35.t0 = prepare;
                        _context35.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne((0, _mongodb.ObjectId)(userId)));

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
              item: function item(_ref28) {
                var itemId = _ref28.itemId;
                return regeneratorRuntime.async(function item$(_context36) {
                  while (1) {
                    switch (_context36.prev = _context36.next) {
                      case 0:
                        _context36.t0 = prepare;
                        _context36.next = 3;
                        return regeneratorRuntime.awrap(Items.findOne((0, _mongodb.ObjectId)(itemId)));

                      case 3:
                        _context36.t1 = _context36.sent;
                        return _context36.abrupt('return', (0, _context36.t0)(_context36.t1));

                      case 5:
                      case 'end':
                        return _context36.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Mutation: {
              createUser: function createUser(root, args, context, info) {
                var errors, errorList, res, user, token;
                return regeneratorRuntime.async(function createUser$(_context37) {
                  while (1) {
                    switch (_context37.prev = _context37.next) {
                      case 0:
                        errors = (0, _formValidation2.default)(_lodash2.default.omit(args, 'offered', 'requested', 'activity', 'conversations'));
                        _context37.next = 3;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.username.toLowerCase() }));

                      case 3:
                        if (!_context37.sent) {
                          _context37.next = 5;
                          break;
                        }

                        errors['username'] = 'User ' + args.username.toLowerCase() + ' already exists';

                      case 5:
                        _context37.next = 7;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.email.toLowerCase() }));

                      case 7:
                        if (!_context37.sent) {
                          _context37.next = 9;
                          break;
                        }

                        errors['email'] = 'Email already used';

                      case 9:
                        if ((0, _isEmpty2.default)(errors)) {
                          _context37.next = 15;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 15:
                        _context37.next = 17;
                        return regeneratorRuntime.awrap(Users.insert((0, _fix2.default)(args)));

                      case 17:
                        res = _context37.sent;
                        _context37.t0 = prepare;
                        _context37.next = 21;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: res.insertedIds[0] }));

                      case 21:
                        _context37.t1 = _context37.sent;
                        user = (0, _context37.t0)(_context37.t1);
                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context37.abrupt('return', { token: token, user: user });

                      case 25:
                      case 'end':
                        return _context37.stop();
                    }
                  }
                }, null, undefined);
              },
              signinUser: function signinUser(root, args, context, info) {
                var user, token, _user2, _token;

                return regeneratorRuntime.async(function signinUser$(_context38) {
                  while (1) {
                    switch (_context38.prev = _context38.next) {
                      case 0:
                        _context38.next = 2;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.usernameOrEmail.toLowerCase() }));

                      case 2:
                        if (!_context38.sent) {
                          _context38.next = 14;
                          break;
                        }

                        _context38.next = 5;
                        return regeneratorRuntime.awrap(Users.findOne({ username: args.usernameOrEmail.toLowerCase(), password: args.password }));

                      case 5:
                        user = _context38.sent;

                        if (!user) {
                          _context38.next = 11;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context38.abrupt('return', { token: token, user: user });

                      case 11:
                        throw new _validationError2.default('Password incorrect');

                      case 12:
                        _context38.next = 29;
                        break;

                      case 14:
                        _context38.next = 16;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.usernameOrEmail.toLowerCase() }));

                      case 16:
                        if (!_context38.sent) {
                          _context38.next = 28;
                          break;
                        }

                        _context38.next = 19;
                        return regeneratorRuntime.awrap(Users.findOne({ email: args.usernameOrEmail.toLowerCase(), password: args.password }));

                      case 19:
                        _user2 = _context38.sent;

                        if (!_user2) {
                          _context38.next = 25;
                          break;
                        }

                        _token = _jsonwebtoken2.default.sign(_lodash2.default.omit(_user2, 'password'), jwtSecret);
                        return _context38.abrupt('return', { token: _token, user: _user2 });

                      case 25:
                        throw new _validationError2.default('Password incorrect');

                      case 26:
                        _context38.next = 29;
                        break;

                      case 28:
                        throw new _validationError2.default("User not found");

                      case 29:
                      case 'end':
                        return _context38.stop();
                    }
                  }
                }, null, undefined);
              },
              updateUser: function updateUser(root, args, context, info) {
                var currentUser, errors, errorList, updateArgs, updatedUser, user, token;
                return regeneratorRuntime.async(function updateUser$(_context39) {
                  while (1) {
                    switch (_context39.prev = _context39.next) {
                      case 0:
                        currentUser = (0, _authenticate2.default)(context.req, context.res, models);
                        errors = (0, _formValidation2.default)(args, true);

                        if ((0, _isEmpty2.default)(errors)) {
                          _context39.next = 6;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 6:
                        updateArgs = _lodash2.default.omit(args, '_id');
                        _context39.next = 9;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args._id) }, { $set: updateArgs
                        }, { returnNewDocument: true }));

                      case 9:
                        updatedUser = _context39.sent;
                        _context39.next = 12;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args._id) }));

                      case 12:
                        user = _context39.sent;

                        if (!user) {
                          _context39.next = 16;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context39.abrupt('return', { token: token, user: user });

                      case 16:
                      case 'end':
                        return _context39.stop();
                    }
                  }
                }, null, undefined);
              },
              changePassword: function changePassword(root, args, context, info) {
                var currentUser, errors, errorList, updatedUser, user, token;
                return regeneratorRuntime.async(function changePassword$(_context40) {
                  while (1) {
                    switch (_context40.prev = _context40.next) {
                      case 0:
                        currentUser = (0, _authenticate2.default)(context.req, context.res, models);
                        errors = (0, _formValidation2.default)(args, true);

                        if ((0, _isEmpty2.default)(errors)) {
                          _context40.next = 6;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 6:
                        _context40.next = 8;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args._id), password: args.currentPassword }, { $set: { password: args.password }
                        }, { returnNewDocument: true }));

                      case 8:
                        updatedUser = _context40.sent;
                        _context40.next = 11;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args._id), password: args.password }));

                      case 11:
                        user = _context40.sent;

                        if (!user) {
                          _context40.next = 17;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context40.abrupt('return', { token: token, user: user });

                      case 17:
                        throw new _validationError2.default("Password incorrect");

                      case 18:
                      case 'end':
                        return _context40.stop();
                    }
                  }
                }, null, undefined);
              },
              createItem: function createItem(root, args, context, info) {
                var errors, errorList, res, item, updatedUser, _updatedUser, user, token;

                return regeneratorRuntime.async(function createItem$(_context41) {
                  while (1) {
                    switch (_context41.prev = _context41.next) {
                      case 0:
                        errors = (0, _formValidation2.default)(_lodash2.default.omit(args, 'views'));

                        if ((0, _isEmpty2.default)(errors)) {
                          _context41.next = 7;
                          break;
                        }

                        errorList = [];

                        Object.keys(errors).map(function (key) {
                          errorList.push(errors[key]);
                        });
                        throw new _validationError2.default(errorList);

                      case 7:
                        _context41.next = 9;
                        return regeneratorRuntime.awrap(Items.insert((0, _fix2.default)(args)));

                      case 9:
                        res = _context41.sent;
                        _context41.t0 = prepare;
                        _context41.next = 13;
                        return regeneratorRuntime.awrap(Items.findOne({ _id: res.insertedIds[0] }));

                      case 13:
                        _context41.t1 = _context41.sent;
                        item = (0, _context41.t0)(_context41.t1);

                        if (!(args.type === 'offer')) {
                          _context41.next = 21;
                          break;
                        }

                        _context41.next = 18;
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
                        updatedUser = _context41.sent;
                        _context41.next = 24;
                        break;

                      case 21:
                        _context41.next = 23;
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
                        _updatedUser = _context41.sent;

                      case 24:
                        _context41.next = 26;
                        return regeneratorRuntime.awrap(Users.findOne({ _id: (0, _mongodb.ObjectId)(args.userId) }));

                      case 26:
                        user = _context41.sent;

                        if (!(item && user)) {
                          _context41.next = 30;
                          break;
                        }

                        token = _jsonwebtoken2.default.sign(_lodash2.default.omit(user, 'password'), jwtSecret);
                        return _context41.abrupt('return', { token: token, item: item });

                      case 30:
                      case 'end':
                        return _context41.stop();
                    }
                  }
                }, null, undefined);
              },

              createActivity: function createActivity(root, args, context, info) {
                var res, activity, updateUser;
                return regeneratorRuntime.async(function createActivity$(_context42) {
                  while (1) {
                    switch (_context42.prev = _context42.next) {
                      case 0:
                        _context42.next = 2;
                        return regeneratorRuntime.awrap(Activities.insert(args));

                      case 2:
                        res = _context42.sent;
                        _context42.t0 = prepare;
                        _context42.next = 6;
                        return regeneratorRuntime.awrap(Activities.findOne({ _id: res.insertedIds[0] }));

                      case 6:
                        _context42.t1 = _context42.sent;
                        activity = (0, _context42.t0)(_context42.t1);
                        _context42.next = 10;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.userId) }, { $set: {
                            $push: {
                              activity: res.insertedIds[0]
                            }
                          }
                        }));

                      case 10:
                        updateUser = _context42.sent;
                        return _context42.abrupt('return', true);

                      case 12:
                      case 'end':
                        return _context42.stop();
                    }
                  }
                }, null, undefined);
              },

              createConversation: function createConversation(root, args, context, info) {
                var res, updateUserFrom, updateUserTo;
                return regeneratorRuntime.async(function createConversation$(_context43) {
                  while (1) {
                    switch (_context43.prev = _context43.next) {
                      case 0:
                        _context43.next = 2;
                        return regeneratorRuntime.awrap(Conversations.insert(args));

                      case 2:
                        res = _context43.sent;
                        _context43.next = 5;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.userFrom) }, {
                          $push: {
                            conversations: res.insertedIds[0]
                          }
                        }));

                      case 5:
                        updateUserFrom = _context43.sent;
                        _context43.next = 8;
                        return regeneratorRuntime.awrap(Users.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.userTo) }, {
                          $push: {
                            conversations: res.insertedIds[0]
                          }
                        }));

                      case 8:
                        updateUserTo = _context43.sent;
                        return _context43.abrupt('return', res.insertedIds[0]);

                      case 10:
                      case 'end':
                        return _context43.stop();
                    }
                  }
                }, null, undefined);
              },

              createMessage: function createMessage(root, args, context, info) {
                var res, updateConversation;
                return regeneratorRuntime.async(function createMessage$(_context44) {
                  while (1) {
                    switch (_context44.prev = _context44.next) {
                      case 0:
                        _context44.next = 2;
                        return regeneratorRuntime.awrap(Messages.insert(args));

                      case 2:
                        res = _context44.sent;
                        _context44.next = 5;
                        return regeneratorRuntime.awrap(Conversations.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.conversation) }, {
                          $set: {
                            lastDate: new Date().toISOString()
                          },
                          $push: {
                            messages: res.insertedIds[0]
                          }
                        }));

                      case 5:
                        updateConversation = _context44.sent;
                        return _context44.abrupt('return', res.insertedIds[0]);

                      case 7:
                      case 'end':
                        return _context44.stop();
                    }
                  }
                }, null, undefined);
              },

              viewActivity: function viewActivity(root, args, context, info) {
                var activityList, res;
                return regeneratorRuntime.async(function viewActivity$(_context45) {
                  while (1) {
                    switch (_context45.prev = _context45.next) {
                      case 0:
                        activityList = [];

                        args.activityId.map(function (act) {
                          activityList.push((0, _mongodb.ObjectId)(act));
                        });
                        _context45.next = 4;
                        return regeneratorRuntime.awrap(Activities.update({
                          _id: { $in: activityList } }, { $set: { viewed: true } }, { multi: true }));

                      case 4:
                        res = _context45.sent;
                        return _context45.abrupt('return', true);

                      case 6:
                      case 'end':
                        return _context45.stop();
                    }
                  }
                }, null, undefined);
              },

              viewMessage: function viewMessage(root, args, context, info) {
                var res;
                return regeneratorRuntime.async(function viewMessage$(_context46) {
                  while (1) {
                    switch (_context46.prev = _context46.next) {
                      case 0:
                        if (!(args.userFrom !== args.userId)) {
                          _context46.next = 5;
                          break;
                        }

                        _context46.next = 3;
                        return regeneratorRuntime.awrap(Messages.update({
                          conversation: args.conversationId.toString() }, { $set: { read: true } }, { multi: true }));

                      case 3:
                        res = _context46.sent;
                        return _context46.abrupt('return', true);

                      case 5:
                        return _context46.abrupt('return', false);

                      case 6:
                      case 'end':
                        return _context46.stop();
                    }
                  }
                }, null, undefined);
              },

              createView: function createView(root, args, context, info) {
                var thisItem, checkView, res, updateItemViews, updateItemViewCOunt;
                return regeneratorRuntime.async(function createView$(_context47) {
                  while (1) {
                    switch (_context47.prev = _context47.next) {
                      case 0:
                        _context47.next = 2;
                        return regeneratorRuntime.awrap(Items.findOne({ _id: (0, _mongodb.ObjectId)(args.item) }));

                      case 2:
                        thisItem = _context47.sent;
                        _context47.next = 5;
                        return regeneratorRuntime.awrap(Views.findOne({
                          user: args.user,
                          item: args.item
                        }));

                      case 5:
                        checkView = _context47.sent;
                        _context47.next = 8;
                        return regeneratorRuntime.awrap(Views.insert(args));

                      case 8:
                        res = _context47.sent;
                        _context47.next = 11;
                        return regeneratorRuntime.awrap(Items.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.item) }, {
                          $push: {
                            views: res.insertedIds[0]
                          }
                        }));

                      case 11:
                        updateItemViews = _context47.sent;

                        if (checkView) {
                          _context47.next = 16;
                          break;
                        }

                        _context47.next = 15;
                        return regeneratorRuntime.awrap(Items.findOneAndUpdate({ _id: (0, _mongodb.ObjectId)(args.item) }, {
                          $inc: {
                            viewCount: 1
                          }
                        }));

                      case 15:
                        updateItemViewCOunt = _context47.sent;

                      case 16:
                        return _context47.abrupt('return', true);

                      case 17:
                      case 'end':
                        return _context47.stop();
                    }
                  }
                }, null, undefined);
              },

              createReview: function createReview(root, args, context, info) {
                var reviewForThisItem, thisReview;
                return regeneratorRuntime.async(function createReview$(_context48) {
                  while (1) {
                    switch (_context48.prev = _context48.next) {
                      case 0:
                        _context48.next = 2;
                        return regeneratorRuntime.awrap(Reviews.findOne({ item: (0, _mongodb.ObjectId)(args.item) }));

                      case 2:
                        reviewForThisItem = _context48.sent;

                        if (reviewForThisItem) {
                          _context48.next = 8;
                          break;
                        }

                        _context48.next = 6;
                        return regeneratorRuntime.awrap(Reviews.insert(args));

                      case 6:
                        thisReview = _context48.sent;
                        return _context48.abrupt('return', true);

                      case 8:
                        return _context48.abrupt('return', false);

                      case 9:
                      case 'end':
                        return _context48.stop();
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

          app.listen(PORT, function () {
            console.log('Visit ' + URL + ':' + PORT);
          });

          _context49.next = 26;
          break;

        case 23:
          _context49.prev = 23;
          _context49.t0 = _context49['catch'](0);

          console.log(_context49.t0);

        case 26:
        case 'end':
          return _context49.stop();
      }
    }
  }, null, undefined, [[0, 23]]);
};