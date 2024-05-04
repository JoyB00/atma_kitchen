import NavbarAdmin from "../../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import Sidebar from "../../../AdminPage/AdminComponent/Sidebar/Sidebar";
import FooterDashboard from "../../../../Component/FooterDashboard";
import FormConsignor from "../body/FormConsignor";
import { GetConsignor } from "../../../../api/ConsignorApi";
import { useRouteLoaderData } from "react-router-dom";
export default function EditConsignor() {
  const consignor = useRouteLoaderData("consignor-detail");
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="h-full min-h-screen w-full flex bg-orange-100/50 ">
      <Sidebar role={user.role_id} />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin url="/MoDashboard/consignor" page="Consignor" />
        <div className="mt-32 px-4 ">
          <div className=" w-full bg-white rounded-2xl p-8 mb-8 shadow-md">
            <h1 className="font-medium text-2xl">Edit Consignor</h1>
            <FormConsignor dataEdit={consignor.consignor} />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.consignorId;
  const consignor = await GetConsignor(id);
  return consignor;
}
