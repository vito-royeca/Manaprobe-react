import { HttpLink, InMemoryCache } from "@apollo/client";
import {
  createApolloLoaderHandler,
  ApolloClient,
} from "@apollo/client-integration-react-router";

const VITE_GRAPHQL_SERVER_URL = import.meta.env.VITE_GRAPHQL_SERVER_URL;

// `request` will be available on the server during SSR or in loaders, but not in the browser
export const makeClient = (request?: Request) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: VITE_GRAPHQL_SERVER_URL }),
  });
};

export const apolloLoader = createApolloLoaderHandler(makeClient);