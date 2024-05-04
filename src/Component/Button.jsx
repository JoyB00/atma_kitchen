import { motion } from "framer-motion";
export default function Button({
  children,
  withoutAnimate,
  hoverColor,
  ...props
}) {
  let setting = {};
  if (!withoutAnimate) {
    setting = {
      whileHover: {
        scale: 1.05,
        backgroundColor: hoverColor == null ? "#f99417" : hoverColor,
      },
      transition: { type: "tween", stiffness: 500 },
    };
  }

  return (
    <motion.button {...setting} {...props}>
      {children}
    </motion.button>
  );
}
