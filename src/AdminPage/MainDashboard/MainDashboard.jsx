import Sidebar from "../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../AdminComponent/navbarAdmin/NavbarAdmin";
import Body from "./body/BodyMainDashboard";
export default function Dashboard() {
  return (
    <div className="flex bg-orange-50/50 w-full">
      <Sidebar />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin />
        <div className="mt-32 px-4 ">
          <Body />
        </div>
      </div>
    </div>
  );
}
