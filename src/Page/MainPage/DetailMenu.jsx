import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import { GetProductById } from "../../api/ProductApi";
import { getPicture } from "../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouteLoaderData } from "react-router-dom";
import defaultImage from "../../assets/ProductAsset/lapis leggite.jpg";
import { NavLink } from "react-router-dom";
import Badge from "../../Component/Badge";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import InputDate from "../../Component/InputDate";
export  function DetailMenu() {
  const menu = useRouteLoaderData("detail-menu");

  const [value, setValue]= useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col">
      <Navbar />
      <div className="text-orange-500 pt-36 px-20 grid grid-cols-12 gap-x-16">
        <div className="col-span-4 ">
          <LazyLoadImage
            effect="blur"
            src={
              menu.product.product_picture
                ? getPicture(menu.product.product_picture, "product")
                : defaultImage
            }
            alt={menu.product.product_name}
            className="h-[30rem] w-full object-contain rounded-xl"
          />
        </div>
        <div className="col-span-7 text-left">
          <div className="flex text-xl ">
            <NavLink to="/menu">
              <p className="text-black hover:text-orange-500">Menu</p>
            </NavLink>
            <p className="text-black px-2"> {">"} </p>
            <NavLink to={`/menu/${menu.product.id}`}>
              <p className="text-orange-500 font-semibold hover:text-orange-500">{menu.product.product_name}</p>
            </NavLink>
          </div>
          <h1 className="text-5xl font-semibold pt-5 text-black">{menu.product.product_name}</h1>
          <p className="text-white"><Badge bgColor="bg-orange-500" ringColor="ring-transparent">{menu.product.categories.category_name}</Badge></p>
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
          <PreOrder value={value} price={menu.product.product_price}/>
          <p className="pt-5 text-black">{menu.product.description}</p>
        
         
        </div>
        
      </div>
      <div className="from-cyan-100 via-transparent md:pt-12 mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export function PreOrder ({price, value}){
  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat('ID', {
      style: 'currency',
      currency: 'IDR'
    });
  
    return formatter.format(amount);
  }
  return (
    <div className={`${value!==1?"hidden":undefined}`}>
      <div className="pt-3">
        <InputDate name="order-date" placeholder="Order Date"/>
        <h1 className="text-3xl font-semibold pt-5 text-orange-500">{formatCurrency(price)}</h1>
      </div>
    </div>
  );
}
 

export async function loader({ params }) {
  const id = params.id;
  const product = await GetProductById(id);
  return product;
}
