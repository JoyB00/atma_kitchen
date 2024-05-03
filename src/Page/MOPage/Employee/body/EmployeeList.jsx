import { Card, Avatar, Badge } from "@mui/material";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ModifyEmployeeForm from "./ModifyEmployeeForm";

export default function EmployeeList() {
  return (
    <div className="grid xl:grid-cols-2 2xl:grid-cols-3 gap-4">
      <EmployeeCard />
      <EmployeeCard />
      <EmployeeCard />
      <EmployeeCard />
      <EmployeeCard />
      <EmployeeCard />
      <EmployeeCard />
    </div>
  );
}

export function EmployeeCard() {
  const user = {
    id: 1,
    role_id: 3,
    gender: "Male",
    fullName: "Mooooo",
    email: "christhartono@hotmail.com",
    password: "12345678",
    phoneNumber: "00000000000",
    dateOfBirth: "2024-05-02",
  };
  const role = ["", "Owner", "Admin", "MO", "Customer"];

  return (
    <div className="flex flex-row px-4 py-3 items-center overflow-clip rounded-lg bg-white shadow-md">
      <Badge color="warning" badgeContent={role[user.role_id]}>
        <Avatar
          src={
            "https://api.dicebear.com/8.x/adventurer/svg?seed=" + user.fullName
          }
          sx={{ width: 64, height: 64, backgroundColor: "#ffe3bf" }}
        />
      </Badge>
      <div className="px-3" />
      <div className="flex flex-col items-start">
        <span className="font-semibold text-lg">{user.fullName}</span>
        <span className="text-sm font-semibold">{user.email}</span>
        <div className="py-1" />
        <span className="text-sm">{user.phoneNumber}</span>
        <div className="py-1" />
        <div className="flex flex-row">
          <ModifyEmployeeForm mode="edit" id_employee={user.id} />
          <div className="px-1" />
          <Button hoverColor={"#ef4444"} className="bg-white">
            <div className="flex flex-row items-center text-red-500 hover:text-white">
              <FontAwesomeIcon icon={faTrashAlt} />
              <div className="px-2">Delete</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
