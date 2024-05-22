import { motion } from "framer-motion";
import Category from "../../assets/CategoryProduct/Category";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Product() {
  const [scroll, setScroll] = useState(true);

  const startAnimate = () => {
    if (window.scrollY >= 60) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    console.log(scroll);
    startAnimate();
    window.addEventListener("scroll", startAnimate);
  }, [scroll]);

  const card = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  const productItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <div className="bg-red-50/40 py-24">
      <h1 className="font-semibold text-black">Welcome To Our Store</h1>
      <p className="my-3 px-52 text-black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam dolore
        ab vitae explicabo doloremque hic iure iusto distinctio non esse beatae
        vel ad reprehenderit harum nihil rerum, odio ut placeat!
      </p>
      <motion.ul
        variants={card}
        initial={scroll ? "hidden" : ""}
        animate={scroll ? "visible" : ""}
        className="mt-8 grid grid-cols-5 gap-14 px-32"
      >
        {Category.map((category, index) => (
          <NavLink key={index}>
            <motion.div
              variants={productItem}
              whileHover={{
                scale: 1.02,
                boxShadow: "5px 5px ",
                color: "#f99417",
              }}
              transition={{ type: "just", stiffness: 1000 }}
              className="col-span-1 my-auto cursor-pointer rounded-xl bg-white py-8 text-black drop-shadow-md"
            >
              <img
                src={category.src}
                alt={category.alt}
                className="mx-auto mb-6 w-5/12"
              />
              <h1 className="text-2xl font-semibold">{category.alt}</h1>
            </motion.div>
          </NavLink>
        ))}
      </motion.ul>
    </div>
  );
}
