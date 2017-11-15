const typeDefs = [`
    type Query {
      userById(_id: String): User
      userByUsernameOrEmail(usernameOrEmail: String!, password: String!): User
      users: [User]
      item(_id: String): Item
      items: [Item]
    }

    type User {
      _id: String
      username: String!
      email: String!
      firstName: String!
      lastName: String!
      password: String!
      dateOfBirth: String
      countryOfBirth: String
      countryOfResidence: String
      cityOfResidence: String
      postalCode: String
      address: String
      apartment: String
      phoneCode: String
      phoneNumber: String
      gender: Gender
      picturePath: String
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

    enum Gender {
      M
      F
      LGBT
    }

    type Item {
      _id: String
      name: String
      description: String
      user: User
    }

    type Mutation {
      createUser(username: String, email: String, firstName: String, lastName: String, password: String): User
      deleteUser(username: String): User
      createItem(name: String, description: String, userId: String): Item
    }

    schema {
      query: Query
      mutation: Mutation
    }
  `];

  export default typeDefs