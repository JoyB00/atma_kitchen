import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCookie,
  faE,
  faEgg,
  faFilter,
  faKitchenSet,
  faMoneyBill,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ConfirmationToProcess } from "../../../../api/MOTransactionConfirmation";
import LoadingTable from "../component/LoadingTable";
import ProcessConfirmationTable from "../component/ProcessConfirmationTable";

export default function BodyConfirm({ search }) {
  const ordersToProcess = useQuery({
    queryKey: ["ordersToProcess"],
    queryFn: ConfirmationToProcess,
  });
  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid w-full grid-cols-4">
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 py-8 ps-3 text-5xl font-semibold text-white">
            <FontAwesomeIcon icon={faEgg} /> Confirmation To Process{" "}
          </h1>
          <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
        </motion.div>
      </div>

      <div>
        {ordersToProcess.isFetching ? (
          <LoadingTable loading={ordersToProcess.isFetching} />
        ) : (
          <div>
            {console.log("data", ordersToProcess)}
            <div className="pt-6">
              <ProcessConfirmationTable
                search={search}
                data={ordersToProcess.data}
                length={ordersToProcess.data.length}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
