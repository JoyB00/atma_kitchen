import Sidebar from "../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../AdminComponent/NavbarAdmin/NavbarAdmin";
import Body from "./body/BodyHampersPage";
import FooterDashboard from "../../../Component/FooterDashboard";
import { useState } from "react";
import { atom } from "jotai";
export const loadEdit = atom(false);
export default function HampersPage() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex items-start bg-orange-100/50 w-full h-full min-h-screen min-w-full">
      <Sidebar role="admin" />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin
          url="/dashboard/hampers"
          page="Hampers"
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
