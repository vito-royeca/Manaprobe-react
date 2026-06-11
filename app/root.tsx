import { ApolloHydrationHelper } from "@apollo/client-integration-react-router";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppThemeProvider } from "~/utils/ThemeContext";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/images/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/images/favicon-16x16.png",
  },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/images/apple-touch-icon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons",
  },
  {
    rel: "stylesheet",
    href: "//cdn.jsdelivr.net/npm/keyrune@latest/css/keyrune.css",
    type: "text/css"
  },
  {
    rel: "stylesheet",
    href: "/css/keyrune.css",
    type: "text/css"
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Manaprobe - Track and manage your Magic: The Gathering life totals and game state with ease." />
        <meta name="theme-color" content="#FAFAFA" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppThemeProvider>
          <ApolloHydrationHelper>
            {children}
          </ApolloHydrationHelper>
        </AppThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
