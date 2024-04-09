import Logo from "../../../assets/atmak-removebg.png";
import Navigation from "./component/Navigation";
import {
  faBreadSlice,
  faEgg,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
export default function Sidebar() {
  return (
    <div className="w-[20rem] h-full bg-white text-black py-12 px-6 fixed drop-shadow-lg rounded-r-3xl z-10">
      <img src={Logo} alt="" className="w-1/6 mx-auto pb-3" />
      <h1 className="text-2xl font-bold px-5">
        <span className="text-orange-500 ">ATMA</span> KITCHEN
      </h1>
      <hr className="mt-6" />
      <ul className="py-6 mx-4 text-left">
        <Navigation label="Main Dashbord" icon={faHouse} active />
        <Navigation label="Ingredient" icon={faEgg} />
        <Navigation label="Product" icon={faBreadSlice} />
        <Navigation label="Hampers" icon={faBreadSlice} />
        <Navigation label="Main Dashbord" icon={faHouse} />
      </ul>
    </div>
  );
}
