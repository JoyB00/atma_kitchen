import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../../../Component/Checkbox";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FetchAllCustomers } from "../../../../api/CustomerApi";
import LoadingTable from "../component/LoadingTable";
import CustomerTable from "../component/CustomerTable";
import Drawer from "../../../../Component/Drawer";

export default function Body({ search }) {
  const customer = useQuery({
    queryKey: ["customer"],
    queryFn: FetchAllCustomers,
  });

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="w-full grid grid-cols-6">
        <motion.div className="col-span-4 bg-gradient-to-t from-orange-400 to-orange-500 grid grid-cols-3 rounded-2xl me-2 drop-shadow-md -z-2">
          <h1 className="px-3 pt-6 col-span-2 font-semibold text-white ">
            <FontAwesomeIcon icon={faUser} /> Customer Data{" "}
          </h1>
          <div className="ms-12 col-span-1 bg-orange-600 rounded-tl-full" />
        </motion.div>
        <div className="pt-6 col-span-2 ms-auto">
          <Button
            className="bg-transparent border-2 border-orange-500 my-4 text-orange-500 me-2 hover:text-white"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faFilter} className="me-1" /> Filter
          </Button>
          <NavLink to="addHampers">
            <Button className="bg-orange-500 my-4 text-white">
              <FontAwesomeIcon icon={faSquarePlus} className="me-1" /> Add
              Hampers
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-x-5">
        {customer.isFetching ? (
          <LoadingTable loading={customer.isFetching} />
        ) : (
          <div className="col-span-6">
            <CustomerTable
              search={search}
              data={customer.data}
              length={customer.data.length}
            />
          </div>
        )}
      </div>

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="FILTER">
        <div className="px-4">
          {/* <h1 className="text-lg font-semibold">Category Product</h1> */}
          {/* {categories.map((category) => (
            <Checkbox
              id={category.category_name}
              label={category.category_name}
              key={category.id}
            />
          ))} */}
          <h1 className="text-lg font-semibold pt-8">Stock Hampers</h1>
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
