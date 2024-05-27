import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCookie,
  faFilter,
  faMoneyBill,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
// import IngredientProcurementTable from "../component/IngredientProcurementTable";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import TransactionTable from "../component/TransactionTable";
import { GetOrderConfirmation } from "../../../../api/TransactionApi";
import { RotateLoader } from "react-spinners";
export default function Body({ search }) {
  const transactions = useQuery({
    queryKey: ["order"],
    queryFn: GetOrderConfirmation,
  });

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid w-full grid-cols-6">
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 ps-3 pt-6 text-5xl font-semibold text-white">
            <FontAwesomeIcon icon={faMoneyBill} />Transaction Data{" "}
          </h1>
          <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
        </motion.div>
        <div className="col-span-2 ms-auto pt-6">
          <Button
            className="my-4 me-2 border-2 border-orange-500 bg-transparent text-orange-500 hover:text-white"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faFilter} className="me-1" /> Filter
          </Button>
        </div>
      </div>
      <div className="py-5">
        {transactions.isFetching ? (
          <div className="flex justify-center py-20">
            <RotateLoader
              color="orange"
              loading={transactions.isFetching}
              cssOverride={{
                justifyContent: "center",
                // marginLeft: "50%",
                borderColor: "red",
              }}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
              <TransactionTable
                data={transactions.data}
                length={transactions.data.length}
                search={search}
              />
          </>
        )}
      </div>

     
    </div>
  );
}
