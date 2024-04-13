import Input from "../../../../Component/Input";
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

export default function Body({ search }) {
  const Category = [
    {
      no: 1,
      name: "Cake",
    },
    {
      no: 2,
      name: "Bread",
    },
    {
      no: 3,
      name: "Drink",
    },
    {
      no: 4,
      name: "Entrusted",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="w-full grid grid-cols-6">
        {/* <div className="w-1/3 "> */}
        {/* <Input
            id="searchProduct"
            label="Search Products"
            placeholder="Search Product..."
            type="text"
            style={{
              borderRadius: "15px",
              paddingTop: "15px",
              paddingBottom: "15px"
            }}
          /> */}
        {/* </div> */}
        <motion.div
          // initial={{ opacity: 0, y: 30 }}
          // animate={{ opacity: 1, y: 0 }}
          className="col-span-4 bg-gradient-to-t from-orange-400 to-orange-500 grid grid-cols-3 rounded-2xl me-2 drop-shadow-md -z-2"
        >
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
        <div className="col-span-4">
          <ProductTable search={search} />
        </div>
        <div className="col-span-2">
          <Top5Selling />
        </div>
      </div>

      {/* Drawer */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="FILTER">
        <div className="px-4">
          <h1 className="text-lg font-semibold">Category Product</h1>
          {Category.map((category) => (
            <Checkbox
              id={category.name}
              label={category.name}
              key={category.no}
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
