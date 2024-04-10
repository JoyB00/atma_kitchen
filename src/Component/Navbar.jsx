import { NavLink } from "react-router-dom";
import Button from "./Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 40) {
      // console.log(window.scrollY);
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <motion.div
      className={`w-[95%] fixed py-4 z-10 ms-12 my-4 rounded-3xl ${
        navbar
          ? "bg-white/50 text-white backdrop-blur-xl"
          : "bg-transparent drop-shadow-sm"
      }`}
      style={{
        transitionProperty: "background-color, color",
        transitionDuration: "200ms, 200ms",
        transitionTimingFunction: "linear, linear",
      }}
    >
      <div className="flex justify-between px-8 ">
        <div className="flex">
          <NavLink
            to="/dashboard"
            className="text-black font-extrabold text-xl my-auto hover:text-black"
          >
            <span className="text-orange-500">ATMA </span>
            KITCHEN
          </NavLink>
        </div>
        <div className="my-auto text-left">
          <ul className="grid grid-cols-5 gap-3 ">
            <li className="col-span-1">
              <NavLink to="/" className="text-black  font-normal">
                Home
              </NavLink>
            </li>
            <li className="col-span-1">
              <NavLink to="" className="text-black font-normal">
                About
              </NavLink>
            </li>
            <li className="col-span-1">
              <NavLink to="/menu" className="text-black font-normal">
                Menu
              </NavLink>
            </li>

            <li className="col-span-1">
              <NavLink to="" className="text-black font-normal">
                Order
              </NavLink>
            </li>
            <li className="col-span-1">
              <NavLink to="" className="text-black font-normal">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex ">
          <div className="border-orange-400 border-e-2">
            <Button className="border-2 bg-orange-500 rounded-3xl me-2">
              <NavLink
                to="/login"
                className="text-white font-normal hover:text-white"
              >
                Login
              </NavLink>
            </Button>
          </div>
          <Button className="border-2 border-orange-500 bg-transparent rounded-3xl ms-2">
            <NavLink
              to="/register"
              className="text-orange-500 font-normal hover:text-white"
            >
              Sign Up
            </NavLink>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
