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
      <h1 className="text-black font-semibold">Welcome To Our Store</h1>
      <p className="text-black px-52 my-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam dolore
        ab vitae explicabo doloremque hic iure iusto distinctio non esse beatae
        vel ad reprehenderit harum nihil rerum, odio ut placeat!
      </p>
      <motion.ul
        variants={card}
        initial={scroll ? "hidden" : ""}
        animate={scroll ? "visible" : ""}
        className="gap-14 grid grid-cols-5 px-32 mt-8"
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
      </motion.ul>
    </div>
  );
}
