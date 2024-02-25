import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./(Home)/Home";
import Application from "./(Application)/Application";
import { ClerkProvider } from "@clerk/clerk-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/application",
    element: <Application />,
  },
]);

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </ClerkProvider>,
);
