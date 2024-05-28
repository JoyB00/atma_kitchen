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
import OrderTable from "../component/TransactionTable";
import { GetOrderConfirmation } from "../../../../api/TransactionApi";
import { RotateLoader } from "react-spinners";
export default function BodyOrderConfirmation() {
  const orderConfirmation = useQuery({
    queryKey: ["ordeConfirmationList"],
    queryFn: GetOrderConfirmation,
  });

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid w-full grid-cols-6">
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 ps-3 pt-6 text-5xl font-semibold text-white">
            <FontAwesomeIcon icon={faMoneyBill} />  Order Data{" "}
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
        {orderConfirmation.isFetching ? (
          <div className="flex justify-center py-20">
            <RotateLoader
              color="orange"
              loading={orderConfirmation.isFetching}
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
          <div>
          {orderConfirmation.data.length === 0 ? (
            <span className="w-full px-2 py-4 text-xl font-semibold text-slate-800">
              Nothing to see here...
            </span>
          ) : (
            <table className="w-full rounded-2xl bg-white text-gray-500 drop-shadow-md">
           <thead className="border-b-2">
            <tr>
              <th className="py-8 ps-8 text-start font-medium">
                Transaction Number  
              </th>
              <th className="py-8 ps-8 text-start font-medium">
                Customer Name   
              </th>
              <th className="pe-6 text-start font-medium ">Total Price (Rp.)</th>
              <th className="pe-6 text-start font-medium ">Status</th>
              <th className="pe-6 text-start font-medium">Payment Method</th>
            </tr>
          </thead>
            <tbody>
              {orderConfirmation.data?.map((transaction) => (
                <>
                  <tr key={transaction.id}>
                    <OrderTable
                      key={transaction.id}
                      transaction={transaction}
                    />
                  </tr>
                </>
              ))}
            </tbody>
            </table>
          )}
        </div>
            
        )}
      </div>
    </div>
  );
}
