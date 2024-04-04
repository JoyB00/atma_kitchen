import { motion } from "framer-motion";
export default function Checkbox({ id, label }) {
  return (
    <motion.div
      className="mt-6 space-y-6"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id={id}
            name={id}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor={id} className="font-medium text-gray-900">
            {label}
          </label>
        </div>
      </div>
    </motion.div>
  );
}
