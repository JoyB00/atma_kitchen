import Sidebar from "../../../AdminPage/AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import FooterDashboard from "../../../../Component/FooterDashboard";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../../Component/Button";
import { NavLink } from "react-router-dom";
import RecapDataPage from "./RecapDataPage";
import { list } from "postcss";
import { useAtom } from "jotai";
import { allIngredients } from "../../../../lib/FetchFunctions";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import withReactContent from "sweetalert2-react-content";
import { StoreIngredientUse } from "../../../../api/IngredientUseHistory";
import { useQueryClient } from "@tanstack/react-query";

export default function RecapOrderPage() {
  const [search, setSearch] = useState("");
  const ingredients = useAtom(allIngredients);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const location = useLocation();
  const dataRes = location.state;
  const [data, setData] = useState(dataRes);
  const [warning, setWarning] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkIngredient = (ingredients_name, quantity, unit) => {
    const temp = ingredients[0].filter(
      (item) => item.ingredient_name === ingredients_name,
    );
    // console.log(temp[0]);
    if (temp[0].quantity < quantity) {
      if (warning === false) {
        setWarning(true);
      }
      return (
        <p>
          {ingredients_name} {quantity} {unit}{" "}
          <span className="text-red-500">
            {" "}
            (Warning Available Stock {temp[0].quantity} {temp[0].unit})
          </span>
        </p>
      );
    } else {
      return (
        <p>
          {ingredients_name} {quantity} {unit}
        </p>
      );
    }
  };

  const setList = async () => {
    const tempProductList = {};
    data.transaction.forEach((transaction) => {
      transaction.transaction_details.forEach((detail) => {
        if (detail.hampers) {
          detail.hampers.hampers_detail.forEach((hampersDetail) => {
            const productId = hampersDetail.product
              ? hampersDetail.product.product_name
              : null;

            const quantity = detail.quantity;

            if (productId) {
              if (tempProductList[productId]) {
                tempProductList[productId].quantity += quantity;
              } else {
                tempProductList[productId] = {
                  quantity: quantity,
                  product: hampersDetail.product,
                  all_recipes: hampersDetail.product.all_recipes,
                };
              }
            }
          });
        } else {
          const productId = detail.product.product_name;

          const quantity = detail.quantity;
          if (tempProductList[productId]) {
            tempProductList[productId].quantity += quantity;
          } else {
            tempProductList[productId] = {
              quantity: quantity,
              product: detail.product,
              all_recipes: detail.product.all_recipes,
            };
          }
        }
      });
    });

    // Mengubah objek produk menjadi array dengan menambahkan key product
    const productListArray = Object.keys(tempProductList).map((productId) => ({
      id: productId,
      quantity: tempProductList[productId].quantity,
      product: {
        product_data: tempProductList[productId].product,
        allRecipe: tempProductList[productId].all_recipes,
      },
    }));

    return productListArray;
  };

  function extractLoyangQuantity(str) {
    str = str.trim();
    const words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i].toLowerCase().includes("loyang")) {
        return words[i - 1] + " " + words[i];
      }
    }
    return "";
  }

  const consolidateQuantities = (quantity, productString) => {
    const fullUnits = Math.floor(quantity);
    const fractionalUnits = quantity % 2;

    if (extractLoyangQuantity(productString) === "1/2 Loyang") {
      if (fractionalUnits === 1) {
        return `${fractionalUnits > 0 ? fractionalUnits + " " : ""}1/2 Loyang`;
      } else {
        return `${fullUnits / 2} Loyang`;
      }
    }

    return `${quantity} Loyang`;
  };

  const swallStore = (data) => {
    if (warning) {
      toast.error("The ingredients you have are not enough.", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      withReactContent(Swal)
        .fire({
          title: `Are you sure to Process it ?  `,
          text: `You won't be able to revert this!`,
          icon: `warning`,
          showCancelButton: true,
          confirmButtonColor: `#3085d6`,
          cancelButtonColor: `#d33`,
          confirmButtonText: `Yes, update it!`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            toast.promise(
              StoreIngredientUse(data)
                .then(() => {
                  queryClient.invalidateQueries(["ordersToProcess"]);
                  navigate("/MoDashboard/confirmationToProcess");
                })
                .catch((err) => {
                  throw err.message;
                }),
              {
                loading: "Loading",
                success: "Your file has been Deleted",
                error: (err) => err,
              },
              {
                style: {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
                position: "bottom-right",
              },
            );
          }
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const productListArray = await setList();
      setProductList(productListArray);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex size-full min-h-screen min-w-full items-start bg-orange-100/50">
      <Sidebar role={user.role_id} />
      {console.log("data", data)}
      {console.log("list", productList)}
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url={
            user.role_id == 2
              ? "/AdminDashboard"
              : user.role_id == 3
                ? "/MoDashboard/confirmationToProcess"
                : ""
          }
          page="Confirmation To Process"
          setSearch={setSearch}
        />
        <div className="mt-36 px-4 ">
          <div className="h-full w-full rounded-3xl bg-white">
            <div className="rounded-t-3xl bg-orange-500 p-5 text-center text-white">
              <h1 className="font-semibold">DAILY ORDER LIST</h1>
              <p>{data.transaction[0].pickup_date.slice(0, 16)}</p>
            </div>
            <div className="grid grid-cols-2 p-5">
              <div className="col-span-1 p-3">
                <p className="text-xl font-semibold">Order List</p>
                {data.transaction.map((item) => {
                  return (
                    <div className="mb-6">
                      <p>Nota Number : {item.transaction_number}</p>
                      <p>Name : {item.customer.users.fullName}</p>
                      <p>Time : {item.pickup_date.slice(11, 16)}</p>

                      {item.transaction_details.map((detail) => {
                        return (
                          <p>
                            {detail.quantity} {"   "}
                            {detail.product_id
                              ? detail.product.product_name
                              : detail.hampers.hampers_name}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div className="col-span-1 p-3">
                <div>
                  <p className="text-xl font-semibold">Recap </p>
                  {loading ? (
                    <p>loading</p>
                  ) : (
                    <>
                      {productList.map((item) => {
                        return (
                          <>
                            <p>
                              {item.quantity} {"  "}
                              {item.id}
                            </p>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
                <div className="mt-6">
                  <p className="text-xl font-semibold">
                    That Needs to be made{" "}
                  </p>
                  {loading ? (
                    <p>loading</p>
                  ) : (
                    <>
                      {productList.map((item) => {
                        return (
                          <>
                            <p>
                              {item.id.match(/^[^\d]+/)[0].trim()}{" "}
                              {consolidateQuantities(item.quantity, item.id)}{" "}
                              {"  "}
                            </p>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              <div className="col-span-1 p-3">
                <div>
                  <p className="text-xl font-semibold">Ingredients</p>
                  {productList.map((item) => {
                    return (
                      <>
                        <p className="text-lg font-semibold">
                          {item.id.match(/^[^\d]+/)[0].trim()}
                        </p>
                        <div className="pb-5">
                          {item.product.allRecipe.map((recipe) => {
                            return (
                              <>
                                <p>
                                  {recipe.quantity * item.quantity}{" "}
                                  {recipe.ingredients.unit}{" "}
                                  {recipe.ingredients.ingredient_name}
                                </p>
                              </>
                            );
                          })}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-1 p-3">
                <p className="text-xl font-semibold">Ingredient Recap</p>
                {data.recapIngredient.map((recap) => {
                  return checkIngredient(
                    recap.ingredient_name,
                    recap.quantity,
                    recap.unit,
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end gap-x-2 rounded-b-2xl bg-gray-100 p-5">
              <NavLink to="/MoDashboard/confirmationToProcess">
                <Button className="border-orange-500 text-orange-500 hover:text-white">
                  Cancel
                </Button>
              </NavLink>
              <Button
                className="bg-orange-500 text-white"
                onClick={() => swallStore(data)}
              >
                Procees Now
              </Button>
            </div>
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
