import Sidebar from "../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../AdminComponent/NavbarAdmin/NavbarAdmin";
import Body from "./body/BodyMainDashboard";
import FooterDashboard from "../../Component/FooterDashboard";
export default function Dashboard() {
  return (
    <div className="flex bg-orange-100/50 w-full h-full">
      <Sidebar />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left ">
        <NavbarAdmin url="/dashboard" page="Main Dashboard" />
        <div className="mt-32 px-4 ">
          <Body />
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
