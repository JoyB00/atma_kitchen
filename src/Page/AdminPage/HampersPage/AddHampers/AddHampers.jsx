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
    <div className="flex h-full w-full bg-orange-100/50 ">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin url="/AdminDashboard/hampers" page="Hampers" />
        <div className="mt-32 px-4 ">
          <div className=" mb-8 w-full rounded-2xl bg-white p-8 shadow-md">
            <h1 className="text-2xl font-medium">Add New Hampers</h1>
            <FormHampers ingredients={ingredient} products={products} />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
