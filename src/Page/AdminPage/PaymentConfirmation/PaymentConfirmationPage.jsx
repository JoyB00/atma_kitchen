import Sidebar from "../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../AdminComponent/NavbarAdmin/NavbarAdmin";
import FooterDashboard from "../../../Component/FooterDashboard";
import { useState } from "react";
import PaymentConfirmationBody from "./PaymentConfirmationBody";

export default function PaymentConfirmationPage() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="flex size-full min-h-screen min-w-full items-start bg-orange-100/50">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url={"/AdminDashboard/transaction/paymentConfirmation"}
          page="Payment Confirmation"
          setSearch={setSearch}
        />
        <div className="mt-32 px-4 ">
          <PaymentConfirmationBody />
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
