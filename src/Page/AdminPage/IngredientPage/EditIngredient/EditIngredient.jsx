import Sidebar from "../../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminComponent/NavbarAdmin/NavbarAdmin";
import FormIngredient from "../Component/FormIngredient";
import FooterDashboard from "../../../../Component/FooterDashboard";
import { GetIngredientById } from "../../../../api/IngredientApi";
import { useRouteLoaderData } from "react-router-dom";

export default function EditIngredient() {
  const ingredient = useRouteLoaderData("ingredient-detail");
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="flex h-full w-full bg-orange-100/50 ">
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin url="/AdminDashboard/ingredient" page="Ingredient" />
        <div className="mt-32 px-4 ">
          <div className=" mb-8 w-full rounded-2xl bg-white p-8 shadow-md">
            <h1 className="text-2xl font-medium">Edit Ingredient</h1>
            <FormIngredient ingredientData={ingredient.ingredient} />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.ingredientId;
  const ingredient = await GetIngredientById(id);
  return ingredient;
}
