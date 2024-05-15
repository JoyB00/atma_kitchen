import Sidebar from "../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../AdminComponent/NavbarAdmin/NavbarAdmin";
import BodyIngredient from "./body/BodyIngredientPage";
import FooterDashboard from "../../../Component/FooterDashboard";
import { useState } from "react";
export default function IngredientPage() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="flex items-start bg-orange-100/50 w-full h-full min-h-screen min-w-full">
      <Sidebar role={user.role_id} />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin
          url="/AdminDashboard/ingredient"
          page="Ingredient"
          setSearch={setSearch}
        />
        <div className="mt-32 px-4 ">
          <BodyIngredient search={search} />
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
