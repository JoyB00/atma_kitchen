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

      <div className=" bg-gradient-to-r  from-cyan-100 via-transparent pt-24 md:flex">
        <div className="my-auto w-1/2 max-w-screen-md pb-16">
          <Carousel {...settings} className="mySwiper">
            <SwiperSlide className="px-8  drop-shadow-md">
              <Lottie animationData={kue} />
            </SwiperSlide>
            <SwiperSlide className=" px-8 drop-shadow-md">
              <Lottie animationData={chef} />
            </SwiperSlide>
            <SwiperSlide className="ms-12 px-6 drop-shadow-md">
              <Lottie animationData={delivery} />
            </SwiperSlide>
          </Carousel>
        </div>
        <div className="my-auto w-1/2">
          {/* Box register */}
          <motion.img
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            src={Logo}
            alt=""
            className="mx-auto w-1/6"
          />
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-20 rounded-3xl bg-gradient-to-b from-transparent to-orange-400 p-1"
          >
            <div className="rounded-3xl bg-white px-9 py-8">
              <h2 className="p-2 text-left text-5xl font-semibold text-black">
                Welcome!
              </h2>
              <p className="mb-4 px-2 text-left font-light text-black">
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
