import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error/Error";
import Dashborad from "../pages/Dashboard/Dashborad";
import Login from "../pages/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashborad />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
