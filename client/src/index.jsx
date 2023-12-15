import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import formDataAppendFile from "apollo-upload-client/formDataAppendFile.mjs";
import isExtractableFile from "apollo-upload-client/isExtractableFile.mjs";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

// Check if in a development environment and load error messages
if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

const uploadLink = createUploadLink({
  uri: "/graphql",
  formDataAppendFile,
  isExtractableFile,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});
