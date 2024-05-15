import NavbarAdmin from "../../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import Sidebar from "../../../AdminPage/AdminComponent/Sidebar/Sidebar";
import FooterDashboard from "../../../../Component/FooterDashboard";
import FormIngredientProcurement from "../component/FormIngredientProcurement";
import { useAtom } from "jotai";
import { allIngredients } from "../../../../lib/FetchFunctions";
export default function AddIngredientProcurement() {
  const [ingredients] = useAtom(allIngredients);
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
            <h1 className="text-2xl font-medium">
              Add New Ingredient Procurement
            </h1>
            <FormIngredientProcurement ingredients={ingredients} />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
