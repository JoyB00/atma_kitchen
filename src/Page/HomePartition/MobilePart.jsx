import delivery from "../../assets/delivery.json";
import Lottie from "lottie-react";
import Appstore from "../../assets/HomeAssets/Appstore.png";
import { NavLink } from "react-router-dom";
import Playstore from "../../assets/HomeAssets/playstore.png";
import { motion } from "framer-motion";
export default function MobilePart() {
  return (
    <div className="bg-gradient-to-tr to-cyan-50 via-transparent from-transparent  ps-28 flex">
      <div className="w-1/2">
        <Lottie animationData={delivery} />
      </div>
      <div className="w-1/2 text-black text-left ">
        <h1 className="mt-12 me-32 font-semibold text-5xl">
          Atma Kitchen is now on Mobile
        </h1>
        <p className="me-36 mt-6">
          It's a long established fact that a reader will be distracted by the
          readable content of a page when looking at it's layout. The Point of
          Using Lorem Ipsum
        </p>
        <div className="flex justify-start mt-6">
          <NavLink
            className="w-32 "
            to="https://www.geeksforgeeks.org/link-and-navlink-components-in-react-router-dom/"
          >
            <motion.img
              src={Appstore}
              alt=""
              className="w-32 "
              whileHover={{
                scale: 1.03,
              }}
              transition={{ type: "tween", stiffness: 1000 }}
            />
          </NavLink>
          <NavLink
            className="ms-2"
            to="https://www.geeksforgeeks.org/link-and-navlink-components-in-react-router-dom/"
          >
            <motion.img
              src={Playstore}
              alt=""
              className="w-[8.9rem]"
              whileHover={{
                scale: 1.03,
              }}
              transition={{ type: "tween", stiffness: 1000 }}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
