import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

// Custom error for authentication failures
const AuthenticationError = new GraphQLError("Could not authenticate user.", {
  extensions: {
    code: "UNAUTHENTICATED",
  },
});

// Middleware for handling authentication
const authMiddleware = function ({ req }) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
  }

  return req;
};

// Function for creating and signing a token
const signToken = function ({ email, username, _id }) {
  const payload = { email, username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export { AuthenticationError, authMiddleware, signToken };
