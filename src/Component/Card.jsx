import { motion } from "framer-motion";
import Button from "../Component/Button";

export default function CardComp({ title, price, desc, image, alt }) {
  return (
    <div
      className="w-full"
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: [0.8, 1.3, 1] },
      }}
      exit={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring" }}
    >
      <div className="drop-shadow-md rounded-xl bg-white text-black my-auto p-3 w-[18.5rem]">
        <motion.img
          whileHover={{
            scale: 1.03,
          }}
          transition={{ type: "tween", stiffness: 1000 }}
          src={image}
          alt={alt}
          className="h-64 w-[18.5rem]  object-cover rounded-xl mx-auto"
        />
        <div className="flex justify-between px-2  pt-4">
          <h2 className="text-left">{title}</h2>
          <h2 className="text-right">{price}k</h2>
        </div>
        <p className="text-gray-500 font-normal text-sm px-2 text-left py-4">
          {desc}
        </p>
        <div className="grid grid-col-1">
          <Button className="m-1 bg-orange-500 rounded-xl col-span-1 text-white">
            Add To Chart
          </Button>
        </div>
      </div>
    </div>
  );
}
