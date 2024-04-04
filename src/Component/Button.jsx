import { motion } from "framer-motion";
export default function Button({ children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: "#f99417" }}
      transition={{ type: "tween", stiffness: 500 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
