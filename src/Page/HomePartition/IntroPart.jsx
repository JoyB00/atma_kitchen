import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../Component/Button";
import Brownies from "../../assets/HomeAssets/brownies.png";
import { motion } from "framer-motion";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";

export default function Intro() {
  const navigate = useNavigate();

  const About = () => {
    navigate('/about');
  };
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
          Welcome to "Atma Kitchen"! We are a place where deliciousness is met
          with joy. 
          At Atma Kitchen, we believe that food should be a celebration of life, an experience that nourishes not just the body, but the soul. Our bakery is a haven for those who seek the highest quality, handcrafted delights made with love and a touch of magic.
          </p>
          <div className="flex ">
            <Button className="me-2 rounded-3xl bg-orange-500 text-white" onClick={About}>
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
