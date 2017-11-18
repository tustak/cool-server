import {MongoClient, ObjectId} from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import isEmpty from 'lodash/isEmpty'

//-Files---
import config from '../config'
import typeDefs from './typeDefs.js'
import validateInput from './utils/formValidation'
import validationError from './errors/validationError'
import fix from './utils/fix'
//---------

const URL = 'http://localhost'
const PORT = 3001
const MONGO_URL = 'mongodb://localhost:27017/tustak'

const prepare = (o) => {
  o._id = o._id.toString()
  return o
}

export const start = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL)

    const Users = db.collection('users')
    const Items = db.collection('items')

    const resolvers = {
      Query: {
        userById: async (root, {_id}) => {
          return prepare(await Users.findOne(ObjectId(_id)))
        },
        users: async () => {
          return (await Users.find({}).toArray()).map(prepare)
        },
        item: async (root, {_id}) => {
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
            const token = jwt.sign({
              _id: user._id,
              username: user.username.toLower,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              picturePath: user.picturePath,
              status: user.status,
            }, config.jwtSecret)
            return {token, user}
          }
        },
        signinUser: async(root, args, context, info) => {
          if (await Users.findOne({username: args.usernameOrEmail.toLowerCase()})) {
            const user = await Users.findOne({username: args.usernameOrEmail.toLowerCase(), password: args.password})
            if (user) {
              const token = jwt.sign({
                _id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                picturePath: user.picturePath,
                status: user.status,
              }, config.jwtSecret)
              return {token, user}
            }
            else {
              throw new validationError('Password incorrect')
            }
          }
          else if (await Users.findOne({email: args.usernameOrEmail.toLowerCase()})) {
            const user  = await Users.findOne({email: args.usernameOrEmail.toLowerCase(), password: args.password})
            if (user) {
              const token = jwt.sign({
                _id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                picturePath: user.picturePath,
                status: user.status,
              }, config.jwtSecret)
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
        deleteUser: async (root, args, context, info) => {
          const res = await Users.findOneAndDelete(args)
          return prepare(await res.value)
        },
        createItem: async (root, args) => {
          const res = await Items.insert(args)
          return prepare(await Items.findOne({_id: res.insertedIds[0]}))
        },
      },
    }

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    })

    const app = express()

    app.use(cors())

    /*app.use('/graphql', bodyParser.json(), graphqlExpress({
      schema: schema,
      context: 'asd'
    }))*/

    app.use('/graphql', bodyParser.json(),
      graphqlExpress(request => ({
        schema: schema,
        context: {
          request
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
