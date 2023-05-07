import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { typeDefs } from "./shemaGql.js";
import mongoose from "mongoose";
import { MongoURL } from "./config.js";

mongoose.connect(MongoURL, {
  useNewUrlParser: true,
  // userUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

// import models
import "./models/User.js";
import "./models/Quotes.js";

import { resolvers } from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
