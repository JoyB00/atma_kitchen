import Sidebar from "../../AdminPage/AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import FooterDashboard from "../../../Component/FooterDashboard";
import BodyEmployeeManagement from "./body/BodyEmployee";
import { useState } from "react";
import { useAtom } from "jotai";
import { allEmployee, allRoles } from "../../../lib/FetchFunctions";

export default function IngredientProcurement() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [employees] = useAtom(allEmployee);
  const [roles] = useAtom(allRoles);

  return (
    <div className="flex h-full min-h-screen w-full min-w-full items-start bg-orange-100/50">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url={
            user.role_id == 2
              ? "/AdminDashboard/ingredientProcurement"
              : user.role_id == 3
                ? "/MoDashboard"
                : ""
          }
          page="Employee Management"
          setSearch={setSearch}
        />
        <div className="mt-32 px-4 ">
          <BodyEmployeeManagement
            employeeList={employees}
            roleList={roles}
            search={search}
          />
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
