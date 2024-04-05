import { NavLink } from "react-router-dom";
import Button from "./Button";
import React from "react";
import Drawer from "react-modern-drawer";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* mobile layout */}
      <div className="lg:hidden">
        <div className="flex flex-row py-4 px-4 bg-slate-50 items-center">
          <NavLink
            to="/"
            className="text-black font-extrabold text-xl my-auto "
          >
            <span className="text-orange-400">ATMA </span>KITCHEN
          </NavLink>
          <div className="w-full" />
          <Button onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </Button>
        </div>
      </div>

      <Drawer
        open={isMenuOpen}
        onClose={toggleMenu}
        direction="right"
        enableOverlay={true}
        className="z-100 lg:hidden"
      >
        <div>test</div>
      </Drawer>

      {/* desktop layout */}
      <div className="hidden lg:block w-full fixed py-5 drop-shadow-sm z-10  ">
        <div className="flex justify-between px-8 ">
          <div className="flex">
            <NavLink
              to="/"
              className="text-black font-extrabold text-xl my-auto hover:text-black"
            >
              <span className="text-orange-400">ATMA </span>KITCHEN
            </NavLink>
          </div>
          <div className="my-auto text-left">
            <ul className="grid grid-cols-5 gap-3 ">
              <li className="col-span-1">
                <NavLink to="/" className="text-black font-normal">
                  Home
                </NavLink>
              </li>
              <li className="col-span-1">
                <NavLink to="" className="text-black font-normal">
                  About
                </NavLink>
              </li>
              <li className="col-span-1">
                <NavLink to="" className="text-black font-normal">
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
            <div className="border-e-2 border-orange-400">
              <Button className="bg-orange-500 rounded-3xl me-2  ">
                <NavLink
                  to="/login"
                  className="text-white font-normal hover:text-white"
                >
                  Login
                </NavLink>
              </Button>
            </div>
            <Button className="border-2 border-orange-500  bg-transparent  rounded-3xl ms-2">
              <NavLink
                to="/register"
                className="text-orange-500 font-normal hover:text-white"
              >
                Sign Up
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
