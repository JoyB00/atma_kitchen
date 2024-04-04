import { motion } from "framer-motion";
export default function InputDate({ ...props }) {
  return (
    <motion.input
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      type="text"
      onFocus={(e) => (e.target.type = "date")}
      onBlur={(e) => (e.target.type = "text")}
      {...props}
      className="block w-full text-black rounded-3xl border-0 py-2.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
    />
  );
}
