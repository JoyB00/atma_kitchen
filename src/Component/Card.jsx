import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../Component/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Skeleton } from "@mui/material";
import defaultImage from "../assets/ProductAsset/lapis leggite.jpg";

export default function CardComp({ title, price, desc, image, alt }) {
  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: [0.8, 1.3, 1] },
      }}
      exit={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring" }}
    >
      <div className="drop-shadow-md rounded-xl bg-white text-black p-3 h-[29rem] flex flex-col">
        <LazyLoadImage
          effect="blur"
          src={image}
          alt={alt}
          className="h-64 w-[21.5rem] object-cover rounded-xl mx-auto"
        />
        <div className="flex justify-between px-2 pt-4">
          <h2 className="text-left text-md font-medium">{title}</h2>
          <h2 className="text-right text-md font-semibold">{price}</h2>
        </div>
        <p className="text-gray-500 font-normal text-sm px-2 text-left py-4 flex-grow">
          {desc}
        </p>
        <div className="mt-auto">
          <Button className="bg-orange-500 rounded-xl w-full text-white">
            See Detail
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
