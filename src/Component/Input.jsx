import { motion } from "framer-motion";
export default function Input({ label, id, ...props }) {
  return (
    <div className="grid grid-cols-3 items-center py-3">
      {/* <label htmlFor={id} className=" text-sm font-medium text-black text-left">
        {label}
      </label> */}

      <div className="col-span-3">
        <motion.input
          key="fallback"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          id={id}
          name={id}
          type={id}
          autoComplete={id}
          {...props}
          className="block w-full text-black rounded-3xl border-0 py-2.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
        />
      </div>
    </div>
  );
}
