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
      <div className="grid w-full grid-cols-6">
        <motion.div className="-z-2 col-span-6 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 px-3 py-6 font-semibold text-white ">
            <FontAwesomeIcon icon={faUser} /> Customer Data{" "}
          </h1>
          <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
        </motion.div>
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
          <h1 className="pt-8 text-lg font-semibold">Stock Hampers</h1>
          <Checkbox id="In Stock" label="In Stock" />
          <Checkbox id="Limited" label="Limited" />
          <Checkbox id="Out of Stock" label="Out of Stock" />
        </div>
        <div className="ms-auto mt-auto flex h-screen items-end">
          <Button
            className="my-4 me-2 border-2 border-orange-500 bg-transparent text-orange-500 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="my-4 me-2 bg-orange-500 text-white "
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faFilter} className="me-1" /> Filter
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
