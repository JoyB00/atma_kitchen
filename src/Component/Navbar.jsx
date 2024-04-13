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
export default function Navbar() {
  const authUser = JSON.parse(sessionStorage.getItem("user"));
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();

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
    <motion.div
      className={`w-[95%] fixed py-2 z-10 ms-12 my-4 rounded-3xl ${
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
          {sessionStorage.getItem("token") != null &&
          sessionStorage.getItem("user") != null ? (
            <>
              <Button
                className=" rounded-full p-0 hover:border-transparent text-black me-auto"
                withoutAnimate
              >
                <FontAwesomeIcon icon={faBell} size="lg" />
                {/* <Badge bgColor="bg-yellow-300" ringColor="ring-transparent">
                  1
                </Badge> */}
              </Button>
              <Button
                className="ms-3 rounded-full p-0 hover:border-transparent text-black me-auto"
                withoutAnimate
              >
                <FontAwesomeIcon icon={faCartShopping} size="lg" />
                {/* <Badge bgColor="bg-yellow-300" ringColor="ring-transparent">
                  1
                </Badge> */}
              </Button>
              <h1 className="ms-4 text-lg font-medium text-black my-auto">
                Welcome {"  "}
                <span
                  className="font-bold text-2xl text-black"
                  style={{
                    transitionProperty: " color",
                    transitionDuration: "200ms",
                    transitionTimingFunction: "linear",
                  }}
                >
                  {authUser.fullName.substring(0, 5)}
                </span>
              </h1>

              <Button
                className=" rounded-full p-0 hover:border-transparent w-16"
                withoutAnimate
                type="submit"
                onClick={logout}
              >
                <div className="bg-orang-500 w-16">
                  <img
                    src="https://api.dicebear.com/8.x/adventurer/svg?seed=Angel"
                    alt="avatar"
                    className="w-20 p-0 my-auto"
                  />
                </div>
              </Button>
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
