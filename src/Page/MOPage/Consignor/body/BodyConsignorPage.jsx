import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCookie,
  faFilter,
  faPeopleCarryBox,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
// import IngredientProcurementTable from "../component/IngredientProcurementTable";
import Drawer from "../../../../Component/Drawer";
import Checkbox from "../../../../Component/Checkbox";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { allCategories } from "../../../../lib/FetchFunctions";
import CardListConsignor from "../Component/CardListConsignor";
import { RotateLoader } from "react-spinners";
import { FetchAllConsignors } from "../../../../api/ConsignorApi";
export default function Body({ search }) {
  const consignors = useQuery({
    queryKey: ["consignors"],
    queryFn: FetchAllConsignors,
  });
  const [categories] = useAtom(allCategories);
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
            <FontAwesomeIcon icon={faPeopleCarryBox} /> Consignor Data{" "}
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
          <NavLink to="addConsignor">
            <Button className="my-4 bg-orange-500 text-white">
              <FontAwesomeIcon icon={faSquarePlus} className="me-1" /> Add
              Consignor
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="py-5">
        {consignors.isFetching ? (
          <div className="flex justify-center py-20">
            <RotateLoader
              color="orange"
              loading={consignors.isFetching}
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
            <CardListConsignor
              data={consignors.data}
              length={consignors.data.length}
              search={search}
            />
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
          <h1 className="pt-8 text-lg font-semibold">Stock Product</h1>
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
