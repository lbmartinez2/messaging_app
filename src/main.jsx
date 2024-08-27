import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Messages from "./pages/Messages.jsx";
import Channels from "./pages/Channels.jsx";
import { getCurrentId } from "./helpers/functions.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import SignUp from "./pages/SignUp.jsx";


export const HeaderContext = createContext(null);

const headersInitValue = {
  uid: null,
  "access-token": null,
  expiry: null,
  client: null,
};

// const currentID = getCurrentId() || null;

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <PrivateRoute><App /></PrivateRoute> ,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `channels/:id`,
        element: <Channels />
        },
      {
      path: `messages/:id`,
      element: <Messages />
      },
    ]
  },
]);

function Main() {
  const [headers, setHeaders] = useState(headersInitValue);

  function handleHeadersChange(data) {
    setHeaders(data);
  }

  return (
    <React.StrictMode>
    <HeaderContext.Provider value={{ headers, handleHeadersChange }}>
      <RouterProvider router={router} />
    </HeaderContext.Provider>
  </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
 <Main />
);