import React from 'react';
import Chef from "../../assets/AboutAsset/chef11.png";
import { motion } from "framer-motion";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function What() {
  return (
    <div>
      <style>
        {`
          @keyframes slowUpDown {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .slow-motion {
            animation: slowUpDown 3s ease-in-out infinite;
          }
        `}
      </style>
      <div className="flex bg-gradient-to-tr to-blue-100 via-transparent from-transparent py-36 ps-24">
        <LazyLoadComponent>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-1/2 my-auto text-start text-black pe-24"
          >
            <h1 className="font-semibold mb-7 text-6xl">
              What is Atma Kitchen?
            </h1>
            <p className="mb-7 text-lg">
              {/* Welcome to "Atma Kitchen"! We are a place where deliciousness is met
              with joy. */}
              Atma Kitchen – Where every creation is made with Heart and Soul. We are a legit bakery where passion meets precision, and every creation tells a story. Founded on the principles of quality, creativity, and community, Atma Kitchen offers a delightful array of cakes, pastries, and baked goods that cater to all tastes and occasions.
            </p>
          </motion.div>
        </LazyLoadComponent>
        <div className="flex items-end justify-end w-1/2 my-auto">
          <LazyLoadImage
            effect="blur"
            src={Chef}
            alt=""
            className="drop-shadow-md slow-motion w-3/4 h3/4"
          />
        </div>
      </div>
    </div>
  );
}
