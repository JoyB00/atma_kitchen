import { Card, Avatar, Badge } from "@mui/material";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ModifyEmployeeForm from "./ModifyEmployeeForm";
import { useQuery } from "@tanstack/react-query";
import { RotateLoader } from "react-spinners";
import { FetchAllEmployees } from "../../../../api/EmployeeApi";
import { useEffect, useState } from "react";

export default function EmployeeList({
  roleList,
  search,
  invalidator,
  setInvalidator,
}) {
  const employeeList = useQuery({
    queryKey: ["employee"],
    queryFn: FetchAllEmployees,
  });

  useEffect(() => {
    employeeList.refetch();
  }, [invalidator]);

  return (
    <div className="grid xl:grid-cols-2 2xl:grid-cols-3 gap-4">
      {employeeList.isFetching ? (
        <div className="flex justify-center py-20">
          <RotateLoader
            color="orange"
            loading={employeeList.isFetching}
            cssOverride={{
              justifyContent: "center",
              borderColor: "red",
            }}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          {employeeList.data
            .filter((employee) =>
              employee.users.fullName
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((employee) => (
              <EmployeeCard
                employee={employee}
                role={roleList}
                setInvalidator={setInvalidator}
                key={employee.id}
              />
            ))}
        </>
      )}
    </div>
  );
}

export function EmployeeCard({ employee, role, setInvalidator }) {
  return (
    <div className="flex flex-row px-4 py-3 items-center overflow-clip rounded-lg bg-white shadow-md">
      <Badge
        color="warning"
        badgeContent={
          role.find((role) => role.id == employee.users.role_id).role_name
        }
      >
        <Avatar
          src={
            "https://api.dicebear.com/8.x/adventurer/svg?seed=" +
            employee.users.fullName
          }
          sx={{ width: 64, height: 64, backgroundColor: "#ffe3bf" }}
        />
      </Badge>
      <div className="px-3" />
      <div className="flex flex-col items-start">
        <span className="font-semibold text-lg">{employee.users.fullName}</span>
        <span className="text-sm font-semibold">{employee.users.email}</span>
        <div className="py-1" />
        <span className="text-sm">{employee.users.phoneNumber}</span>
        <div className="py-1" />
        <div className="flex flex-row">
          <ModifyEmployeeForm
            mode="edit"
            id_employee={employee.id}
            employee={employee}
            roleList={role}
            setInvalidator={setInvalidator}
          />
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
