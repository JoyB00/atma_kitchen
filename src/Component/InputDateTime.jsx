import { motion } from "framer-motion";
export default function InputDateTime({ ...props }) {
  return (
    <motion.input
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      type="text"
      onFocus={(e) => (e.target.type = "datetime-local")}
      onBlur={(e) => (e.target.type = "datetime-local")}
      {...props}
      className="block w-full rounded-xl border-0 px-3 py-2.5 text-sm leading-6 text-black shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
    />
  );
}
