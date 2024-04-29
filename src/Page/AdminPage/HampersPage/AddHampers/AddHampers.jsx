import Sidebar from "../../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminComponent/NavbarAdmin/NavbarAdmin";
import FormHampers from "../component/FormHampers";
import FooterDashboard from "../../../../Component/FooterDashboard";
import { allIngredients, allProducts } from "../../../../lib/FetchFunctions";
import { useAtom } from "jotai";
export default function AddHampers() {
  const [products] = useAtom(allProducts);
  const [ingredient] = useAtom(allIngredients);
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="h-full w-full flex bg-orange-100/50 ">
      <Sidebar role={user.role_id} />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin url="/AdminDashboard/hampers" page="Hampers" />
        <div className="mt-32 px-4 ">
          <div className=" w-full bg-white rounded-2xl p-8 mb-8 shadow-md">
            <h1 className="font-medium text-2xl">Add New Hampers</h1>
            <FormHampers ingredients={ingredient} products={products} />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
