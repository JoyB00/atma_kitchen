import Navbar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import { GetProductById } from "../../../api/ProductApi";
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
import InputDate from "../../../Component/InputDate";
import Button from "../../../Component/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCartItem } from "../../../api/CartApi";
import toast from "react-hot-toast";

export function DetailMenu() {
  const menu = useRouteLoaderData("detail-menu");

  const [value, setValue] = useState(menu.product.category_id === 4 ? 2 : 1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      <Navbar />
      <div className="grid grid-cols-12 gap-x-16 px-24 pt-36 text-orange-500">
        <div className="col-span-5">
          <LazyLoadImage
            effect="blur"
            src={
              menu.product.product_picture
                ? getPicture(menu.product.product_picture, "product")
                : defaultImage
            }
            alt={menu.product.product_name}
            className="h-[35rem] w-full rounded-xl object-cover"
          />
        </div>
        <div className="col-span-7 text-left">
          <div className="flex text-xl ">
            <NavLink to="/menu">
              <p className="text-black hover:text-orange-500">Menu</p>
            </NavLink>
            <p className="px-2 text-black"> {">"} </p>
            <NavLink to={`/menu/${menu.product.id}`}>
              <p className="font-semibold text-orange-500 hover:text-orange-500">
                {menu.product.product_name}
              </p>
            </NavLink>
          </div>
          <h1 className="pt-5 text-5xl font-semibold text-black">
            {menu.product.product_name}
          </h1>
          <p className="text-white">
            <Badge bgColor="bg-orange-500" ringColor="ring-transparent">
              {menu.product.categories.category_name}
            </Badge>
          </p>
          <p className="pt-5 text-black">{menu.product.description}</p>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab
              value={1}
              label="Pre-Order"
              disabled={menu.product.category_id === 4}
            />
            <Tab value={2} label="Ready" />
          </Tabs>
          <PreOrder value={value} menu={menu} />
          <ReadyStock value={value} menu={menu} />
        </div>
      </div>
      <div className="mt-auto from-cyan-100 via-transparent md:pt-12">
        <Footer />
      </div>
    </div>
  );
}

export function PreOrder({ value, menu }) {
  const [data, setData] = useState({
    quantity: 1,
    product_id: menu.product.id,
    order_date: "",
    total_price: menu.product.product_price,
  });
  const [currentStock, setCurrentStock] = useState(0);
  const queryClient = useQueryClient();

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
        position: "top-center",
      },
    );
  };

  const handleChangeDate = (event) => {
    setData({ ...data, order_date: event.target.value, quantity: 1 });
    const temp = menu.allLimit.find(
      (limit) => limit.production_date === event.target.value,
    );
    if (temp) {
      setCurrentStock(temp.limit_amount);
    } else {
      setCurrentStock(menu.product.daily_stock);
    }
  };

  const handleChangeAmount = (type) => {
    if (type === "increment" && data.quantity + 1 <= currentStock) {
      setData({ ...data, quantity: data.quantity + 1 });
    } else if (type === "decrement" && data.quantity - 1 > 0) {
      setData({ ...data, quantity: data.quantity - 1 });
    }
  };

  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("ID", {
      style: "currency",
      currency: "IDR",
    });

    return formatter.format(amount);
  }

  useEffect(() => {
    setData({
      ...data,
      total_price: parseInt(menu.product.product_price * data.quantity),
    });
  }, [data.quantity]);
  return (
    <div className={`${value !== 1 ? "hidden" : undefined}`}>
      <div className="grid grid-cols-6 gap-x-5 pt-3">
        <div className="col-span-4">
          <InputDate
            id="order-date"
            name="order-date"
            placeholder="Pre-Order Date"
            onChange={handleChangeDate}
          />
        </div>
      </div>
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
          <Button className="bg-orange-500 text-white">Buy Now</Button>
        </div>
      </div>
    </div>
  );
}
export function ReadyStock({ value, menu }) {
  var currentDate = new Date().toJSON().slice(0, 10);
  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("ID", {
      style: "currency",
      currency: "IDR",
    });

    return formatter.format(amount);
  }

  const [data, setData] = useState({
    quantity: 1,
    product_id: menu.product.id,
    order_date: currentDate,
    total_price: menu.product.product_price,
  });

  const [currentStock, setCurrentStock] = useState(menu.product.ready_stock);

  const handleChangeAmount = (type) => {
    if (type === "increment" && data.quantity + 1 <= currentStock) {
      setData({ ...data, quantity: data.quantity + 1 });
    } else if (type === "decrement" && data.quantity - 1 > 0) {
      setData({ ...data, quantity: data.quantity - 1 });
    }
  };

  useEffect(() => {
    setData({
      ...data,
      total_price: parseInt(menu.product.product_price * data.quantity),
    });
  }, [data.quantity]);
  return (
    <div className={`${value !== 2 ? "hidden" : undefined}`}>
      <p className="ps-1 pt-4 text-gray-400">Ready Stock : {currentStock}</p>
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
          <Button className="border-orange-500 bg-transparent text-orange-500 hover:text-white">
            Add To Cart
          </Button>
          <Button className="bg-orange-500 text-white">Buy Now</Button>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.id;
  const product = await GetProductById(id);
  return product;
}
