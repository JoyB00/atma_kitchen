import { NavLink } from "react-router-dom";
import Button from "./Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { LogOut } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Badge from "./Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import EllipsisText from "react-ellipsis-text";

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
        <div className="flex ">
          <NavLink
            to="/Admindashboard"
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
        <div className="flex items-center">
          {sessionStorage.getItem("token") != null &&
          sessionStorage.getItem("user") != null ? (
            <>
              <Button
                className=" rounded-full p-3 hover:border-transparent text-black me-auto"
                withoutAnimate
              >
                <FontAwesomeIcon icon={faBell} size="lg" />
                {/* <Badge bgColor="bg-yellow-300" ringColor="ring-transparent">
                  1
                </Badge> */}
              </Button>
              <div className="px-2" />
              <Button
                className="rounded-full p-3 hover:border-transparent text-black me-auto"
                withoutAnimate
              >
                <FontAwesomeIcon icon={faCartShopping} size="lg" />
                {/* <Badge bgColor="bg-yellow-300" ringColor="ring-transparent">
                  1
                </Badge> */}
              </Button>
              <div className="px-2" />
              <ProfileMenu />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProfileMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const authUser = JSON.parse(sessionStorage.getItem("user"));
  const logout = () => {
    LogOut()
      .then((res) => {
        navigate("/login");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        toast.success(res.message, {
          style: {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          position: "bottom-right",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          style: {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          position: "bottom-right",
        });
      });
  };

  return (
    <div>
      <div className="flex flex-row">
        <Button
          className="rounded-full p-0 hover:border-transparent w-16"
          withoutAnimate
          type="submit"
          onClick={handleOpen}
        >
          <div className="bg-orang-500 w-16">
            <img
              src="https://api.dicebear.com/8.x/adventurer/svg?seed=Abby"
              alt="avatar"
              className="w-20 p-0 my-auto"
            />
          </div>
        </Button>
        <div className="px-1" />
        <h1 className="text-lg font-semibold text-black my-auto">
          <EllipsisText text={authUser.fullName} length={"10"} />
        </h1>
      </div>
      <Menu
        id="basic-menu"
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="bg-transparent min-w-64"></div>
        <div className="px-4 py-2 flex flex-col">
          <Button className="hover:text-white" onClick={logout}>
            My profile
          </Button>
          <div className="py-1" />
          <Button
            hoverColor={"#de4337"}
            className="hover:text-white"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </Menu>
    </div>
  );
}
