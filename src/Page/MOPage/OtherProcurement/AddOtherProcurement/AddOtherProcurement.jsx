import NavbarAdmin from "../../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import Sidebar from "../../../AdminPage/AdminComponent/Sidebar/Sidebar";
import FooterDashboard from "../../../../Component/FooterDashboard";
import FormOtherProcurement from "../component/FormOtherProcurement";
export default function AddOtherProcurement() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="flex h-full min-h-screen w-full bg-orange-100/50 ">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url="/MoDashboard/ingredientProcurement"
          page="Ingredient Procurement"
        />
        <div className="mt-32 px-4 ">
          <div className=" mb-8 w-full rounded-2xl bg-white p-8 shadow-md">
            <h1 className="text-2xl font-medium">Add New Other Procurement</h1>
            <FormOtherProcurement />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
