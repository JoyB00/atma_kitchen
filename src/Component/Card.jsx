import { motion } from "framer-motion";
import Button from "../Component/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
      <div className="my-auto rounded-xl bg-white p-3 text-black drop-shadow-md ">
        <LazyLoadImage
          effect="blur"
          src={image}
          alt={alt}
          className="mx-auto h-64  w-[21.5rem] rounded-xl object-cover"
        />
        <div className="flex justify-between px-2  pt-4">
          <h2 className="text-md text-left font-medium ">{title}</h2>
          <h2 className="text-md text-right font-semibold">{price}</h2>
        </div>
        <p className="px-2 py-4 text-left text-sm font-normal text-gray-500">
          {desc}
        </p>
        <div className="grid-col-1 grid">
          <Button className="col-span-1 m-1 rounded-xl bg-orange-500 text-white">
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
