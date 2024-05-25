import delivery from "../../assets/delivery.json";
import Lottie from "lottie-react";
import Appstore from "../../assets/HomeAssets/Appstore.png";
import { NavLink } from "react-router-dom";
import Playstore from "../../assets/HomeAssets/playstore.png";
import { motion } from "framer-motion";
export default function MobilePart() {
  return (
    <div className="flex bg-gradient-to-bl from-cyan-50 via-transparent  to-transparent ps-28">
      <div className="w-1/2">
        <Lottie animationData={delivery} />
      </div>
      <div className="my-auto w-1/2 text-left text-black">
        <h1 className="me-32 mt-12 text-5xl font-semibold">
          Atma Kitchen is now on Mobile
        </h1>
        <p className="me-36 mt-6">
        We are thrilled to announce that Atma Kitchen is now available on mobile! With our new app, you can enjoy the deliciousness of our bakery at your fingertips, anytime and anywhere.
        </p>
        <div className="mt-6 flex justify-start">
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
