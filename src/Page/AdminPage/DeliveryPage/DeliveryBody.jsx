import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function BodyDeliveryRange({}) {
  const [invalidator, setInvalidator] = useState(false); // hacky way to invalidate query
  return (
    <div className="flex flex-col">
      <Header />
      <div className="py-2" />
    </div>
  );
}

export function Header() {
  return (
    <div className="w-full">
      <motion.div className="grid min-h-24 grid-cols-3 overflow-clip rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 ps-4 drop-shadow-md">
        <h1 className="col-span-2 px-3 pt-6 font-semibold text-white ">
          <FontAwesomeIcon icon={faTruck} /> Input Delivery Range
        </h1>
        <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
      </motion.div>
    </div>
  );
}
