import { motion } from "framer-motion";
export default function Input({
  label,
  id,
  textCenter,
  withLabel,
  withAnimate,
  ...props
}) {
  let animate = {};
  if (withAnimate) {
    animate = {
      initial: { opacity: 0, y: -100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    };
  }
  return (
    <div className="items-center py-3">
      {withLabel ? (
        <div className="mb-2 text-black">
          <label htmlFor={id}>{label}</label>
        </div>
      ) : (
        ""
      )}

      <motion.input
        {...animate}
        key="fallback"
        id={id}
        name={id}
        type={id}
        autoComplete={id}
        {...props}
        className={`block w-full text-black ${
          withLabel ? "rounded-xl" : "rounded-3xl"
        } ${textCenter ? "text-center" : undefined} border-0 px-3 py-2.5 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600`}
      />
    </div>
  );
}
