const typeDefs = [`
    type Query {
      userById(_id: String): User
      userByUsernameOrEmail(usernameOrEmail: String!, password: String!): User
      users: [User]
      itemById(_id: String): Item
      items: [Item]
      lastOffers(_id: String): [Item]
      lastRequests(_id: String): [Item]
      reviewsByFrom(from: String!): Float
      reviewsByTo(to: String!): Float
      reviewsByItem(item: String!): Float
      activityByUserIdItem(_id: String!, type: String!): [Activity]
      activityByUserIdMessage(_id: String!, type: String!): [Activity]
      conversationsByUserId(_id: String!): User
      messagesByConversationId(_id: String!): [Message!]
    }

    type UserPayload {
      token: String
      user: User
    }

    type ItemToken {
      token: String
      item: Item
    }

    type User {
      _id: String
      username: String!
      email: String!
      firstName: String!
      lastName: String!
      password: String!
      picturePath: String!
      status: String!
      dateOfBirth: String
      countryOfBirth: String
      countryOfResidence: String
      cityOfResidence: String
      postalCode: String
      address: String
      apartment: String
      phoneCode: String
      phoneNumber: String
      gender: String
      description: String
      allowsToReceiveRequests: Boolean
      radiusOfSearch: Int
      facebook: String
      instagram: String
      linkedIn: String
      twitter: String
      validPhone: Boolean
      validEmail: Boolean
      facebookFriends: Int
      offered: [Item!]
      requested: [Item!]
      isAdmin: Boolean
      isSuperAdmin: Boolean
      registered: String
      lastConnection: String
      lastLocation: String
      lastLatitude: Float
      lastLongitude: Float
      activity: [Activity!]
      conversations: [Conversation!]
      reviews: [Review!]
      transactions: [Transaction!]
      requests: [Request!]
    }

    type Activity {
      _id: String
      type: String!
      user: User!
      activityId: String!
      date: String!
      viewed: Boolean!
      item: Item
      review: Review
      message: Message
    }

    type Conversation {
      _id: String
      item: Item!
      userFrom: User!
      userTo: User!
      messages: [Message!]
      lastDate: String!
    }

    type Message {
      _id: String
      conversation: Conversation!
      item: Item!
      userFrom: User!
      userTo: User!
      message: String!
      date: String!
      read: Boolean!
    }

    type Item {
      _id: String
      name: String!
      location: String!
      latitude: Float!
      longitude: Float!
      description: String!
      picturePath: String!
      created: String!
      activated: [String!]
      deleted: [String!]
      active: Boolean!
      user: User
      views: [View]!
      viewCount: Int!
      type: String!
      reviews: [Review!]
      transactions: [Transaction!]
      requests: [Request!]
    }

    type Transaction {
      _id: String!
      item: Item!
      userFrom: User!
      userTo: User!
      dateCreated: String!
      active: Boolean!
      dateFinished: String
      request: Request!
      reviewFrom: Review
      reviewTo: Review
    }

    type Request {
      _id: String!
      item: Item!
      userFrom: User!
      userTo: User!
      date: String!
      message: String!
      active: Boolean!
      accepted: Boolean!
      responseDate: String!
      responseMessage: String!
      viewed: Boolean!
    }

    type View {
      _id: String
      user: User!
      item: Item!
      date: String!
    }

    type Review {
      _id: String
      transaction: Transaction!
      userFrom: User!
      userTo: User!
      date: String!
      item: Item!
      rate: Int!
      comment: String
    }

    type Mutation {
      createUser(username: String!, email: String!, firstName: String!, lastName: String!, password: String!, picturePath: String!, status: String!, offered: [String], requested: [String], registered: String!, lastConnection: String!, radiusOfSearch: Int!, isAdmin: Boolean!, isSuperAdmin: Boolean, activity: [String!], conversations: [String!], reviews: [String!], transactions: [String!], requests: [String!]): UserPayload
      signinUser(usernameOrEmail: String!, password: String!): UserPayload
      updateUser(_id: String, dateOfBirth: String, countryOfBirth: String, countryOfResidence: String, cityOfResidence: String, postalCode: String, gender: String, phoneCode: String, phoneNumber: String, address: String, apartment: String, description: String): UserPayload
      changePassword(_id: String!, currentPassword: String!, password: String!, repeatPassword: String!): UserPayload
      createItem(name: String!, location: String!, latitude: Float!, longitude: Float!, description: String!, userId: String!, picturePath: String!, created: String!, activated: [String!], deleted: [String!], active: Boolean!, views: [String]!, viewCount: Int!, type: String!, reviews: [String!], transactions: [String!], requests: [String!]): ItemToken
      deleteItem(_id: String!, date: String!): Boolean
      activateItem(id: String!, date: String!): Boolean
      createRequest(item: String!, userFrom: String!, userTo: String!, date: String!, message: String!, active: Boolean!, viewed: Boolean!, accepted: Boolean!): UserPayload
      cancelRequest(_id: String!, date: String!, userFrom: String!, userTo: String!): UserPayload
      acceptRequest(_id: String!, item: String!, date: String!, user: String!, userFrom: String!, userTo: String!, message: String!): String
      rejectRequest(_id: String!, item: String!, date: String!, user: String!, userFrom: String!, userTo: String!, message: String!): UserPayload
      createTransaction(item: String!, user: String!, userFrom: String!, userTo: String!, dateCreated: String!, active: String!, dateFinished: String!, request: String!): UserPayload
      returnItem(transaction: String!, item: String!, date: String!, user: String!, userFrom: String!, userTo: String!, reviewMessage: String!): UserPayload
      createView(user: String!, item: String!, date: String!): Boolean
      createReview(transaction: String!, userFrom: String!, userTo: String!, date: String!, item: String!, rate: Int!, comment: String!): UserPayload
      createActivity(type: String!, user: String!, activityId: String!, date: String!, viewed: Boolean!, item: String, review: String, message: String): Boolean
      createConversation(item: String!, userFrom: String!, userTo: String!, messages: [String!], lastDate: String!): String
      createMessage(conversation: String!, item: String!, userFrom: String!, userTo: String!, message: String!, date: String!, read: Boolean!): UserPayload
      viewActivity(activityId: [String!]): Boolean
      viewMessage(conversationId: String!, userId: String!, userFrom: String!): Boolean
      testCreateUsers(number: Int!): Boolean
    }

    schema {
      query: Query
      mutation: Mutation
    }
  `];

  export default typeDefs
/*
      type View {
      _id: String
      user: User!
      item: Item!
      date: String!
    }
createView (_id: String, user: User!, item: Item!, date: String!): View
        
*/
