import { Card, Avatar, Badge } from "@mui/material";

export default function EmployeeList() {
  return (
    <div className="grid grid-cols-3 gap-4">
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
    <Card className="flex flex-row px-4 py-3 items-center">
      <Badge color="primary" badgeContent={role[user.role_id]}>
        <Avatar
          src={
            "https://api.dicebear.com/8.x/adventurer/svg?seed=" + user.fullName
          }
          sx={{ width: 64, height: 64, backgroundColor: "#aaaaaa" }}
        />
      </Badge>
      <div className="px-3" />
      <div className="flex flex-col items-start">
        <span className="font-semibold text-lg">{user.fullName}</span>
        <span className="text-sm font-semibold">{user.email}</span>
        <div className="py-1" />
        <span className="text-sm">{user.phoneNumber}</span>
      </div>
    </Card>
  );
}
