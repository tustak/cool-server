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
      },
      User: {
        published: async ({_id}) => {
          return (await Items.find({itemId: _id}).toArray()).map(prepare)
        },
        requested: async ({_id}) => {
          return (await Items.find({itemId: _id}).toArray()).map(prepare)
        }
      },
      Item: {
        user: async ({userId}) => {
          return prepare(await Users.findOne(ObjectId(userId)))
        }
      },
      Mutation: {
        createUser: async (root, args, context, info) => {
          let errors = validateInput(args)
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
        createItem: async (root, args, context, info) => {
          let errors = validateInput(args)

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
            // Update user last location
            const updatedUser = await Users.findOneAndUpdate(
              {_id: ObjectId(args.userId)},
              {$set:
                {
                  lastLocation: args.location,
                  lastLatitude: args.latitude,
                  lastLongitude: args.longitude
                }
              },
              {returnNewDocument: true}
            )
            // Create item
            console.log(args)
            const res = await Items.insert(fix(args))
            const item = prepare(await Items.findOne({_id: res.insertedIds[0]}))


            return item
          }
        },

        deleteUser: async (root, args, context, info) => {
          const res = await Users.findOneAndDelete(args)
          return prepare(await res.value)
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

    /*app.use('/graphql', bodyParser.json(), graphqlExpress({
      schema: schema,
      context: 'asd'
    }))*/

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
