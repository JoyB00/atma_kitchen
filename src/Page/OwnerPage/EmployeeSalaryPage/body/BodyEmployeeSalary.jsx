import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCookie,
  faDollar,
  faFilter,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import CardListEmployee from "../component/CardListEmployee";
import Drawer from "../../../../Component/Drawer";
import Checkbox from "../../../../Component/Checkbox";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FetchAllEmployeesForSalary } from "../../../../api/EmployeeApi";
import { FetchAllSalary } from "../../../../api/EmployeeSalaryApi";
import { useAtom } from "jotai";
import { allCategories } from "../../../../lib/FetchFunctions";
import { RotateLoader } from "react-spinners";

export default function Body({ search }) {
  const employeeList = useQuery({
    queryKey: ["employee"],
    queryFn: FetchAllEmployeesForSalary,
  });
  const salaries = useQuery({
    queryKey: ["salaries"],
    queryFn: FetchAllSalary,
  });
  const [categories] = useAtom(allCategories);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {console.log(employeeList.data)}
      <div className="w-full ">
        <motion.div className="bg-gradient-to-t from-orange-400 to-orange-500 grid grid-cols-3 rounded-2xl me-2 drop-shadow-md -z-2">
          <h1 className="px-3 py-8 col-span-2 font-semibold text-white ">
            <FontAwesomeIcon icon={faDollar} /> Salary & Bonus{" "}
          </h1>
          <div className="ms-12 col-span-1 bg-orange-600 rounded-tl-full" />
        </motion.div>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          className="bg-transparent border-2 border-orange-500  text-orange-500 me-2 hover:text-white"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faFilter} className="me-1" /> Filter
        </Button>
      </div>
      <div className="py-5">
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
            <div className="col-span-6">
              <CardListEmployee
                search={search}
                data={employeeList.data}
                length={employeeList.data.length}
              />
            </div>
          </>
        )}
      </div>

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="FILTER">
        <div className="px-4">
          <h1 className="text-lg font-semibold">Category Product</h1>
          {categories.map((category) => (
            <Checkbox
              id={category.category_name}
              label={category.category_name}
              key={category.id}
            />
          ))}
          <h1 className="text-lg font-semibold pt-8">Stock Product</h1>
          <Checkbox id="In Stock" label="In Stock" />
          <Checkbox id="Limited" label="Limited" />
          <Checkbox id="Out of Stock" label="Out of Stock" />
        </div>
        <div className="ms-auto mt-auto h-screen flex items-end">
          <Button
            className="my-4 text-orange-500 me-2 border-2 border-orange-500 bg-transparent hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="my-4 text-white me-2 bg-orange-500 "
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faFilter} className="me-1" /> Filter
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
