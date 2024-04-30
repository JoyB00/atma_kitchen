import Sidebar from "../../AdminPage/AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import Body from "./body/BodyIngredientProcurement";
import FooterDashboard from "../../../Component/FooterDashboard";
import { useState } from "react";
export default function IngredientProcurement() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="flex items-start bg-orange-100/50 w-full h-full min-h-screen min-w-full">
      <Sidebar role={user.role_id} />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin
          url={
            user.role_id == 2
              ? "/AdminDashboard/ingredientProcurement"
              : user.role_id == 3
              ? "/MoDashboard"
              : ""
          }
          page="Ingredient Procurement"
          setSearch={setSearch}
        />
        <div className="mt-32 px-4 ">
          <Body search={search} />
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
