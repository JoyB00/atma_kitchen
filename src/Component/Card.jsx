import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function CardComp({ children, ...props }) {
  return (
    <NavLink className="col-span-1 ">
      <motion.div
        whileHover={{
          scale: 1.02,
          boxShadow: "5px 5px ",
          color: "#f99417",
        }}
        transition={{ type: "just", stiffness: 1000 }}
        {...props}
      >
        {children}
      </motion.div>
    </NavLink>
  );
}
