import NavbarAdmin from "../../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import Sidebar from "../../../AdminPage/AdminComponent/Sidebar/Sidebar";
import FooterDashboard from "../../../../Component/FooterDashboard";
import { GetSalary } from "../../../../api/EmployeeSalaryApi";
import { useRouteLoaderData } from "react-router-dom";
import FormEmployeeSalary from "../component/FormEmployeeSalary";
export default function EditEmployeeSalary() {
  const salary = useRouteLoaderData("salary-detail");
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="h-full min-h-screen w-full flex bg-orange-100/50 ">
      <Sidebar role={user.role_id} />
      <div className=" text-black ps-[20.5rem] pe-[1rem] text-left w-[99vw]">
        <NavbarAdmin
          url="/OwnerDashboard/employeeSalary"
          page="Employee Salary"
        />
        <div className="mt-32 px-4 ">
          <div className=" w-full bg-white rounded-2xl p-8 mb-8 shadow-md">
            <h1 className="font-medium text-2xl">Add New Employee Salary</h1>
            <FormEmployeeSalary dataEdit={salary} id={salary.employee_id} />
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.salaryId;
  console.log(id);
  const salary = await GetSalary(id);
  console.log(salary);
  return salary;
}
