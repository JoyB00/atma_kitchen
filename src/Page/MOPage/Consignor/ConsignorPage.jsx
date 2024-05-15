import Sidebar from "../../AdminPage/AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import Body from "./body/BodyConsignorPage";
import FooterDashboard from "../../../Component/FooterDashboard";
import { useState } from "react";
import { atom } from "jotai";
export const loadEdit = atom(false);
export default function ConsignorPage() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="flex h-full min-h-screen w-full min-w-full items-start bg-orange-100/50">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url={
            user.role_id == 2
              ? "/AdminDashboard/"
              : user.role_id == 3
                ? "/MoDashboard/consignor"
                : ""
          }
          page="Consignor"
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
