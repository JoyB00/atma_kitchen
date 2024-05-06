import Sidebar from "../AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../AdminComponent/NavbarAdmin/NavbarAdmin";
import Body from "./body/BodyMainDashboard";
import FooterDashboard from "../../../Component/FooterDashboard";
export default function Dashboard() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="flex bg-orange-100/50 w-full h-full">
      <Sidebar role={user.role_id} />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left ">
        <NavbarAdmin
          url={
            user.role_id == 2
              ? "/AdminDashboard"
              : user.role_id == 3
              ? "/MoDashboard"
              : user.role_id == 1
              ? "OwnerDashboard"
              : ""
          }
          page="Main Dashboard"
        />
        <div className="mt-32 px-4 ">
          <Body />
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
