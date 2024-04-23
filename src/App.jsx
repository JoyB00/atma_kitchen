import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-lazy-load-image-component/src/effects/blur.css";
import Login from "./Page/Login";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Protected Root
import ProtectedRoot from "./Root/ProtectedRoot/ProtectedRoot";
import LoadingPage from "./Component/LoadingPage";
//
import Register from "./Page/Register";
import RootLayout from "./Root/Main/Root";
import Home from "./Page/Home";
import Menu from "./Page/Menu";
// root Dashboard
import RootDashboard from "./Root/AdminDashboard/RootDashboard";
import MainDashboard from "./Page/AdminPage/MainDashboard/MainDashboard";
// Root Product
import RootProduct from "./Root/AdminDashboard/Product/RootProduct";
import ProductPage from "./Page/AdminPage/ProductPage/ProductPage";
import AddProduct from "./Page/AdminPage/ProductPage/AddProduct/AddProduct";
import EditProduct, {
  loader as productDetailLoader,
} from "./Page/AdminPage/ProductPage/EditProduct/EditProduct";

// Root Hampers
import RootHampers from "./Root/AdminDashboard/Hampers/RootHampers";
import HampersPage from "./Page/AdminPage/HampersPage/HampersPage";
import AddHampers from "./Page/AdminPage/HampersPage/AddHampers/AddHampers";

import IngredientPage from "./Page/AdminPage/IngredientPage/IngredientPage";
import { Suspense } from "react";

// const RootAdmin = lazy(() =>
//   import("./Root/AdminDashboard/Product/RootProduct")
// );
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <RootLayout />
      </Suspense>
    ),
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
        element: (
          <ProtectedRoot role_id={4}>
            <Menu />,
          </ProtectedRoot>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoot role_id={2}>
            <Suspense fallback={<LoadingPage />}>
              <RootDashboard />
            </Suspense>
          </ProtectedRoot>
        ),
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
              {
                path: ":productId",
                id: "product-detail",
                loader: productDetailLoader,
                children: [
                  {
                    index: true,
                    element: <EditProduct />,
                  },
                ],
              },
            ],
          },
          {
            path: "ingredient",
            element: <IngredientPage />,
          },
          {
            path: "hampers",
            element: <RootHampers />,
            children: [
              {
                index: true,
                element: <HampersPage />,
              },
              {
                path: "addHampers",
                element: <AddHampers />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
