import Button from "../../Component/Button";
import Brownies from "../../assets/HomeAssets/brownies.png";
import { motion } from "framer-motion";
export default function Intro() {
  return (
    <div className=" md:flex bg-gradient-to-tr to-red-100 via-current from-transparent py-36 ps-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1  }}
        className="w-1/2 my-auto text-start text-black pe-24"
      >
        <h1 className="font-semibold mb-7 text-6xl">
          Fresh Baked Cake Everyday !
        </h1>
        <p className="mb-7 text-lg">
          {/* Welcome to "Atma Kitchen"! We are a place where deliciousness is met
          with joy. */}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
          ipsum atque fugiat, eius unde numquam laudantium? Mollitia ipsa magni
          rem. Est reprehenderit sapiente commodi fugiat consequatur. Vitae
          omnis reprehenderit fuga.
        </p>
        <div className="flex ">
          <Button className="rounded-3xl bg-orange-500 text-white me-2">
            Read More
          </Button>
          <Button className="rounded-3xl border-2 border-orange-500  bg-transparent  text-orange-500 ms-2 hover:text-white">
            Order Now
          </Button>
        </div>
      </motion.div>
      <div className="flex items-end justify-end w-1/2 my-auto ">
        <img src={Brownies} alt="" className="   drop-shadow-md" />
      </div>
    </div>
  );
}
