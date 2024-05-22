import Sidebar from "../../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminComponent/NavbarAdmin/NavbarAdmin";
import FormProduct from "../Component/FormProduct";
import FooterDashboard from "../../../../Component/FooterDashboard";
import {
  allCategories,
  allConsignors,
  allIngredients,
} from "../../../../lib/FetchFunctions";
import { useAtom } from "jotai";
export default function AddProduct() {
  const [categories] = useAtom(allCategories);
  const [ingredient] = useAtom(allIngredients);
  const [consignor] = useAtom(allConsignors);
  console.log(ingredient);
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="flex h-full w-full bg-orange-100/50 ">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin url="/AdminDashboard/product" page="Product" />
        <div className="mt-32 px-4 ">
          <div className=" mb-8 w-full rounded-2xl bg-white p-8 shadow-md">
            <h1 className="text-2xl font-medium">Add New Product</h1>
            <FormProduct
              ingredient={ingredient}
              categories={categories}
              consignor={consignor}
            />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
