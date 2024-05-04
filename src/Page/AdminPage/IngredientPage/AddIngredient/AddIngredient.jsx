import Sidebar from "../../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminComponent/NavbarAdmin/NavbarAdmin";
import FormIngredient from "../Component/FormIngredient";
import FooterDashboard from "../../../../Component/FooterDashboard";  
export default function AddHampers() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="h-full w-full flex bg-orange-100/50 ">
      <Sidebar role={user.role_id} />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin url="/AdminDashboard/ingredient" page="Ingredient" />
        <div className="mt-32 px-4 ">
          <div className=" w-full bg-white rounded-2xl p-8 mb-8 shadow-md">
            <h1 className="font-medium text-2xl">Add New Ingredients</h1>
            <FormIngredient />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
