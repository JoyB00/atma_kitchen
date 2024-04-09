import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Page/Login";
import "./App.css";
import Register from "./Page/Register";
import RootLayout from "./Page/Root";
import Home from "./Page/Home";
import Menu from "./Page/Menu";
import MainDashboard from "./AdminPage/MainDashboard/MainDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainDashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
