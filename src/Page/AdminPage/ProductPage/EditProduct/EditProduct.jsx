import Sidebar from "../../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminComponent/NavbarAdmin/NavbarAdmin";
import FormProduct from "../Component/FormProduct";
import FooterDashboard from "../../../../Component/FooterDashboard";
import { useRouteLoaderData } from "react-router-dom";
import { GetProductById } from "../../../../api/ProductApi";
import { allCategories, allIngredients } from "../../../../lib/FetchFunctions";
import { useAtom } from "jotai";
export default function EditProduct() {
  const product = useRouteLoaderData("product-detail");
  const [categories] = useAtom(allCategories);
  const [ingredient] = useAtom(allIngredients);

  return (
    <div className="h-full w-full flex bg-orange-100/50 ">
      <Sidebar />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin url="/dashboard/product" page="Product" />
        <div className="mt-32 px-4 ">
          <div className=" w-full bg-white rounded-2xl p-8 mb-8 shadow-md">
            <h1 className="font-medium text-2xl">Edit Product </h1>
            <FormProduct
              productData={product.product}
              recipes={product.recipe}
              ingredient={ingredient}
              categories={categories}
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
