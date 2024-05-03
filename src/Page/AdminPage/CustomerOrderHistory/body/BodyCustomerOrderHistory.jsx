import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCookie,
  faFilter,
  faGifts,
  faHistory,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../../../Component/Checkbox";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FetchOrderHistory } from "../../../../api/CustomerApi";

import LoadingTable from "../component/LoadingTable";
import OrderHistoryTable from "../component/OrderHistoryTable";
import Drawer from "../../../../Component/Drawer";
import { useAtom } from "jotai";
import { allCustomers } from "../../../../lib/FetchFunctions";

export default function Body({ search }) {
  const [customers] = useAtom(allCustomers);
  const [customer, setCustomer] = useState(customers[0].id);

  const [isOpen, setIsOpen] = useState(false);
  const handleChange = async (event) => {
    await setCustomer(event.target.value);
    orderHistory.refetch();
  };
  const orderHistory = useQuery({
    queryKey: ["orderHistory"],
    queryFn: () => FetchOrderHistory(customer),
  });
  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  return (
    <div>
      {console.log(customer)}
      <div className="w-full grid grid-cols-6">
        <motion.div className="col-span-6 bg-gradient-to-t from-orange-400 to-orange-500 grid grid-cols-3 rounded-2xl me-2 drop-shadow-md -z-2">
          <h1 className="px-3 py-8 col-span-2 font-semibold text-white ">
            <FontAwesomeIcon icon={faHistory} /> Order History{" "}
          </h1>
          <div className="ms-12 col-span-1 bg-orange-600 rounded-tl-full" />
        </motion.div>
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className="pt-5 col-span-2">
          <label htmlFor="customer_id">Select Customer</label>
          <motion.select
            {...animate}
            className="mt-2 w-full text-black border-0 py-3 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-xl"
            onChange={handleChange}
            name="customer_id"
            id="customer_id"
          >
            {customers.map((customer) => (
              <option value={customer.id} key={customer.id}>
                {customer.users.fullName}
              </option>
            ))}
          </motion.select>
        </div>
        <div className="col-span-1 pt-9 flex justify-start">
          <Button
            className="bg-transparent border-2 border-orange-500 my-4 text-orange-500 me-2 hover:text-white"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faFilter} className="me-1" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-6 ">
        {orderHistory.isFetching ? (
          <LoadingTable loading={orderHistory.isFetching} />
        ) : (
          <div className="col-span-6 pt-4">
            <OrderHistoryTable
              search={search}
              data={orderHistory.data}
              length={orderHistory.data.length}
            />
          </div>
        )}
      </div>

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="FILTER">
        <div className="px-4">
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
