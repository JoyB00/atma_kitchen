import Input from "../../../../Component/Input";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import MenuComponent from "../../../../Component/Menu";

export default function NavbarAdmin({ url, page, setSearch }) {
  const [scroll, setScroll] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const changeBackground = () => {
    if (window.scrollY >= 40) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    changeBackground();
    document.addEventListener("scroll", changeBackground);
  });

  return (
    <div
      className={`w-[77%] rounded-2xl z-10 ${
        scroll ? "bg-white/60 " : "bg-transparent "
      } backdrop-blur-xl flex justify-between mt-6 fixed p-4 `}
    >
      <div>
        <div className="flex gap-x-1">
          <NavLink
            className="text-black"
            to={
              user.role_id == 2
                ? "/AdminDashboard"
                : user.role_id == 3
                ? "/MoDashboard"
                : ""
            }
          >
            Page
          </NavLink>
          <p> / </p>
          <NavLink className="text-black" to={url}>
            {page}
          </NavLink>
        </div>
        <div>
          <h1 className="font-semibold text-4xl text-black" to={url}>
            {page}
          </h1>
        </div>
      </div>
      <div className="w-[32%] bg-white rounded-full flex justify-between px-4 drop-shadow-md">
        <Input
          id="search"
          label="Search"
          placeholder="Search..."
          type="text"
          style={{ backgroundColor: "#f4f7fe" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MenuComponent buttonText={<FontAwesomeIcon icon={faBell} />} />
        <MenuComponent
          buttonText={<FontAwesomeIcon icon={faCircleExclamation} />}
        />
        {/* <Button
          withoutAnimate
          className="my-auto text-gray-400 bg-transparent p-0 hover:text-orange-400 "
        >
          <FontAwesomeIcon icon={faBell} />
        </Button> */}
        {/* <Button
          withoutAnimate
          className="my-auto text-gray-400 bg-transparent p-0 hover:text-orange-400 "
        ></Button> */}

        <Button
          className="rounded-full my-2 bg-orange-500 drop-shadow-md text-sm text-white "
          style={{ backgroundColor: "#f99417" }}
        >
          AP
        </Button>
      </div>
    </div>
  );
}
