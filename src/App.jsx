
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Page/Login";
import "./App.css";
import Register from "./Page/Register";
import RootLayout from "./Root/Main/Root";
import Home from "./Page/Home";
import Menu from "./Page/Menu";
// root Dashboard
import RootDashboard from "./Root/AdminDashboard/RootDashboard";
import MainDashboard from "./AdminPage/MainDashboard/MainDashboard";
import ProductPage from "./AdminPage/ProductPage/ProductPage";
import AddProduct from "./AdminPage/ProductPage/AddProduct/AddProduct";
import RootProduct from "./Root/AdminDashboard/Product/RootProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
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
      {
        path: "dashboard",
        element: <RootDashboard />,
        children: [
          {
            index: true,
            element: <MainDashboard />,
          },
          {
            path: "product",
            element: <RootProduct />,
            children: [
              {
                index: true,
                element: <ProductPage />,
              },
              {
                path: "addProduct",
                element: <AddProduct />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
