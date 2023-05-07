import { quotes, users } from "./api/fakeDB.js";
import { randomBytes } from "crypto";
export const resolvers = {
  Query: {
    users: () => users,
    quotes: () => quotes,
    user: (_, { id }) => {
      return users.find((user) => user.id === id);
    },
    iQuote: (_, { by }) => {
      return quotes.filter((quote) => quote.by === by);
    },
  },
  User: {
    quotes: (user) /* (parents,{passedArguments})  */ => {
      return quotes.filter((quote) => quote.by === user.id);
    },
  },
  Mutation: {
    signupUserDummy: (_, { newUser }) => {
      const id = randomBytes(5).toString("hex");
      users.push({
        id,
        ...newUser,
      });
      return users.find((user) => user.id === id);
    },
  },
};
