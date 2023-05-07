import { quotes, users } from "./api/fakeDB.js";
import mongoose from "mongoose";
const User = mongoose.model("User");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const resolvers = {
  Query: {
    users: () => users,
    quotes: () => quotes,
    user: (_, { _id }) => {
      return users.find((user) => user._id === _id);
    },
    iQuote: (_, { by }) => {
      return quotes.filter((quote) => quote.by === by);
    },
  },
  User: {
    quotes: (user) /* (parents,{passedArguments})  */ => {
      return quotes.filter((quote) => quote.by === user._id);
    },
  },
  Mutation: {
    signupUser: async (_, { newUser }) => {
      const user = await User.findOne({ email: newUser.email });
      if (user) {
        throw new Error("User already exists with these email");
      }
      const hashedPassword = await bcrypt.hash(newUser.password, 12);

      const createdUser = new User({
        ...newUser,
        password: hashedPassword,
      });

      return await createdUser.save();
    },
    signinUser: async (_, { userSignin }) => {
      // TODO
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User dosen't exist with these email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("email or password invalid!");
      }

      const token = jwt.sign(
        {
          userID: user._id,
        },
        JWT_SECRET
      );

      return { token };
    },
  },
};
