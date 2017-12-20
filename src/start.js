import {MongoClient, ObjectId} from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

import isEmpty from 'lodash/isEmpty'

//-Files---
import getModels from './models'
import typeDefs from './typeDefs.js'
import validateInput from './utils/formValidation'
import distance from './utils/distance'
import validationError from './errors/validationError'
import authenticate from './middlewares/authenticate'
import fix from './utils/fix'
//---------

// COnfig
const jwtSecret = process.env.jwtSecret || require('../config').default.jwtSecret
const mongoURL = process.env.mongoURL || 'mongodb://localhost:27017/tustak'

const URL = 'http://localhost'
const PORT = process.env.PORT || 3001
//const MONGO_URL = 'mongodb://localhost:27017/tustak'
const MONGO_URL = mongoURL

const prepare = (o) => {
  o._id = o._id.toString()
  return o
}

export const start = async () => {
  try {
    //const db = await MongoClient.connect(MONGO_URL)
    const models = await getModels()

    const Users = models.Users//db.collection('users')
    const Items = models.Items//db.collection('items')
    const Views = models.Views
    const Reviews = models.Reviews
    const Activities = models.Activities
    const Messages = models.Messages
    const Conversations = models.Conversations

    const resolvers = {
      Query: {
        userById: async (root, {_id}) => {
          return prepare(await Users.findOne(ObjectId(_id)))
        },
        users: async () => {
          return (await Users.find({}).toArray()).map(prepare)
        },
        itemById: async (root, {_id}) => {
          return prepare(await Items.findOne(ObjectId(_id)))
        },
        items: async () => {
          return (await Items.find({}).toArray()).map(prepare)
        },
        lastOffers: async(root, {_id}) => {
          return (await Items.find({type: "offer", userId: {$ne: _id}}).limit(10).toArray()).map(prepare)
        },
        lastRequests: async(root, {_id}) => {
          return (await Items.find({type: "request", userId: {$ne: _id}}).limit(10).toArray()).map(prepare)
        },
        reviewsByFrom: async(root, {userId}) => {
          const reviews = await Reviews.find({from: ObjectId(userId)})
          console.log(reviews)
          return 3.5
        },
        reviewsByTo: async(root, {userId}) => {
          const reviews = await Reviews.find({to: ObjectId(userId)})
          console.log(reviews)
          return 3.5
        },
        reviewsByItem: async(root, {itemId}) => {
          const reviews = await Reviews.findOne({tem: ObjectId(userId)})
          console.log(reviews)
          return 3.5
        },
        activityByUserIdItem: async(root, {_id, type}) => {
          return (await Activities.find({user: _id, type: type}).sort({date: -1}).toArray()).map(prepare)
        },
        activityByUserIdMessage: async(root, {_id, type}) => {
          const messageList = []
          const messages = (await Messages.find({userTo: _id}).toArray()).map(prepare).map(message => {messageList.push(message._id)})
          return (await Activities.find({message: {$in: messageList}, type: type}).sort({date: -1}).toArray()).map(prepare)
        },
        conversationsByUserId: async(root, {_id}) => {
          return prepare(await Users.findOne(ObjectId(_id)))
        },
        messagesByConversationId: async(root, {_id}) => {
          const messageList = []
          const messages = (await Messages.find({conversation: _id}).toArray()).map(prepare).map(message => {messageList.push(message._id)})
          return (await Messages.find({_id: {$in: messageList}}).sort({date: -1}).toArray()).map(prepare)
        },
      },
      User: {
        offered: async (user) => {
          return (
            await Items.find(
              {_id: {$in: user.offered}}
            ).toArray()
          )
        },
        requested: async (user) => {
          return (
            await Items.find(
              {_id: {$in: user.requested}}
            ).toArray()
          )
        },
        activity: async (user) => {
          return (
            await Activities.find(
              {_id: {$in: user.activity}}
            ).toArray()
          )
        },
        conversations: async (user) => {
          return (
            await Conversations.find(
              {_id: {$in: user.conversations}}
            ).toArray()
          )
        }
      },
      Item: {
        user: async ({userId}) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        views: async (item) => {
          return (
            await Views.find(
              {_id: {$in: item.views}}
            ).toArray()
          )
        }
      },
      Activity: {
        user: async({user}) => {
          return prepare(await Users.findOne(ObjectId(user)))
        },
        item: async ({item}) => {
          return prepare(await Items.findOne(ObjectId(item)))
        },
        review: async ({review}) => {
          return prepare(await Reviews.findOne(ObjectId(review)))
        },
        message: async ({message}) => {
          return prepare(await Messages.findOne(ObjectId(message)))
        },
      },
      Conversation: {
        item: async ({item}) => {
          return prepare(await Items.findOne(ObjectId(item)))
        },
        userFrom: async({userFrom}) => {
          return prepare(await Users.findOne(ObjectId(userFrom)))
        },
        userTo: async({userTo}) => {
          return prepare(await Users.findOne(ObjectId(userTo)))
        },
        messages: async (conversation) => {
          return (
            await Messages.find(
              {_id: {$in: conversation.messages}}
            ).toArray()
          )
        }
      },
      Message: {
        conversation: async ({conversation}) => {
          return prepare(await Conversations.findOne(ObjectId(conversation)))
        },
        item: async ({item}) => {
          return prepare(await Items.findOne(ObjectId(item)))
        },
        userFrom: async({userFrom}) => {
          return prepare(await Users.findOne(ObjectId(userFrom)))
        },
        userTo: async({userTo}) => {
          return prepare(await Users.findOne(ObjectId(userTo)))
        },
      },
      View: {
        user: async ({userId}) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        item: async ({itemId}) => {
          return prepare(await Items.findOne(ObjectId(itemId)))
        }
      },
      Review: {
        from: async ({userId}) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        to: async ({userId}) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        },
        item: async ({itemId}) => {
          return prepare(await Items.findOne(ObjectId(itemId)))
        },
      },
      Mutation: {
        createUser: async (root, args, context, info) => {
          let errors = validateInput(_.omit(args, 'offered', 'requested', 'activity', 'conversations'))
          if (await Users.findOne({username: args.username.toLowerCase()})) {
            errors['username'] = `User ${args.username.toLowerCase()} already exists`
          }
          if (await Users.findOne({email: args.email.toLowerCase()})) {
            errors['email'] = 'Email already used'
          }
          if (!isEmpty(errors)) {
            const errorList = []
            Object.keys(errors).map(
              key => {
                errorList.push(errors[key])
              }
            )
            throw new validationError(errorList)
          }
          else {
            const res = await Users.insert(fix(args))
            const user = prepare(await Users.findOne({_id: res.insertedIds[0]}))
            const token = jwt.sign(
                _.omit(user, 'password'), 
                jwtSecret)
              return {token, user}
          }
        },
        signinUser: async(root, args, context, info) => {
          //const currentUser = authenticate(context.req, context.res, models)
          if (await Users.findOne({username: args.usernameOrEmail.toLowerCase()})) {
            const user = await Users.findOne({username: args.usernameOrEmail.toLowerCase(), password: args.password})
            if (user) {
              const token = jwt.sign(
                _.omit(user, 'password'), 
                jwtSecret)
              return {token, user}
            }
            else {
              throw new validationError('Password incorrect')
            }
          }
          else if (await Users.findOne({email: args.usernameOrEmail.toLowerCase()})) {
            const user  = await Users.findOne({email: args.usernameOrEmail.toLowerCase(), password: args.password})
            if (user) {
              const token = jwt.sign(
                _.omit(user, 'password'), 
                jwtSecret)
              return {token, user}
            }
            else {
              throw new validationError('Password incorrect')
            }
          } 
          else{
            throw new validationError("User not found")             
          }
        },
        updateUser: async(root, args, context, info) => {
          const currentUser = authenticate(context.req, context.res, models)
          let errors = validateInput(args, true)
          if (!isEmpty(errors)) {
            const errorList = []
            Object.keys(errors).map(
              key => {
                errorList.push(errors[key])
              }
            )
            throw new validationError(errorList)
          }

          const updateArgs = _.omit(args, '_id')
          const updatedUser = await Users.findOneAndUpdate(
            {_id: ObjectId(args._id)}, 
            {$set: 
              updateArgs
            }, 
            {returnNewDocument: true}
          )
          const user = await Users.findOne({_id: ObjectId(args._id)})
          if (user) {
            const token = jwt.sign(
                _.omit(user, 'password'), 
                jwtSecret)
              return {token, user}
          }
        },
        changePassword: async(root, args, context, info) => {
          const currentUser = authenticate(context.req, context.res, models)
          let errors = validateInput(args, true)
          if (!isEmpty(errors)) {
            const errorList = []
            Object.keys(errors).map(
              key => {
                errorList.push(errors[key])
              }
            )
            throw new validationError(errorList)
          }

          const updatedUser = await Users.findOneAndUpdate(
            {_id: ObjectId(args._id), password: args.currentPassword}, 
            {$set: 
              {password: args.password}
            }, 
            {returnNewDocument: true}
          )
          const user = await Users.findOne({_id: ObjectId(args._id), password: args.password})
          if (user) {
            const token = jwt.sign(
                _.omit(user, 'password'), 
                jwtSecret)
              return {token, user}
          }
          else {
            throw new validationError("Password incorrect")
          }
        },
        createItem: async (root, args, context, info) => {
          let errors = validateInput(_.omit(args, 'views'))

          if (!isEmpty(errors)) {
            const errorList = []
            Object.keys(errors).map(
              key => {
                errorList.push(errors[key])
              }
            )
            throw new validationError(errorList)
          }

          else {
            // Create item
            const res = await Items.insert(fix(args))
            const item = prepare(await Items.findOne({_id: res.insertedIds[0]}))

            // Update user last location
            if (args.type === 'offer') {
              const updatedUser = await Users.findOneAndUpdate(
                {_id: ObjectId(args.userId)},
                {$set:
                  {
                    lastLocation: args.location,
                    lastLatitude: args.latitude,
                    lastLongitude: args.longitude,
                  },
                 $push: 
                  {
                    offered: res.insertedIds[0]
                  }
                },
                {returnNewDocument: true}
              )  
            }
            else {
              const updatedUser = await Users.findOneAndUpdate(
              {_id: ObjectId(args.userId)},
                {$set:
                  {
                    lastLocation: args.location,
                    lastLatitude: args.latitude,
                    lastLongitude: args.longitude,
                  },
                 $push: 
                  {
                    requested: res.insertedIds[0]
                  }
                },
                {returnNewDocument: true}
              )
            }
            
            
            const user = await Users.findOne({_id: ObjectId(args.userId)})
            if (item && user) {
              const token = jwt.sign(
                _.omit(user, 'password'), 
                jwtSecret)
              return {token, item}
            }
          }
        },

        createActivity: async(root, args, context, info) => {
          // Create new object every time something happens
          const res = await Activities.insert(args)
          const activity = prepare(await Activities.findOne({_id: res.insertedIds[0]}))
          const updateUser = await Users.findOneAndUpdate(
            {_id: ObjectId(args.userId)},
            {$set:
              {
                $push:
                  {
                    activity: res.insertedIds[0]
                  }
              }
            }
          )
          return true
        },

        createConversation: async(root, args, context, info) => {
          const res = await Conversations.insert(args)
          const updateUserFrom = await Users.findOneAndUpdate(
            {_id: ObjectId(args.userFrom)},
            {
              $push:
                {
                  conversations: res.insertedIds[0]
                }
            }
          )
          const updateUserTo = await Users.findOneAndUpdate(
            {_id: ObjectId(args.userTo)},
            {
              $push:
                {
                  conversations: res.insertedIds[0]
                }
            }
          )
          return res.insertedIds[0]
        },

        createMessage: async(root, args, context, info) => {
          const res = await Messages.insert(args)
          //const message = prepare(await Messages.findOne({_id: res.insertedIds[0]}))

          const updateConversation = await Conversations.findOneAndUpdate(
            {_id: ObjectId(args.conversation)},
            { 
              $set: {
                lastDate: new Date().toISOString(),
              },
              $push:
              {
                messages: res.insertedIds[0] 
              }
            }
          )
          return res.insertedIds[0]
        },

        viewActivity: async(root, args, context, info) => {
          const activityList = []
          args.activityId.map(act => {activityList.push(ObjectId(act))})
          const res = await Activities.update({
            _id: {$in: activityList}}, 
            {$set: {viewed: true}},
            {multi: true}
          )
          return true
        },

        viewMessage: async(root, args, context, info) => {
          if (args.userFrom !== args.userId) {
            const res = await Messages.update({
              conversation: args.conversationId.toString()}, 
              {$set: {read: true}},
              {multi: true}
            )
            return true
          }
          return false
        },

        createView: async (root, args, context, info) => {
          // Get item if for checking if it's from the same user
          const thisItem = await Items.findOne({_id: ObjectId(args.item)})

          //if (thisItem.userId !== args.user) { //if same user
            // Check if user has already visited this item
            const checkView = await Views.findOne({
              user: args.user,
              item: args.item
            })

            // Insert (even if exists. History might be useful some day)
            const res = await Views.insert(args)
            const updateItemViews = await Items.findOneAndUpdate(
              {_id: ObjectId(args.item)},
              {
                $push:
                {
                  views: res.insertedIds[0]
                }
              }
            )
            if (!checkView) {
              const updateItemViewCOunt = await Items.findOneAndUpdate(
              {_id: ObjectId(args.item)},
              {
                $inc:
                {
                  viewCount: 1
                }
              }
            )
            }
            return true
          //}
         // else {
          //  return false
         // }
        },

        createReview: async(root, args, context, info) => {
          // Check if rating exists for this item
          const reviewForThisItem = await Reviews.findOne({item: ObjectId(args.item)})

          // If doesnt exists...
          if (!reviewForThisItem) {
            const thisReview = await Reviews.insert(args)
            return true
          }

          return false

        },
      },
    }

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    })

    const app = express()

    //app.use(cors())
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });
    
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
    });

    process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
      // application specific logging, throwing an error, or other logic here
    });

    // Register last activity of user
    app.use(function(req, res, next) {
      if (res.locals.user) {
        const userId = res.locals.user._id
        const now = new Date().toISOString()
        const updatedUser = Users.findOneAndUpdate(
          {_id: ObjectId(userId)}, 
          {$set: 
            {lastConnection: now}
          }, 
        )
      }
      next()
    });

    app.use('/graphql', cors(), bodyParser.json(),
      graphqlExpress((req, res) => ({
        schema: schema,
        context: {
          req,
          res
        },
      }))
    )

    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql',
    }))

    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}`)
    })

  } catch (e) {
    console.log(e)
  }

}
