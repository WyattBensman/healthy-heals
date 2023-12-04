import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";
import { ApolloProvider } from "@apollo/client";
import { client } from "./index";
import routes from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={createBrowserRouter(routes)} />
  </ApolloProvider>
);
