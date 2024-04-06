import { NavLink } from "react-router-dom";
import Button from "./Button";
export default function Navbar() {
  return (
    <div className="w-full fixed py-5 drop-shadow-sm z-10 bg-opacity-30 bg-white ">
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
  );
}
