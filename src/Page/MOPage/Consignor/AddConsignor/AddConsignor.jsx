import NavbarAdmin from "../../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import Sidebar from "../../../AdminPage/AdminComponent/Sidebar/Sidebar";
import FooterDashboard from "../../../../Component/FooterDashboard";
import FormConsignor from "../body/FormConsignor";
import { useAtom } from "jotai";
export default function AddConsignor() {
  //   const [ingredients] = useAtom(allIngredients);
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="flex h-full min-h-screen w-full bg-orange-100/50 ">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin url="/MoDashboard/consignor" page="Consignor" />
        <div className="mt-32 px-4 ">
          <div className=" mb-8 w-full rounded-2xl bg-white p-8 shadow-md">
            <h1 className="text-2xl font-medium">Add New Consignor</h1>
            <FormConsignor />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
