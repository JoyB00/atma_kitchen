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
    <div className="flex h-full min-h-screen w-full bg-orange-100/50 ">
      {console.log(employee)}
      <Sidebar role={user.role_id} />
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url="/OwnerDashboard/employeeSalary"
          page="Employee Salary"
        />
        <div className="mt-32 px-4 ">
          <div className=" mb-8 w-full rounded-2xl bg-white p-8 shadow-md">
            <h1 className="text-2xl font-medium">Add New Employee Salary</h1>
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
