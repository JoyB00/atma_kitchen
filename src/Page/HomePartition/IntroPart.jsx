import Button from "../../Component/Button";
import Brownies from "../../assets/HomeAssets/brownies.png";
import { motion } from "framer-motion";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";

export default function Intro() {
  return (
    <div className=" flex bg-gradient-to-tr from-transparent via-transparent to-red-100 py-36 ps-24">
      <LazyLoadComponent>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="my-auto w-1/2 pe-24 text-start text-black"
        >
          <h1 className="mb-7 text-6xl font-semibold">
            Fresh Baked Cake Everyday !
          </h1>
          <p className="mb-7 text-lg">
            {/* Welcome to "Atma Kitchen"! We are a place where deliciousness is met
          with joy. */}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
            ipsum atque fugiat, eius unde numquam laudantium? Mollitia ipsa
            magni rem. Est reprehenderit sapiente commodi fugiat consequatur.
            Vitae omnis reprehenderit fuga.
          </p>
          <div className="flex ">
            <Button className="me-2 rounded-3xl bg-orange-500 text-white">
              Read More
            </Button>
            <Button className="ms-2 rounded-3xl border-2  border-orange-500  bg-transparent text-orange-500 hover:text-white">
              Order Now
            </Button>
          </div>
        </motion.div>
      </LazyLoadComponent>
      <div className="my-auto flex w-1/2 items-end justify-end ">
        <LazyLoadImage
          effect="blur"
          src={Brownies}
          alt=""
          className="drop-shadow-md"
        />
      </div>
    </div>
  );
}
