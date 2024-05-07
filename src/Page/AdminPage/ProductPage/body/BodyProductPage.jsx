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
      <div className="w-full grid grid-cols-6">
        <motion.div className="col-span-4 bg-gradient-to-t from-orange-400 to-orange-500 grid grid-cols-3 rounded-2xl me-2 drop-shadow-md -z-2">
          <h1 className="px-3 pt-6 col-span-2 font-semibold text-white ">
            <FontAwesomeIcon icon={faCookie} /> Product Data{" "}
          </h1>
          <div className="ms-12 col-span-1 bg-orange-600 rounded-tl-full" />
        </motion.div>
        <div className="pt-6 col-span-2 ms-auto">
          <Button
            className="bg-transparent border-2 border-orange-500 my-4 text-orange-500 me-2 hover:text-white"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faFilter} className="me-1" /> Filter
          </Button>
          <NavLink to="addProduct">
            <Button className="bg-orange-500 my-4 text-white">
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
          <h1 className="text-lg font-semibold pt-8">Stock Product</h1>
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
