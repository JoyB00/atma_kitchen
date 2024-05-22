import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCookie,
  faFilter,
  faGifts,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../../../Component/Checkbox";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FetchAllHampers } from "../../../../api/HampersApi";
import LoadingTable from "../component/LoadingTable";
import HampersTables from "../component/HampersTable";
import Drawer from "../../../../Component/Drawer";

export default function Body({ search }) {
  const hampers = useQuery({
    queryKey: ["hampers"],
    queryFn: FetchAllHampers,
  });

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="grid w-full grid-cols-6">
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 px-3 pt-6 font-semibold text-white ">
            <FontAwesomeIcon icon={faGifts} /> Hampers Data{" "}
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
          <NavLink to="addHampers">
            <Button className="my-4 bg-orange-500 text-white">
              <FontAwesomeIcon icon={faSquarePlus} className="me-1" /> Add
              Hampers
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-x-5">
        {hampers.isFetching ? (
          <LoadingTable loading={hampers.isFetching} />
        ) : (
          <div className="col-span-6">
            <HampersTables
              search={search}
              data={hampers.data.hampers}
              length={hampers.data.hampers.length}
            />
          </div>
        )}
      </div>

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="FILTER">
        <div className="px-4">
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
