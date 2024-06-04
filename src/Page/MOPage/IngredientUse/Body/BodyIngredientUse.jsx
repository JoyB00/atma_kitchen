import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCookie,
  faFilter,
  faPlateWheat,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import IngredientUseTable from "../component/IngredientUseTable";
import LoadingTable from "../component/LoadingTable";

import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { GetAllIngredientUse } from "../../../../api/IngredientUseHistory";
export default function Body({ search }) {
  const ingredientUse = useQuery({
    queryKey: ["ingredientUse"],
    queryFn: GetAllIngredientUse,
  });

  return (
    <div>
      <div className="grid w-full grid-cols-4">
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 py-8 ps-3 text-5xl font-semibold text-white">
            <FontAwesomeIcon icon={faPlateWheat} /> Ingredient Use History{" "}
          </h1>
          <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
        </motion.div>
      </div>
      <div className="grid grid-cols-6 gap-x-5">
        {ingredientUse.isFetching ? (
          <LoadingTable loading={ingredientUse.isFetching} />
        ) : (
          <>
            <div className="col-span-6">
              <IngredientUseTable
                search={search}
                data={ingredientUse.data}
                length={ingredientUse.data.length}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
