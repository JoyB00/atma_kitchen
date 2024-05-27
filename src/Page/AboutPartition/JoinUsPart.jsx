import React from 'react';
import Chef from "../../assets/AboutAsset/chef33.png";
import Button from '../../Component/Button';

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
      <div className="bg-gradient-to-tl from-blue-100 via-transparent to-transparent  ps-36  flex py-24">
      <div className="w-1/2 text-black text-left py-16">
        <h1 className=" font-semibold text-5xl">Join Us</h1>
        <h1 className=" font-semibold text-5xl mb-7">Experience the Love Now</h1>
        <div className="w-4/5 my-2">
        Step into Atma Kitchen and experience the warmth and aroma of our freshly baked goods. Whether you’re a long-time customer or visiting for the first time, we welcome you to join our growing family of food enthusiasts. Let us be a part of your celebrations, your everyday joys, and your cherished memories. You  can find us in mobile and web-app and also in our physical store located at <strong>Jl. Centralpark No. 10, Yogyakarta, Indonesia.</strong>
        </div>
        <Button className="rounded-xl border-2 border-orange-500 bg-transparent text-orange-500 me-2 mt-4 hover:text-white" >
          Order Now
        </Button>
        <div className="w-4/5 mt-7">
        </div>
      </div>
      <div className="w-1/2 flex justify-end">
          <LazyLoadImage
            effect="blur"
            src={Chef}
            alt="bestseller"
          className="drop-shadow-md slow-motion w-3/4 h3/4"/>
      </div>
      </div>
      </div>
  );
}
