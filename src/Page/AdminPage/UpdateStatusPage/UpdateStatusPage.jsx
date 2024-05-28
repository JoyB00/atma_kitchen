import Sidebar from "../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../AdminComponent/NavbarAdmin/NavbarAdmin";
import FooterDashboard from "../../../Component/FooterDashboard";
import { useState } from "react";
import UpdateStatusBody from "./UpdateStatusBody";

export default function UpdateStatusPage() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="flex size-full min-h-screen min-w-full items-start bg-orange-100/50">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url={"/AdminDashboard/transaction/updateStatus"}
          page="Update Status"
          setSearch={setSearch}
        />
        <div className="mt-32 px-4 ">
          <UpdateStatusBody />
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
