import { gql } from "apollo-server";
{
  /* 
    1. id: ID! : indicates mandetory field
    */
}
export const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [Quote]
    user(id: ID!): User
    iQuote(by: ID!): [Quote]
  }

  type User {
    id: ID!
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

  type Mutation {
    signupUserDummy(newUser: UserInput!): User
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`;
