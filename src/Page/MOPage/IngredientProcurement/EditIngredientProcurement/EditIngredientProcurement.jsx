import NavbarAdmin from "../../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import Sidebar from "../../../AdminPage/AdminComponent/Sidebar/Sidebar";
import FooterDashboard from "../../../../Component/FooterDashboard";
import FormIngredientProcurement from "../component/FormIngredientProcurement";
import { useAtom } from "jotai";
import { allIngredients } from "../../../../lib/FetchFunctions";
import { GetIngredientProcurement } from "../../../../api/IngredientProcurementApi";
import { useRouteLoaderData } from "react-router-dom";
export default function EditIngredientProcurement() {
  const ingredientProcurement = useRouteLoaderData(
    "ingredientProcurement-detail"
  );
  const [ingredients] = useAtom(allIngredients);
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="h-full min-h-screen w-full flex bg-orange-100/50 ">
      <Sidebar role={user.role_id} />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin
          url="/MoDashboard/ingredientProcurement"
          page="Ingredient Procurement"
        />
        <div className="mt-32 px-4 ">
          <div className=" w-full bg-white rounded-2xl p-8 mb-8 shadow-md">
            <h1 className="font-medium text-2xl">
              Edit Ingredient Procurement
            </h1>
            <FormIngredientProcurement
              dataEdit={ingredientProcurement.ingredient_procurement}
              details={ingredientProcurement.details}
              ingredients={ingredients}
            />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.ingredientProcurementId;
  const ingredientProcurement = await GetIngredientProcurement(id);
  return ingredientProcurement;
}
