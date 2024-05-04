import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-lazy-load-image-component/src/effects/blur.css";
import Login from "./Page/Login";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

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

//Root Ingredient
import RootIngredient from "./Root/AdminDashboard/Ingredient/RootIngredient";
import IngredientPage from "./Page/AdminPage/IngredientPage/IngredientPage";
import AddIngredient from "./Page/AdminPage/IngredientPage/AddIngredient/AddIngredient";
import EditIngredient, {
  loader as ingredientDetailLoader,
} from "./Page/AdminPage/IngredientPage/EditIngredient/EditIngredient";

// Root Hampers
import RootHampers from "./Root/AdminDashboard/Hampers/RootHampers";
import HampersPage from "./Page/AdminPage/HampersPage/HampersPage";
import AddHampers from "./Page/AdminPage/HampersPage/AddHampers/AddHampers";
import { loader as hampersDetailLoader } from "./Page/AdminPage/HampersPage/EditHampers/EditHampers";
import EditHampers from "./Page/AdminPage/HampersPage/EditHampers/EditHampers";

// Customer Admin
import RootAdminCustomer from "./Root/AdminDashboard/Customer/RootAdminCustomer";
import CustomerPage from "./Page/AdminPage/CustomerPage/CustomerPage";

// Customer Order History
import RootCustomerOrderHistory from "./Root/AdminDashboard/CustomerOrderHistory/RootCustomerOrderHistory";
import CustomerOrderHistoryPage from "./Page/AdminPage/CustomerOrderHistory/CustomerOrderHistory";

// Root MO
import RootMoDashboard from "./Root/MoDashboard/RootMoDashboard";
// Root Ingredient Procurement
import RootIngredientProcurement from "./Root/MoDashboard/IngredientProcurement/RootIngredientProcurement";
import IngredientProcurement from "./Page/MOPage/IngredientProcurement/IngredientProcurement";
import AddIngredientProcurement from "./Page/MOPage/IngredientProcurement/AddIngredientProcurement/AddIngredientProcurement";
import EditIngredientProcurement from "./Page/MOPage/IngredientProcurement/EditIngredientProcurement/EditIngredientProcurement";
import { loader as ingredientProcurementLoader } from "./Page/MOPage/IngredientProcurement/EditIngredientProcurement/EditIngredientProcurement";
// Root Employee
import RootEmployee from "./Root/MoDashboard/Employee/RootEmployee";
import EmployeePage from "./Page/MOPage/Employee/EmployeePage";

// Root Customer
import RootCustomer from "./Root/Customer/RootCustomer";
import CustomerProfile from "./Page/CustomerPage/CustomerProfile";
import EditCustomerProfile from "./Page/CustomerPage/DashboardPages/EditCustomerProfile";
import ChangePasswordLoggedIn from "./Page/CustomerPage/DashboardPages/ChangePasswordLoggedIn";

// Root Consignor

import RootConsignor from "./Root/MoDashboard/Consignor/RootConsignor";
import ConsignorPage from "./Page/MOPage/Consignor/ConsignorPage";
import AddConsignor from "./Page/MOPage/Consignor/AddConsignor/AddConsignor";
import EditConsignor from "./Page/MOPage/Consignor/EditConsignor/EditConsignor";
import { loader as loaderConsignor } from "./Page/MOPage/Consignor/EditConsignor/EditConsignor";

// Root Other Procurement
import RootOtherProcurement from "./Root/MoDashboard/OtherProcurement/RootOtherProcurement";
import OtherProcurementPage from "./Page/MOPage/OtherProcurement/OtherProcurementPage";
import AddOtherProcurement from "./Page/MOPage/OtherProcurement/AddOtherProcurement/AddOtherProcurement";
import EditOtherProcurement from "./Page/MOPage/OtherProcurement/EditOtherProcurement/EditOtherProcurement";
import { loader as loaderOtherProcurement } from "./Page/MOPage/OtherProcurement/EditOtherProcurement/EditOtherProcurement";
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
            element: <RootIngredient />,
            children: [
              {
                index: true,
                element: <IngredientPage />,
              },
              {
                path: "addIngredient",
                element: <AddIngredient />,
              },
              {
                path: ":ingredientId",
                id: "ingredient-detail",
                loader: ingredientDetailLoader,
                children: [
                  {
                    index: true,
                    element: <EditIngredient />,
                  },
                ],
              },
            ],
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
          {
            path: "customer",
            element: <RootAdminCustomer />,
            children: [
              {
                index: true,
                element: <CustomerPage />,
              },
            ],
          },
          {
            path: "orderHistory",
            element: <RootCustomerOrderHistory />,
            children: [
              {
                index: true,
                element: <CustomerOrderHistoryPage />,
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
            path: "consignor",
            element: <RootConsignor />,
            children: [
              {
                index: true,
                element: <ConsignorPage />,
              },
              {
                path: "addConsignor",
                element: <AddConsignor />,
              },
              {
                path: ":consignorId",
                id: "consignor-detail",
                loader: loaderConsignor,
                children: [
                  {
                    index: true,
                    element: <EditConsignor />,
                  },
                ],
              },
            ],
          },
          {
            path: "ingredientProcurement",
            element: <RootIngredientProcurement />,
            children: [
              {
                index: true,
                element: <IngredientProcurement />,
              },
              {
                path: "addIngredientProcurement",
                element: <AddIngredientProcurement />,
              },
              {
                path: ":ingredientProcurementId",
                id: "ingredientProcurement-detail",
                loader: ingredientProcurementLoader,
                children: [
                  {
                    index: true,
                    element: <EditIngredientProcurement />,
                  },
                ],
              },
            ],
          },
          {
            path: "otherProcurements",
            element: <RootOtherProcurement />,
            children: [
              {
                index: true,
                element: <OtherProcurementPage />,
              },
              {
                path: "addOtherProcurement",
                element: <AddOtherProcurement />,
              },
              {
                path: ":otherProcurementId",
                id: "otherProcurement-detail",
                loader: loaderOtherProcurement,
                children: [
                  {
                    index: true,
                    element: <EditOtherProcurement />,
                  },
                ],
              },
            ],
          },
          {
            path: "employeeManagement",
            element: <RootEmployee />,
            children: [
              {
                index: true,
                element: <EmployeePage />,
              },
            ],
          },
        ],
      },
      {
        path: "CustomerDashboard",
        element: (
          <ProtectedRoot role_id={4}>
            <Suspense fallback={<LoadingPage />}>
              <RootCustomer />
            </Suspense>
          </ProtectedRoot>
        ),
        children: [
          {
            index: true,
            element: <CustomerProfile />,
          },
          {
            path: "EditProfile",
            element: <EditCustomerProfile />,
          },
          {
            path: "ChangePassword",
            element: <ChangePasswordLoggedIn />,
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
