import NavbarAdmin from "../../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import Sidebar from "../../../AdminPage/AdminComponent/Sidebar/Sidebar";
import FooterDashboard from "../../../../Component/FooterDashboard";
import { GetEmployeeById } from "../../../../api/EmployeeApi";
import { useRouteLoaderData } from "react-router-dom";
import FormEmployeeSalary from "../component/FormEmployeeSalary";
export default function AddEmployeeSalary() {
  const employee = useRouteLoaderData("employee-detail");
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="h-full min-h-screen w-full flex bg-orange-100/50 ">
      {console.log(employee)}
      <Sidebar role={user.role_id} />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin
          url="/OwnerDashboard/employeeSalary"
          page="Employee Salary"
        />
        <div className="mt-32 px-4 ">
          <div className=" w-full bg-white rounded-2xl p-8 mb-8 shadow-md">
            <h1 className="font-medium text-2xl">Add New Employee Salary</h1>
            <FormEmployeeSalary id={employee.id} />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.employeeId;
  console.log(id);
  const employee = await GetEmployeeById(id);
  console.log(employee);
  return employee;
}
