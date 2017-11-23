const typeDefs = [`
    type Query {
      userById(_id: String): User
      userByUsernameOrEmail(usernameOrEmail: String!, password: String!): User
      users: [User]
      itemById(_id: String): Item
      items: [Item]
    }

    type SigninPayload {
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
      user: User
    }

    type Mutation {
      createUser(username: String!, email: String!, firstName: String!, lastName: String!, password: String!, picturePath: String!, status: String!, offered: [String], requested: [String], registered: String!, lastConnection: String!, radiusOfSearch: Int!, isAdmin: Boolean!, isSuperAdmin: Boolean): SigninPayload
      signinUser(usernameOrEmail: String!, password: String!): SigninPayload
      updateUser(_id: String, dateOfBirth: String, countryOfBirth: String, countryOfResidence: String, cityOfResidence: String, postalCode: String, gender: String, phoneCode: String, phoneNumber: String, address: String, apartment: String, description: String): SigninPayload
      createItem (name: String!, location: String!, latitude: Float!, longitude: Float!, description: String!, userId: String!, picturePath: String!, created: String!): ItemToken
      deleteUser(username: String): User
    }

    schema {
      query: Query
      mutation: Mutation
    }
  `];

  export default typeDefs