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
      className={`fixed z-10 my-4 ms-12 w-[95%] rounded-3xl py-4 ${
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
            className="my-auto text-xl font-extrabold text-black hover:text-black"
          >
            <span className="text-orange-500">ATMA </span>
            KITCHEN
          </NavLink>
        </div>
        <div className="my-auto text-left">
          <ul className="grid grid-cols-5 gap-3 ">
            <li className="col-span-1">
              <NavLink to="/" className="font-normal  text-black">
                Home
              </NavLink>
            </li>
            <li className="col-span-1">
              <NavLink to="" className="font-normal text-black">
                About
              </NavLink>
            </li>
            <li className="col-span-1">
              <NavLink to="/menu" className="font-normal text-black">
                Menu
              </NavLink>
            </li>

            <li className="col-span-1">
              <NavLink to="" className="font-normal text-black">
                Order
              </NavLink>
            </li>
            <li className="col-span-1">
              <NavLink to="" className="font-normal text-black">
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
                className=" me-auto rounded-full p-3 text-black hover:border-transparent"
                withoutAnimate
              >
                <FontAwesomeIcon icon={faBell} size="lg" />
                {/* <Badge bgColor="bg-yellow-300" ringColor="ring-transparent">
                  1
                </Badge> */}
              </Button>
              <div className="px-2" />
              <Button
                className="me-auto rounded-full p-3 text-black hover:border-transparent"
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
              <div className="border-e-2 border-orange-400">
                <Button className="me-2 rounded-3xl border-2 bg-orange-500">
                  <NavLink
                    to="/login"
                    className="font-normal text-white hover:text-white"
                  >
                    Login
                  </NavLink>
                </Button>
              </div>
              <Button className="ms-2 rounded-3xl border-2 border-orange-500 bg-transparent">
                <NavLink
                  to="/register"
                  className="font-normal text-orange-500 hover:text-white"
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
  const [authUser, setAuthUser] = React.useState(
    JSON.parse(sessionStorage.getItem("user")),
  );
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    LogOut()
      .then((res) => {
        navigate("/login");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        setAuthUser(null);
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
  const navigateToProfile = () => {
    navigate("/CustomerDashboard");
  };

  return (
    <div>
      <div className="flex flex-row">
        <Button
          className="w-16 rounded-full p-0 hover:border-transparent"
          withoutAnimate
          type="submit"
          onClick={handleOpen}
        >
          <div className="bg-orang-500 w-16">
            <img
              src="https://api.dicebear.com/8.x/adventurer/svg?seed=Abby"
              alt="avatar"
              className="my-auto w-20 p-0"
            />
          </div>
        </Button>
        <div className="px-1" />
        <h1 className="my-auto text-lg font-semibold text-black">
          <EllipsisText text={authUser ? authUser.fullName : ""} length={10} />
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
        <div className="min-w-64 bg-transparent"></div>
        <div className="flex flex-col px-4 py-2">
          <Button className="hover:text-white" onClick={navigateToProfile}>
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
