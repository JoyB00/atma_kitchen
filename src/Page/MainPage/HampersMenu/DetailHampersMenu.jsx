import Navbar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import { GetHampersById } from "../../../api/HampersApi";
import { getPicture } from "../../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouteLoaderData } from "react-router-dom";
import defaultImage from "../../../assets/ProductAsset/lapis leggite.jpg";
import { NavLink } from "react-router-dom";
import Badge from "../../../Component/Badge";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import Input from "../../../Component/Input";
import InputDateTime from "../../../Component/InputDateTime";
import Button from "../../../Component/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCartItem } from "../../../api/CartApi";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatCurrency } from "../../../lib/FormatCurrency";
import { useNavigate } from "react-router-dom";
import {
  faBox,
  faCalendar,
  faCookie,
  faEgg,
} from "@fortawesome/free-solid-svg-icons";
import { StoreBuyNow } from "../../../api/TransactionApi";

export function DetailHampersMenu() {
  const hampers = useRouteLoaderData("detail-menu-hampers");

  const [value, setValue] = useState("Pre-Order");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [data, setData] = useState({
    status_item: "Pre-Order",
    limit_item: 0,
    quantity: 1,
    hampers_id: hampers.hampers.id,
    product_id: null,
    order_date: "",
    total_price: hampers.hampers.hampers_price,
  });
  const [buyNowData, setBuyNowData] = useState({
    order_date: null,
    total: hampers.hampers.hampers_price,
    data: [],
  });
  const [limit, setLimit] = useState(0);
  const handleChangeDate = (event) => {
    const selectedDate = event.target.value.slice(0, 10);
    let newLimit = hampers.details[0].product.daily_stock;
    console.log("but now", buyNowData);

    hampers.details.forEach((item, index) => {
      if (item.product) {
        const tempLimit = item.product.all_limit?.find(
          (limit) => limit.production_date === selectedDate,
        );
        if (tempLimit) {
          if (index === 0 || newLimit > tempLimit.limit_amount) {
            newLimit = tempLimit.limit_amount;
          }
          console.log("new", newLimit);
        } else {
          console.log(tempLimit);
          if (index === 0 || newLimit > item.product.daily_stock) {
            newLimit = item.product.daily_stock;
          }
        }
      }
    });
    setLimit(newLimit);
    setData({
      ...data,
      limit_item: newLimit,
      order_date: event.target.value,
      quantity: 1,
    });
    setBuyNowData({
      ...buyNowData,
      order_date: event.target.value,
      data: {
        ...data,
        limit_item: newLimit,
        order_date: event.target.value,
        quantity: 1,
      },
    });
  };
  useEffect(() => {
    if (value === "Ready") {
      setData({
        ...data,
        limit_item: hampers.ready_stock[0].ready_stock,
        status_item: value,
        quantity: 1,
      });
      setBuyNowData({
        ...buyNowData,
        data: {
          ...data,
          limit_item: hampers.ready_stock[0].ready_stock,
          status_item: value,
          quantity: 1,
        },
      });
    } else {
      setData({ ...data, status_item: value, quantity: 1 });
      setBuyNowData({
        ...buyNowData,
        data: {
          ...data,
          status_item: value,
          quantity: 1,
        },
      });
    }
  }, [value]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      {console.log(limit)}
      <Navbar />
      <div className="grid grid-cols-12 gap-x-16 px-20 pt-36 text-orange-500">
        <div className="col-span-5">
          <LazyLoadImage
            effect="blur"
            src={
              hampers.hampers.hampers_picture
                ? getPicture(hampers.hampers.hampers_picture, "hampers")
                : defaultImage
            }
            alt={hampers.hampers.hampers_name}
            className="h-[45rem] w-full rounded-xl object-cover"
          />
        </div>
        <div className="col-span-7 text-left">
          <div className="flex text-xl ">
            <NavLink to="/hampers">
              <p className="text-black hover:text-orange-500">Hampers</p>
            </NavLink>
            <p className="px-2 text-black"> {">"} </p>
            <NavLink to={`/hampers/${hampers.hampers.id}`}>
              <p className="font-semibold text-orange-500 hover:text-orange-500">
                {hampers.hampers.hampers_name}
              </p>
            </NavLink>
          </div>
          <h1 className="pt-5 text-5xl font-semibold text-black">
            {hampers.hampers.hampers_name}
          </h1>
          <p className="text-white">
            <Badge bgColor="bg-orange-500" ringColor="ring-transparent">
              Hampers
            </Badge>
          </p>
          <p className="py-4 text-black">
            Every item in our hampers is lovingly handcrafted by our skilled
            bakers. We use only the finest ingredients to ensure that each bite
            is a moment of pure indulgence. From the rich aroma of freshly baked
            bread to the delightful crunch of our signature cookies, our bakery
            treats are made with passion and precision.
          </p>
          <div className="w-1/2 rounded-2xl border-2 border-orange-200 p-3 font-semibold text-black">
            <p className="pb-1">Hampers Details :</p>
            <div>
              {hampers.details.map((detail) => {
                return (
                  <div className="font-normal" key={detail.id}>
                    {detail.product?.product_name ? (
                      <p className="pb-1">
                        <FontAwesomeIcon
                          icon={faCookie}
                          className="pe-2 text-orange-500"
                        />
                        {detail.product.product_name}
                      </p>
                    ) : (
                      <p className="pb-1">
                        <FontAwesomeIcon
                          icon={faBox}
                          className="pe-2 text-orange-500"
                        />
                        {detail.ingredients.ingredient_name}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-x-5 pt-3">
            <div className="col-span-4 mt-2">
              <div className="mb-2">
                <label htmlFor="date" className="font-normal text-black">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="px-1 text-orange-500"
                  />{" "}
                  Select Date
                </label>
              </div>
              <InputDateTime
                id="date"
                name="date"
                placeholder="Select Date"
                onChange={handleChangeDate}
              />
            </div>
          </div>
          <div className={`${!data.order_date ? "hidden" : undefined}`}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab
                value="Pre-Order"
                label="Pre-Order"
                // disabled={hampers.product.category_id === 4}
              />
              <Tab value="Ready" label="Ready" />
            </Tabs>
            <PreOrder
              value={value}
              hampers={hampers}
              data={data}
              setData={setData}
              buyNowData={buyNowData}
              setBuyNowData={setBuyNowData}
              currentStock={limit}
            />
            <ReadyStock
              value={value}
              hampers={hampers}
              data={data}
              setData={setData}
              buyNowData={buyNowData}
              setBuyNowData={setBuyNowData}
              currentStock={hampers.ready_stock[0].ready_stock}
            />
          </div>
        </div>
      </div>
      <div className="mt-auto from-cyan-100 via-transparent md:pt-12">
        <Footer />
      </div>
    </div>
  );
}

export function PreOrder({
  value,
  hampers,
  data,
  setData,
  buyNowData,
  setBuyNowData,
  currentStock,
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addToCart = useMutation({
    mutationFn: (data) => {
      return AddCartItem(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["carts"]);
    },
    onError: (error) => {
      console.log(error.message);
      throw error.message;
    },
  });

  const handleButtonAddToCart = (data) => {
    toast.promise(
      addToCart.mutateAsync(data),
      {
        loading: "Loading",
        success: "Your file has successful Added",
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
  };

  const handleChangeAmount = (type) => {
    if (type === "increment" && data.quantity + 1 <= currentStock) {
      const updateQuantity = data.quantity + 1;
      setData({ ...data, quantity: updateQuantity });
      setBuyNowData({
        ...buyNowData,
        data: { ...data, quantity: updateQuantity },
      });
    } else if (type === "decrement" && data.quantity - 1 > 0) {
      const updateQuantity = data.quantity - 1;
      setData({ ...data, quantity: updateQuantity });
      setBuyNowData({
        ...buyNowData,
        data: { ...data, quantity: updateQuantity },
      });
    }
  };

  const handleBuyNow = (data) => {
    toast.promise(
      StoreBuyNow(data)
        .then((res) => {
          queryClient.invalidateQueries(["carts"]);
          navigate(`/checkout/${res.transaction.id}`);
        })
        .catch((err) => {
          throw err.message;
        }),
      {
        loading: "Loading",
        success: "Your file has successful Added",
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
  };

  useEffect(() => {
    const newTotalPrice = parseInt(
      hampers.hampers.hampers_price * data.quantity,
    );
    setData({
      ...data,
      total_price: newTotalPrice,
    });
    setBuyNowData({
      ...buyNowData,
      data: { ...data, total_price: newTotalPrice },
      total: newTotalPrice,
    });
  }, [data.quantity]);
  return (
    <div className={`${value !== "Pre-Order" ? "hidden" : undefined}`}>
      {console.log("data", currentStock)}
      {data.order_date ? (
        <p className="ps-1 pt-2 text-gray-400">
          Current Stock : {currentStock}
        </p>
      ) : undefined}

      <div
        className={`${currentStock == 0 || !data.order_date ? "hidden" : undefined}`}
      >
        <div className="flex w-3/5 justify-between py-2">
          <div className="pt-2">
            <Button
              className="border-orange-500 bg-transparent text-orange-500 hover:text-white"
              onClick={() => handleChangeAmount("decrement")}
            >
              -
            </Button>
          </div>
          <div className="w-1/5 text-center">
            <Input id="amount" value={data.quantity} textCenter readOnly />
          </div>
          <div className="pt-2">
            <Button
              className="border-orange-500 bg-transparent text-orange-500 hover:text-white"
              onClick={() => handleChangeAmount("increment")}
            >
              +
            </Button>
          </div>
          <h1 className="py-3 text-3xl font-semibold text-orange-500">
            {formatCurrency(data.total_price)}
          </h1>
        </div>
        <div className="flex justify-start gap-x-4">
          <Button
            className="border-orange-500 bg-transparent text-orange-500 hover:text-white"
            onClick={() => handleButtonAddToCart(data)}
          >
            Add To Cart
          </Button>
          <Button
            className="bg-orange-500 text-white"
            onClick={() => handleBuyNow(buyNowData)}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
export function ReadyStock({
  value,
  hampers,
  data,
  setData,
  buyNowData,
  setBuyNowData,
  currentStock,
}) {
  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("ID", {
      style: "currency",
      currency: "IDR",
    });

    return formatter.format(amount);
  }

  const handleChangeAmount = (type) => {
    if (type === "increment" && data.quantity + 1 <= currentStock) {
      const updateQuantity = data.quantity + 1;
      setData({ ...data, quantity: updateQuantity });
      setBuyNowData({
        ...buyNowData,
        data: { ...data, quantity: updateQuantity },
      });
    } else if (type === "decrement" && data.quantity - 1 > 0) {
      setData({ ...data, quantity: updateQuantity });
      setBuyNowData({
        ...buyNowData,
        data: { ...data, quantity: updateQuantity },
      });
    }
  };
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addToCart = useMutation({
    mutationFn: (data) => {
      return AddCartItem(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["carts"]);
    },
    onError: (error) => {
      console.log(error.message);
      throw error.message;
    },
  });

  const handleButtonAddToCart = (data) => {
    toast.promise(
      addToCart.mutateAsync(data),
      {
        loading: "Loading",
        success: "Your file has successful Added",
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
  };

  const handleBuyNow = (data) => {
    toast.promise(
      StoreBuyNow(data)
        .then((res) => {
          queryClient.invalidateQueries(["carts"]);
          navigate(`/checkout/${res.transaction.id}`);
        })
        .catch((err) => {
          throw err.message;
        }),
      {
        loading: "Loading",
        success: "Your file has successful Added",
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
  };

  useEffect(() => {
    const newTotalPrice = parseInt(
      hampers.hampers.hampers_price * data.quantity,
    );
    setData({
      ...data,
      total_price: newTotalPrice,
    });
    setBuyNowData({
      ...buyNowData,
      data: { ...data, total_price: newTotalPrice },
      total: newTotalPrice,
    });
  }, [data.quantity]);
  return (
    <div className={`${value !== "Ready" ? "hidden" : undefined}`}>
      <p className="ps-1 pt-2 text-gray-400">Ready Stock : {currentStock}</p>
      <div className={`${currentStock == 0 ? "hidden" : undefined}`}>
        <div className="flex w-3/5 justify-between py-2">
          <div className="pt-2">
            <Button
              className="border-orange-500 bg-transparent text-orange-500 hover:text-white"
              onClick={() => handleChangeAmount("decrement")}
            >
              -
            </Button>
          </div>
          <div className="w-1/5 text-center">
            <Input id="amount" value={data.quantity} textCenter readOnly />
          </div>
          <div className="pt-2">
            <Button
              className="border-orange-500 bg-transparent text-orange-500 hover:text-white"
              onClick={() => handleChangeAmount("increment")}
            >
              +
            </Button>
          </div>
          <h1 className="py-3 text-3xl font-semibold text-orange-500">
            {formatCurrency(data.total_price)}
          </h1>
        </div>
        <div className="flex justify-start gap-x-4">
          <Button
            className="border-orange-500 bg-transparent text-orange-500 hover:text-white"
            onClick={() => handleButtonAddToCart(data)}
          >
            Add To Cart
          </Button>
          <Button
            className="bg-orange-500 text-white"
            onClick={() => handleBuyNow(buyNowData)}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.id;
  const hampers = await GetHampersById(id);
  console.log(hampers);
  return hampers;
}
