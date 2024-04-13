import { motion } from "framer-motion";
export default function Button({ children, withoutAnimate, ...props }) {
  let setting = {};
  if (!withoutAnimate) {
    setting = {
      whileHover: { scale: 1.05, backgroundColor: "#f99417" },
      transition: { type: "tween", stiffness: 500 },
    };
  }

  return (
    <motion.button {...setting} {...props}>
      {children}
    </motion.button>
  );
}
