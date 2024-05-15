import Sidebar from "../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../AdminComponent/NavbarAdmin/NavbarAdmin";
import Body from "./body/BodyCustomerOrderHistory";
import FooterDashboard from "../../../Component/FooterDashboard";
import { useState } from "react";
export default function CustomerOrderHistoryPage() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="flex h-full min-h-screen w-full min-w-full items-start bg-orange-100/50">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url={"/AdminDashboard/orderHistory"}
          page="Customer Order History"
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
