"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeDefs = ["\n    type Query {\n      userById(_id: String): User\n      userByUsernameOrEmail(usernameOrEmail: String!, password: String!): User\n      users: [User]\n      itemById(_id: String): Item\n      items: [Item]\n    }\n\n    type SigninPayload {\n      token: String\n      user: User\n    }\n\n    type ItemToken {\n      token: String\n      item: Item\n    }\n\n    type User {\n      _id: String\n      username: String!\n      email: String!\n      firstName: String!\n      lastName: String!\n      password: String!\n      picturePath: String!\n      status: String!\n      dateOfBirth: String\n      countryOfBirth: String\n      countryOfResidence: String\n      cityOfResidence: String\n      postalCode: String\n      address: String\n      apartment: String\n      phoneCode: String\n      phoneNumber: String\n      gender: String\n      description: String\n      allowsToReceiveRequests: Boolean\n      radiusOfSearch: Int\n      facebook: String\n      instagram: String\n      linkedIn: String\n      twitter: String\n      validPhone: Boolean\n      validEmail: Boolean\n      facebookFriends: Int\n      offered: [Item!]\n      requested: [Item!]\n      isAdmin: Boolean\n      isSuperAdmin: Boolean\n      registered: String\n      lastConnection: String\n      lastLocation: String\n      lastLatitude: Float\n      lastLongitude: Float\n    }\n\n    type Item {\n      _id: String\n      name: String!\n      location: String!\n      latitude: Float!\n      longitude: Float!\n      description: String!\n      picturePath: String!\n      created: String!\n      active: Boolean!\n      user: User\n      views: [View]!\n      viewCount: Int!\n    }\n\n    type View {\n      _id: String\n      user: User!\n      item: Item!\n      date: String!\n    }\n\n    type Mutation {\n      createUser(username: String!, email: String!, firstName: String!, lastName: String!, password: String!, picturePath: String!, status: String!, offered: [String], requested: [String], registered: String!, lastConnection: String!, radiusOfSearch: Int!, isAdmin: Boolean!, isSuperAdmin: Boolean): SigninPayload\n      signinUser(usernameOrEmail: String!, password: String!): SigninPayload\n      updateUser(_id: String, dateOfBirth: String, countryOfBirth: String, countryOfResidence: String, cityOfResidence: String, postalCode: String, gender: String, phoneCode: String, phoneNumber: String, address: String, apartment: String, description: String): SigninPayload\n      changePassword(_id: String!, currentPassword: String!, password: String!, repeatPassword: String!): SigninPayload\n      createItem(name: String!, location: String!, latitude: Float!, longitude: Float!, description: String!, userId: String!, picturePath: String!, created: String!, active: Boolean!, views: [String]!, viewCount: Int!): ItemToken\n      createView(user: String!, item: String!, date: String!): Boolean\n  }\n\n    schema {\n      query: Query\n      mutation: Mutation\n    }\n  "];

exports.default = typeDefs;
/*
      type View {
      _id: String
      user: User!
      item: Item!
      date: String!
    }
createView (_id: String, user: User!, item: Item!, date: String!): View
        
*/