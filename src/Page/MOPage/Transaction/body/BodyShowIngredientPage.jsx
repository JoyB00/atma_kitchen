import React, { useState, useEffect } from "react";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEgg, faFilter } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import { getShortageIngredients } from "../../../../api/MOTransactionConfirmation";

export default function BodyIngredient() {
  const [shortageIngredients, setShortageIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShortageIngredients();
        setShortageIngredients(data);
      } catch (err) {
        console.error("Error fetching shortage ingredients:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid w-full grid-cols-6">
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 ps-3 pt-6 text-5xl font-semibold text-white">
            <FontAwesomeIcon icon={faEgg} /> Ingredient Data
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
        {isLoading ? (
          <div className="flex justify-center py-20">
            <RotateLoader
              color="orange"
              loading={isLoading}
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
          <table className="w-full rounded-2xl bg-white text-gray-500 drop-shadow-md">
            <thead className="border-b-2">
              <tr>
                <th className="py-8 ps-8 text-start font-medium">
                  Transaction Number
                </th>
                <th className="py-8 ps-8 text-start font-medium">
                  Ingredient Name
                </th>
                <th className="pe-6 text-start font-medium ">
                  Quantity Needed
                </th>
              </tr>
            </thead>
            <tbody>
              {shortageIngredients.map((item) => (
                <tr key={`${item.transaction_number}-${item.ingredient_name}`}>
                  <td className="ps-8">{item.transaction_number}</td>
                  <td className="ps-8">{item.ingredient_name}</td>
                  <td className="pe-6">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
