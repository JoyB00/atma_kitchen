import Input from "../../../../Component/Input";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleExclamation,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuComponent from "../../../../Component/Menu";
import { LogOut } from "../../../../api/AuthApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  const navigate = useNavigate();
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

  useEffect(() => {
    changeBackground();
    document.addEventListener("scroll", changeBackground);
  });

  return (
    <div
      className={`z-10 w-[77%] rounded-2xl ${
        scroll ? "bg-white/60 " : "bg-transparent "
      } fixed mt-6 flex justify-between p-4 backdrop-blur-xl `}
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
          <h1 className="text-4xl font-semibold text-black" to={url}>
            {page}
          </h1>
        </div>
      </div>
      <div className="flex w-2/5 flex-row justify-between rounded-full bg-white px-4 drop-shadow-md">
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
        <Button
          withoutAnimate
          onClick={logout}
          className="text-gray-400 hover:border-transparent hover:text-orange-400"
        >
          {" "}
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Button>
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
          className="my-2 rounded-full bg-orange-500 text-sm text-white drop-shadow-md "
          style={{ backgroundColor: "#f99417" }}
        >
          {user.fullName.substring(0, 2).toUpperCase()}
        </Button>
      </div>
    </div>
  );
}
