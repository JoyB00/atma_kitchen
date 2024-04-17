import Sidebar from "../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../AdminComponent/NavbarAdmin/NavbarAdmin";
import Body from "./body/BodyProductPage";
import FooterDashboard from "../../../Component/FooterDashboard";
import { useState } from "react";
export default function ProductPage() {
  const [search, setSearch] = useState("");
  return (
    <div className="h-full w-full flex bg-orange-100/50 ">
      <Sidebar />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin
          url="/dashboard/product"
          page="Product"
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
