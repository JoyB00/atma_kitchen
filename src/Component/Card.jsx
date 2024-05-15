import { motion } from "framer-motion";
import Button from "../Component/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

export default function CardComp({ id, title, price, desc, image, alt }) {
  const [idItemLoad, setIdItemLoad] = useState();
  const [load, setLoad] = useState(false);

  const handleLoadDetail = () => {
    setIdItemLoad(id);
    setLoad(true);
  };
  return (
    <div className="w-full">
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
        <div className="mt-auto px-1">
          <NavLink to={`/menu/${id}`}>
            <Button
              className="bg-orange-500 rounded-xl w-full text-white "
              onClick={handleLoadDetail}
            >
              {load && idItemLoad == id ? (
                <BeatLoader color="white" loading={load} size={10} />
              ) : (
                <>See Detail</>
              )}
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
