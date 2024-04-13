import Navbar from "../Component/Navbar.jsx";

import Footer from "../Component/Footer.jsx";

import Logo from "../assets/atmak-removebg.png";
import Lottie from "lottie-react";
import delivery from "../assets/delivery.json";
import chef from "../assets/chef.json";
import kue from "../assets/kue.json";
import Carousel from "../Component/RegularCarousel.jsx";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import FormRegister from "../Component/FormRegister.jsx";
export default function Register() {
  var settings = {
    modules: [Pagination, Scrollbar, A11y, Autoplay],
    spaceBetween: 50,
    slidesPerView: 1,
    pagination: { clickable: true },
    autoplay: {
      delay: 15000,
      disableOnInteraction: false,
    },
  };

  return (
    <div className="w-full ">
      <Navbar />

      <div className=" md:flex  bg-gradient-to-r from-cyan-100 via-transparent pt-24">
        <div className="w-1/2 pb-16 my-auto max-w-screen-md">
          <Carousel {...settings} className="mySwiper">
            <SwiperSlide className="px-8  drop-shadow-md">
              <Lottie animationData={kue} />
            </SwiperSlide>
            <SwiperSlide className=" px-8 drop-shadow-md">
              <Lottie animationData={chef} />
            </SwiperSlide>
            <SwiperSlide className="px-6 ms-12 drop-shadow-md">
              <Lottie animationData={delivery} />
            </SwiperSlide>
          </Carousel>
        </div>
        <div className="w-1/2 my-auto">
          {/* Box register */}
          <motion.img
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            src={Logo}
            alt=""
            className="w-1/6 mx-auto"
          />
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-b from-transparent to-orange-400 p-1 mx-20 rounded-3xl"
          >
            <div className="bg-white rounded-3xl px-9 py-8">
              <h2 className="font-semibold text-black text-5xl p-2 text-left">
                Welcome!
              </h2>
              <p className="font-light text-black px-2 mb-4 text-left">
                "A slice of delight, crafted with precision and love, a Lapis
                Legit indulgence awaits.”
              </p>
              <FormRegister />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-cyan-100 via-transparent md:pt-20">
        <Footer />
      </div>
    </div>
  );
}
