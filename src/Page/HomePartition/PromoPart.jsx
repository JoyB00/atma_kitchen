import React from 'react';
import Slider from 'react-slick';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from "framer-motion";

// Assuming the images are hosted locally
import atmaCarousel1 from '../../assets/HomeAssets/atmacarousel1.jpg';
import atmaCarousel2 from '../../assets/HomeAssets/atmacarousel2.jpg';

export default function Promo() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-bl from-transparent via-transparent to-orange-50 py-12">
      <h2 className="text-5xl font-semibold mb-8 text-center text-black">Exclusive Promotions</h2>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-screen-xl px-4 mx-7"
      >
        <Slider {...settings}>
          <div>
            <LazyLoadImage
              src={atmaCarousel1}
              alt="Promotion 1"
              effect="blur"
              className="rounded-lg mx-auto h-3.4 w-3/4"
            />
          </div>
          <div>
            <LazyLoadImage
              src={atmaCarousel2}
              alt="Promotion 2"
              effect="blur"
              className="rounded-lg mx-auto h-3/4 w-3/4"
            />
          </div>
        </Slider>
      </motion.div>
    </div>
  );
}
