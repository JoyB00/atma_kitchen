import Sidebar from "../../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../AdminComponent/NavbarAdmin/NavbarAdmin";
import FormHampers from "../component/FormHampers";
import FooterDashboard from "../../../../Component/FooterDashboard";
import { allIngredients, allProducts } from "../../../../lib/FetchFunctions";
import { useAtom } from "jotai";
import { GetHampersById } from "../../../../api/HampersApi";
import { useRouteLoaderData } from "react-router-dom";

export default function EditHampers() {
  const hampers = useRouteLoaderData("hampers-detail");
  const [products] = useAtom(allProducts);
  const [ingredient] = useAtom(allIngredients);
  return (
    <div className="h-full w-full flex bg-orange-100/50 ">
      <Sidebar />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin url="/dashboard/hampers" page="Hampers" />
        <div className="mt-32 px-4 ">
          <div className=" w-full bg-white rounded-2xl p-8 mb-8 shadow-md">
            <h1 className="font-medium text-2xl">Edit Hampers</h1>
            <FormHampers
              hampersData={hampers.hampers}
              detailHampers={hampers.details}
              ingredients={ingredient}
              products={products}
            />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.hampersId;
  const hampers = await GetHampersById(id);
  return hampers;
}
