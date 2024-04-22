import Sidebar from "../../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminComponent/NavbarAdmin/NavbarAdmin";
import FormProduct from "../Component/FormProduct";
import FooterDashboard from "../../../../Component/FooterDashboard";
import { allCategories } from "../../../../lib/CategoryFunctions";
import allIngredients from "../../../../lib/IngredientFunctions";
import { useAtom } from "jotai";
export default function AddProduct() {
  const [categories] = useAtom(allCategories);
  const [ingredient] = useAtom(allIngredients);
  return (
    <div className="h-full w-full flex bg-orange-100/50 ">
      <Sidebar />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin url="/dashboard/product" page="Product" />
        <div className="mt-32 px-4 ">
          <div className=" w-full bg-white rounded-2xl p-8 mb-8 shadow-md">
            <h1 className="font-medium text-2xl">Add New Product</h1>
            <FormProduct ingredient={ingredient} categories={categories} />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
