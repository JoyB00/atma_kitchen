import Sidebar from "../../AdminPage/AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import FooterDashboard from "../../../Component/FooterDashboard";
import BodyIngredient from "./body/BodyShowIngredientPage";
import { useState } from "react";

export default function ShowIngredientMO() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));


  return (
    <div className="flex size-full min-h-screen min-w-full items-start bg-orange-100/50">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url={
            user.role_id == 2
              ? "/AdminDashboard"
              : user.role_id == 3
                ? "/MoDashboard/showIngredient"
                : ""
          }
          page="Show Ingredient"
          setSearch={setSearch}
        />
        <div className="mt-32 px-4 ">
        <BodyIngredient />
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
