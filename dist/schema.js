"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeDefs = "\n  \n  type User {\n    _id: String!\n    username: String!\n    email: String!\n    firstName: String!\n    lastName: String!\n    password: String!\n    imagePath: String\n    dateOfBirth: String\n    countryOfBirth: String\n    countryOfResidence: String\n    cityOfResidence: String\n    postalCode: String\n    address: String\n    apartment: String\n    phoneCode: String\n    phoneNumber: String\n    gender: String\n    description: String\n    allowsToReceiveRequests: Boolean\n    radiusOfSearch: Int\n    facebook: String\n    instagram: String\n    linkedIn: String\n    twitter: String\n    validPhone: Boolean\n    validEmail: Boolean\n    facebookFriends: Int\n    itemsPublished: [Item]\n    isAdmin: Boolean\n    isSuperAdmin: Boolean\n    registered: String\n    lastConnection: String\n  }\n\n  type Item {\n    _id: String\n    name: String\n    description: String\n    user: User\n    publishDate: String\n    active: Boolean\n    imagePaths: [String]\n  }\n\n  type Query {\n    user(username: String, email: String): User\n    users: [User]\n    item(_id: String): Item\n    items: [Item]\n  }\n\n  type Mutation {\n    createUser(username: String!, email: String!, firstName: String!, lastName: String!, password: String!): User\n    deleteUser(username: String): User\n    createItem(name: String!, description: String!, userId: String!): Item\n  }\n\n  schema {\n    query: Query\n    mutation: Mutation\n  }\n";

exports.default = typeDefs;