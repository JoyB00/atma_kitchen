import Sidebar from "../../AdminPage/AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import FooterDashboard from "../../../Component/FooterDashboard";
import BodyConfirm from "./body/bodyConfirm";
import { useState } from "react";
import { allIngredients } from "../../../lib/FetchFunctions";
import { useAtom } from "jotai";

export default function ConfirmationToProccessPage() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [ingredient] = useAtom(allIngredients);

  return (
    <div className="flex size-full min-h-screen min-w-full items-start bg-orange-100/50">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url={
            user.role_id == 2
              ? "/AdminDashboard"
              : user.role_id == 3
                ? "/MoDashboard/confirmationToProcess"
                : ""
          }
          page="Confirmation To Process"
          setSearch={setSearch}
        />
        <div className="mt-32 px-4 ">
          <BodyConfirm search={search} />
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
