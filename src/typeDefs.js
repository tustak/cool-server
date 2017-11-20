const typeDefs = [`
    type Query {
      userById(_id: String): User
      userByUsernameOrEmail(usernameOrEmail: String!, password: String!): User
      users: [User]
      item(_id: String): Item
      items: [Item]
    }

    type SigninPayload {
      token: String
      user: User
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
      published: [Item!]
      requested: [Item!]
      isAdmin: Boolean
      isSuperAdmin: Boolean
      registered: String
      lastConnection: String
      lastLocation: [Float!]
    }

    type Item {
      _id: String
      name: String
      description: String
      user: User
    }

    type Mutation {
      createUser(username: String!, email: String!, firstName: String!, lastName: String!, password: String!, picturePath: String!, status: String!): SigninPayload
      signinUser(usernameOrEmail: String!, password: String!): SigninPayload
      updateUser(_id: String, dateOfBirth: String, countryOfBirth: String, countryOfResidence: String, cityOfResidence: String, postalCode: String, gender: String, phoneCode: String, phoneNumber: String, address: String, apartment: String, description: String): SigninPayload
      deleteUser(username: String): User
      createItem(name: String, description: String, userId: String): Item
    }

    schema {
      query: Query
      mutation: Mutation
    }
  `];

  export default typeDefs