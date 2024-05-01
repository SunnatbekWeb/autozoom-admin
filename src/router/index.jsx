import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error/Error";
import Dashborad from "../pages/Dashboard/Dashborad";
import Login from "../pages/Auth/Login";
import Brand from "../pages/Brand/Brand";
import Cities from "../pages/Cities/Cities";

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
      {
        path: "/brands",
        element: <Brand />,
      },
      {
        path: "/cities",
        element: <Cities />,
      },
      {
        path: "/location",
        element: <Location />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
