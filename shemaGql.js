import { gql } from "apollo-server";
{
  /* 
    1. _id: ID! : indicates mandetory field
    */
}
export const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [Quote]
    user(_id: ID!): User
    iQuote(by: ID!): [Quote]
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    quotes: [Quote]
  }

  type Quote {
    name: String
    by: ID
  }

  type Token {
    token: String
  }

  type Mutation {
    signupUser(newUser: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }
`;
