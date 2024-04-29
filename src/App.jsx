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
// root Admin Dashboard
import RootAdminDashboard from "./Root/AdminDashboard/RootAdminDashboard";
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
import { loader as hampersDetailLoader } from "./Page/AdminPage/HampersPage/EditHampers/EditHampers";
import EditHampers from "./Page/AdminPage/HampersPage/EditHampers/EditHampers";

import IngredientPage from "./Page/AdminPage/IngredientPage/IngredientPage";
import { Suspense } from "react";

// Root MO
import RootMoDashboard from "./Root/MoDashboard/RootMoDashboard";
// Root Ingredient Procurement
import RootIngredientProcurement from "./Root/MoDashboard/IngredientProcurement/RootIngredientProcurement";
import IngredientProcurement from "./Page/MOPage/IngredientProcurement/IngredientProcurement";

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
        path: "AdminDashboard",
        element: (
          <ProtectedRoot role_id={2}>
            <Suspense fallback={<LoadingPage />}>
              <RootAdminDashboard />
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
              {
                path: ":hampersId",
                id: "hampers-detail",
                loader: hampersDetailLoader,
                children: [
                  {
                    index: true,
                    element: <EditHampers />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "MoDashboard",
        element: (
          <ProtectedRoot role_id={3}>
            <Suspense fallback={<LoadingPage />}>
              <RootMoDashboard />
            </Suspense>
          </ProtectedRoot>
        ),
        children: [
          {
            index: true,
            element: <MainDashboard />,
          },
          {
            path: "ingredientProcurement",
            element: <RootIngredientProcurement />,
            children: [
              {
                index: true,
                element: <IngredientProcurement />,
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
