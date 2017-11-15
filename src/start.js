import {MongoClient, ObjectId} from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import cors from 'cors'

import isEmpty from 'lodash/isEmpty'

//-Files---
import typeDefs from './typeDefs.js';
import validateInput from './utils/formValidation'
import validationError from './errors/validationError'
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
        userByUsernameOrEmail: async (root, args) => {
          if (await Users.findOne({username: args.usernameOrEmail})) {
            const user = await Users.findOne({username: args.usernameOrEmail, password: args.password})
            if (user) {
              return user
            }
            else {
              throw new validationError('Password incorrect')
            }
          }
          else if (await Users.findOne({email: args.usernameOrEmail})) {
            const user  = await Users.findOne({email: args.usernameOrEmail, password: args.password})
            if (user) {
              return user
            }
            else {
              throw new validationError('Password incorrect')
            }
          } 
          else{
            throw new validationError("User not found")             
          }
            
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
          if (await Users.findOne({username: args.username})) {
            errors['username'] = `User ${args.username} already exists`
          }
          if (await Users.findOne({email: args.email})) {
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
            const res = await Users.insert(args)
            return prepare(await Users.findOne({_id: res.insertedIds[0]}))
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

    app.use('/graphql', bodyParser.json(), graphqlExpress({
      schema: schema,
    }))

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
