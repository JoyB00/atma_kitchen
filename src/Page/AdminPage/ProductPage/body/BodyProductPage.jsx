import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCookie,
  faFilter,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import Top5Selling from "../Component/Top5Selling";
import ProductTable from "../Component/ProductTable";
import Drawer from "../../../../Component/Drawer";
import Checkbox from "../../../../Component/Checkbox";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FetchAllProducts } from "../../../../api/ProductApi";
import { useAtom } from "jotai";
import { allCategories, allIngredients } from "../../../../lib/FetchFunctions";
import LoadingTable from "../Component/LoadingTable";
export default function Body({ search }) {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: FetchAllProducts,
  });
  const [categories] = useAtom(allCategories);
  const [isOpen, setIsOpen] = useState(false);
  const [ingredient] = useAtom(allIngredients);
  return (
    <div>
      <div className="grid w-full grid-cols-6">
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 px-3 pt-6 font-semibold text-white ">
            <FontAwesomeIcon icon={faCookie} /> Product Data{" "}
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
          <NavLink to="addProduct">
            <Button className="my-4 bg-orange-500 text-white">
              <FontAwesomeIcon icon={faSquarePlus} className="me-1" /> Add
              Product
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-x-5">
        {products.isFetching ? (
          <LoadingTable loading={products.isFetching} />
        ) : (
          <>
            <div className="col-span-6">
              <ProductTable
                search={search}
                data={products.data}
                length={products.data.length}
              />
            </div>
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
