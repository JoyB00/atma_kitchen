import { atom } from "jotai";
import { GetAllIngredients } from "../api/IngredientApi";
import { FetchAllCategories } from "../api/CategoryApi";
import { FetchAllProducts } from "../api/ProductApi";
import { GetHampersById } from "../api/HampersApi";
import { FetchAllConsignors } from "../api/ConsignorApi";
import { FetchAllEmployees } from "../api/EmployeeApi";
import { FetchAllRoles } from "../api/RoleApi";
import { FetchAllCustomers, GetLoggedInCustomer } from "../api/CustomerApi";
import {
  GetCustomerTransactions,
  GetDetailTransaction,
} from "../api/TransactionApi";

const fetchCategories = async () => {
  try {
    const response = await FetchAllCategories();
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};
const allCategories = atom(fetchCategories);

const fetchAllIngredients = async () => {
  try {
    const response = await GetAllIngredients();
    return response;
  } catch (error) {
    return error.message;
  }
};
const allIngredients = atom(fetchAllIngredients);

const fetchAllProduct = async () => {
  try {
    const response = await FetchAllProducts();
    return response;
  } catch (error) {
    return error.message;
  }
};
const allProducts = atom(fetchAllProduct);

const fetchAllConsignors = async () => {
  try {
    const response = await FetchAllConsignors();
    // console.log("penitip di lib", response);
    return response;
  } catch (error) {
    return error.message;
  }
};
const allConsignors = atom(fetchAllConsignors);

const fetchAllRole = async () => {
  try {
    const response = await FetchAllRoles();
    return response;
  } catch (error) {
    return error.message;
  }
};
const allRoles = atom(fetchAllRole);

const fetchAllEmployee = async () => {
  try {
    const response = await FetchAllEmployees();
    return response;
  } catch (error) {
    return error.message;
  }
};
const allEmployee = atom(fetchAllEmployee);

const fetchAllCustomers = async () => {
  try {
    const response = await FetchAllCustomers();
    // console.log("customer", response);
    return response;
  } catch (error) {
    return error.message;
  }
};
const allCustomers = atom(fetchAllCustomers);

const fetchLoggedInCustomers = async () => {
  try {
    const response = await GetLoggedInCustomer();
    return response;
  } catch (error) {
    return error.message;
  }
};
const loggedInCustomer = atom(fetchLoggedInCustomers);

const fetchCustomerOrderHistory = async () => {
  try {
    const allCustomerTransaction = await GetCustomerTransactions(
      JSON.parse(sessionStorage.getItem("user")).id,
    );
    const allTransactionDetails = await Promise.all(
      allCustomerTransaction.map((transaction) =>
        GetDetailTransaction(transaction.id),
      ),
    );
    console.log(allTransactionDetails); // return detail (cart->produk/hampers), dan transaksi
    return allTransactionDetails;
  } catch (error) {
    return error.message;
  }
};
const customerOrderHistory = atom(fetchCustomerOrderHistory);

export {
  allIngredients,
  allCategories,
  allProducts,
  allConsignors,
  allEmployee,
  allRoles,
  allCustomers,
  loggedInCustomer,
  customerOrderHistory,
};
