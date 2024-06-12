import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-lazy-load-image-component/src/effects/blur.css";
import Login from "./Page/Login";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

// Protected Root
import ProtectedRoot from "./Root/ProtectedRoot/ProtectedRoot";
import ProtectedRootForgotPass from "./Root/ProtectedRoot/ProtectedRootForgotPass";
import LoadingPage from "./Component/LoadingPage";
//
import Register from "./Page/Register";
import RootLayout from "./Root/Main/Root";
import Home from "./Page/Home";

// Menu
import RootMenuPage from "./Root/Main/Menu/RootMenuPage";
import About from "./Page/About";
import Menu from "./Page/Menu";
import { DetailMenu } from "./Page/MainPage/Menu/DetailMenu";
import { loader as loadDetailMenu } from "./Page/MainPage/Menu/DetailMenu";

// Hampers Menu
import RootMenuHampersPage from "./Root/Main/Hampers/RootMenuHampers";
import HampersMenu from "./Page/MainPage/HampersMenu/HampersMenu";
import { DetailHampersMenu } from "./Page/MainPage/HampersMenu/DetailHampersMenu";
import { loader as loadDetailHampers } from "./Page/MainPage/HampersMenu/DetailHampersMenu";

// Cart
import RootCart from "./Root/Main/Cart/RootCart";
import CartPage from "./Page/MainPage/Cart/CartPage";

// checkout
import RootCheckout from "./Root/Main/Checkout/RootCheckout";
import CheckoutPage from "./Page/MainPage/Checkout/CheckoutPage";
import { loader as loadOrder } from "./Page/MainPage/Checkout/CheckoutPage";
import Contact from "./Page/Contact";

// root Forgot Password
import RootForgotPassword from "./Root/Main/ForgotPassword/RootForgotPassword";
import ForgotPassword from "./Page/ChangePasswordCustomer/ForgotPassword";
import VerificationCode from "./Page/ChangePasswordCustomer/VerificationCode";
import ChangePassword from "./Page/ChangePasswordCustomer/ChangePassword";

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

// Root Transaction Admin
import RootTransaction from "./Root/AdminDashboard/Transaction/RootTransaction";
import DeliveryPage from "./Page/AdminPage/DeliveryPage/DeliveryPage";
import PaymentConfirmationPage from "./Page/AdminPage/PaymentConfirmation/PaymentConfirmationPage";
import UpdateStatusPage from "./Page/AdminPage/UpdateStatusPage/UpdateStatusPage";

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
import OrderHistory from "./Page/CustomerPage/DashboardPages/OrderHistory";
import ModifyAddressPage from "./Page/CustomerPage/DashboardPages/ModifyAddress";
import { loader as loaderCustomer } from "./Page/CustomerPage/DashboardPages/OrderHistory";

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

// Root Ingredient Use
import RootIngredientUse from "./Root/MoDashboard/IngredientUse/RootIngredientUse";
import IngredientUsePage from "./Page/MOPage/IngredientUse/IngredientUsePage";

//Root Transaction
import RootTransactionMO from "./Root/AdminDashboard/Transaction/RootTransaction";
import TransactionMO from "./Page/MOPage/Transaction/TransactionPage";
import RootShowIngredient from "./Root/MoDashboard/ShowIngredient/RootShowIngredient";
import ShowIngredientMO from "./Page/MOPage/Transaction/ShowIngredientPage";
import RootConfirmationToProccess from "./Root/MoDashboard/ConfirmationToProccess/RootConfirmationToProccess";
import ConfirmationToProccessPage from "./Page/MOPage/ConfirmationToProccess/ConfirmationToProccessPage";
import RecapOrderPage from "./Page/MOPage/ConfirmationToProccess/component/RecapOrderPage";

// Sales
// Root Product Sales Report
import RootProductSalesReport from "./Root/MoDashboard/Report/RootProductSalesReport";
import ProductSalesReportPage from "./Page/MOPage/ProductSalesReport/ProductSalesReportPage";

// Root Ingredient Stock Report
import RootIngredientStockReport from "./Root/MoDashboard/Report/RootIngredientStockReport";
import IngredientStockReportPage from "./Page/MOPage/IngredientStockReport/IngredientStockReportPage";

//Root Consignor
import RootConsignorSalesReport from "./Root/MoDashboard/Report/RootConsignorSalesReport.jsx";
import ConsignorSalesReportPage from "./Page/MOPage/ConsignorSalesReport/ConsignorSalesReportPage.jsx";

// Root Owner
import RootOwnerDashboard from "./Root/OwnerRoot/RootOwnerDashboard";
import MonthlySalesReportPage from "./Page/MOPage/MonthlySalesReport/MonthlySalesReportPage.jsx";
import IngredientUsageReportPage from "./Page/MOPage/IngredientUsageReport/IngredientUsageReportPage.jsx";

// Employee Salary
import RootEmployeeSalary from "./Root/OwnerRoot/RootEmployeeSalary/RootEmployeeSalary";
import EmployeeSalaryPage from "./Page/OwnerPage/EmployeeSalaryPage/EmployeeSalaryPage";
import AddEmployeeSalary from "./Page/OwnerPage/EmployeeSalaryPage/AddEmployeeSalary/AddEmployeeSalary";
import { loader as loadEmployee } from "./Page/OwnerPage/EmployeeSalaryPage/AddEmployeeSalary/AddEmployeeSalary";
import EditEmployeeSalary from "./Page/OwnerPage/EmployeeSalaryPage/EditEmployeeSalary/EditEmployeeSalary";
import { loader as loadSalary } from "./Page/OwnerPage/EmployeeSalaryPage/EditEmployeeSalary/EditEmployeeSalary";

//
import ForgotPasswordEmployeePage from "./Page/EmployeePage/ForgotPassword";
import { loader as loadId } from "./Page/EmployeePage/ForgotPassword";
import RootEmployeeAbsenceReport from "./Root/MoDashboard/Report/RootEmployeeAbsenceReport.jsx";
import EmployeeAbsenceReportPage from "./Page/MOPage/EmployeeAbsenceReport/EmployeeAbsenceReportPage.jsx";
import RootIncomeandExpenseReport from "./Root/MoDashboard/Report/RootIncomeExpenseReport.jsx";
import IncomeandExpenseReportPage from "./Page/MOPage/IncomeandExpenseReport/IncomeandExpenseReportPage.jsx";
import BalanceWithdrawalPage from "./Page/AdminPage/BalanceWithdrawal/BalanceWithdrawalPage.jsx";
import RootBalance from "./Root/AdminDashboard/Balance/RootBalance.jsx";
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
        path: "forgotPassword",
        element: <RootForgotPassword />,
        children: [
          {
            index: true,
            element: <ForgotPassword />,
          },
          {
            path: "verifyCode",
            element: <VerificationCode />,
          },
          {
            path: ":token",
            element: (
              <ProtectedRootForgotPass>
                <ChangePassword />
              </ProtectedRootForgotPass>
            ),
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "menu",
        element: <RootMenuPage />,
        children: [
          {
            index: true,
            element: <Menu />,
          },
          {
            path: ":id",
            id: "detail-menu",
            loader: loadDetailMenu,
            children: [
              {
                index: true,
                element: <DetailMenu />,
              },
            ],
          },
        ],
      },
      {
        path: "hampers",
        element: <RootMenuHampersPage />,
        children: [
          {
            index: true,
            element: <HampersMenu />,
          },
          {
            path: ":id",
            id: "detail-menu-hampers",
            loader: loadDetailHampers,
            children: [
              {
                index: true,
                element: <DetailHampersMenu />,
              },
            ],
          },
        ],
      },
      {
        path: "cart",
        element: (
          <ProtectedRoot role_id={4}>
            <RootCart />
          </ProtectedRoot>
        ),
        children: [
          {
            index: true,
            element: <CartPage />,
          },
        ],
      },
      {
        path: "checkout/:id",
        id: "order-detail",
        loader: loadOrder,
        element: (
          <ProtectedRoot role_id={4}>
            <RootCheckout />
          </ProtectedRoot>
        ),
        children: [
          {
            index: true,
            element: <CheckoutPage />,
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
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
          {
            path: "transaction",
            element: <RootTransaction />,
            children: [
              {
                path: "delivery",
                element: <DeliveryPage />,
              },
              {
                path: "paymentConfirmation",
                element: <PaymentConfirmationPage />,
              },
              {
                path: "updateStatus",
                element: <UpdateStatusPage />,
              },
            ],
          },
          {
            path: "withdrawal",
            element: <RootBalance />,
            children: [
              {
                index: true,
                element: <BalanceWithdrawalPage />,
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

          {
            path: "transactionManagement",
            element: <RootTransactionMO />,
            children: [
              {
                index: true,
                element: <TransactionMO />,
              },
            ],
          },

          {
            path: "showIngredient",
            element: <RootShowIngredient />,
            children: [
              {
                index: true,
                element: <ShowIngredientMO />,
              },
            ],
          },
          {
            path: "confirmationToProcess",
            element: (
              <Suspense fallback={<LoadingPage />}>
                <RootConfirmationToProccess />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: <ConfirmationToProccessPage />,
              },
              {
                path: "recapOrders",
                element: <RecapOrderPage />,
              },
            ],
          },
          // report
          {
            path: "monthlySalesReport",
            element: <RootProductSalesReport />,
            children: [
              {
                index: true,
                element: <MonthlySalesReportPage />,
              },
            ],
          },
          {
            path: "productSalesReport",
            element: <RootProductSalesReport />,
            children: [
              {
                index: true,
                element: <ProductSalesReportPage />,
              },
            ],
          },
          {
            path: "ingredientStockReport",
            element: <RootIngredientStockReport />,
            children: [
              {
                index: true,
                element: <IngredientStockReportPage />,
              },
            ],
          },
          {
            path: "ingredientUse",
            element: <RootIngredientUse />,
            children: [
              {
                index: true,
                element: <IngredientUsePage />,
              },
            ],
          },
          {
            path: "employeeAbsenceReport",
            element: <RootEmployeeAbsenceReport />,
            children: [
              {
                index: true,
                element: <EmployeeAbsenceReportPage />,
              },
            ],
          },
          {
            path: "incomeExpenseReport",
            element: <RootIncomeandExpenseReport />,
            children: [
              {
                index: true,
                element: <IncomeandExpenseReportPage />,
              },
            ],
          },
          {
            path: "consignorSalesReport",
            element: <RootConsignorSalesReport />,
            children: [
              {
                index: true,
                element: <ConsignorSalesReportPage />,
              },
            ],
          },
         
        ],
      },
      {
        path: "OwnerDashboard",
        element: (
          <ProtectedRoot role_id={1}>
            <Suspense fallback={<LoadingPage />}>
              <RootOwnerDashboard />
            </Suspense>
          </ProtectedRoot>
        ),
        children: [
          {
            index: true,
            element: <MainDashboard />,
          },
          {
            path: "employeeSalary",
            element: <RootEmployeeSalary />,
            children: [
              {
                index: true,
                element: <EmployeeSalaryPage />,
              },
              {
                path: "addEmployeeSalary/:employeeId",
                id: "employee-detail",
                loader: loadEmployee,
                children: [
                  {
                    index: true,
                    element: <AddEmployeeSalary />,
                  },
                ],
              },
              {
                path: ":salaryId",
                id: "salary-detail",
                loader: loadSalary,
                children: [
                  {
                    index: true,
                    element: <EditEmployeeSalary />,
                  },
                ],
              },
            ],
          },
          {
            path: "monthlySalesReport",
            element: <RootProductSalesReport />,
            children: [
              {
                index: true,
                element: <MonthlySalesReportPage />,
              },
            ],
          },
          {
            path: "productSalesReport",
            element: <RootProductSalesReport />,
            children: [
              {
                index: true,
                element: <ProductSalesReportPage />,
              },
            ],
          },
          {
            path: "ingredientStockReport",
            element: <RootIngredientStockReport />,
            children: [
              {
                index: true,
                element: <IngredientStockReportPage />,
              },
            ],
          },
          {
            path: "ingredientUsage",
            element: <RootIngredientUse />,
            children: [
              {
                index: true,
                element: <IngredientUsageReportPage />,
              },
            ],
          },
        ],
      },
      {
        path: "ForgotPasswordEmployee",
        element: <RootEmployee />,
        children: [
          {
            path: ":roleId",
            id: "load-id",
            loader: loadId,
            children: [
              {
                index: true,
                element: <ForgotPasswordEmployeePage />,
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
          {
            path: "OrderHistory",
            id: "customer",
            element: <OrderHistory />,
            loader: loaderCustomer,
          },
          {
            path: "Addresses",
            element: <ModifyAddressPage />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();
const App = () => {
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#f78336",
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
