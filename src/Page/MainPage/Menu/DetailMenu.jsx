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

export function DetailMenu() {
  const menu = useRouteLoaderData("detail-menu");

  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent">
      {console.log(menu)}
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
            <Tab value={1} label="Pre-Order" />
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
  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("ID", {
      style: "currency",
      currency: "IDR",
    });

    return formatter.format(amount);
  }

  const [preOrderDate, setPreOrderDate] = useState("");
  const [currentStock, setCurrentStock] = useState(0);
  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(menu.product.product_price);

  const handleChangeDate = (event) => {
    setPreOrderDate(event.target.value);
    setAmount(1);
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
    if (type === "increment" && amount + 1 <= currentStock) {
      setAmount(amount + 1);
    } else if (type === "decrement" && amount - 1 > 0) {
      setAmount(amount - 1);
    }
    console.log(amount);
  };

  useEffect(() => {
    setTotalPrice(menu.product.product_price * amount);
  }, [amount]);
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
      {preOrderDate ? (
        <p className="ps-1 pt-2 text-gray-400">
          Current Stock : {currentStock}
        </p>
      ) : undefined}

      <div
        className={`${currentStock == 0 || !preOrderDate ? "hidden" : undefined}`}
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
            <Input id="amount" value={amount} textCenter readOnly />
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
            {formatCurrency(totalPrice)}
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
export function ReadyStock({ value, menu }) {
  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("ID", {
      style: "currency",
      currency: "IDR",
    });

    return formatter.format(amount);
  }

  const [currentStock, setCurrentStock] = useState(menu.product.ready_stock);
  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(menu.product.product_price);

  const handleChangeAmount = (type) => {
    if (type === "increment" && amount + 1 <= currentStock) {
      setAmount(amount + 1);
    } else if (type === "decrement" && amount - 1 > 0) {
      setAmount(amount - 1);
    }
    console.log(amount);
  };

  useEffect(() => {
    setTotalPrice(menu.product.product_price * amount);
  }, [amount]);
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
            <Input id="amount" value={amount} textCenter readOnly />
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
            {formatCurrency(totalPrice)}
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
