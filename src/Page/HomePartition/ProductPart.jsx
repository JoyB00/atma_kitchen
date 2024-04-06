import { motion } from "framer-motion";
import Category from "../../assets/CategoryProduct/Category";
import { NavLink } from "react-router-dom";
export default function Product() {
  return (
    <div className=" pt-16 ">
      <h1 className="text-black font-semibold">Welcome To Our Store</h1>
      <p className="text-black px-52 my-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam dolore
        ab vitae explicabo doloremque hic iure iusto distinctio non esse beatae
        vel ad reprehenderit harum nihil rerum, odio ut placeat!
      </p>
      <div className="gap-14 grid grid-cols-5 px-32 mt-8">
        {Category.map((category, index) => (
          <NavLink key={index}>
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "5px 5px ",
                color: "#f99417",
              }}
              transition={{ type: "just", stiffness: 1000 }}
              className="col-span-1 drop-shadow-md rounded-xl bg-white text-black my-auto py-8 cursor-pointer"
            >
              <img
                src={category.src}
                alt={category.alt}
                className="w-5/12 mx-auto mb-6"
              />
              <h1 className="text-2xl font-semibold">{category.alt}</h1>
            </motion.div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
