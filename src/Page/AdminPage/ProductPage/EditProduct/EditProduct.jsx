import Sidebar from "../../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminComponent/NavbarAdmin/NavbarAdmin";
import FormProduct from "../Component/FormProduct";
import FooterDashboard from "../../../../Component/FooterDashboard";
import { useRouteLoaderData } from "react-router-dom";
import { GetProductById } from "../../../../api/ProductApi";
import {
  allCategories,
  allConsignors,
  allIngredients,
} from "../../../../lib/FetchFunctions";
import { useAtom } from "jotai";
export default function EditProduct() {
  const product = useRouteLoaderData("product-detail");
  const [categories] = useAtom(allCategories);
  const [ingredient] = useAtom(allIngredients);
  const [consignor] = useAtom(allConsignors);
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="flex h-full w-full bg-orange-100/50 ">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin url="/AdminDashboard/product" page="Product" />
        <div className="mt-32 px-4 ">
          <div className=" mb-8 w-full rounded-2xl bg-white p-8 shadow-md ">
            <h1 className="text-2xl font-medium">Edit Product </h1>
            <FormProduct
              productData={product.product}
              recipes={product.recipe}
              ingredient={ingredient}
              categories={categories}
              consignor={consignor}
              limits={product.limit}
            />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.productId;
  const product = await GetProductById(id);
  // console.log(product.product);
  return product;
}
