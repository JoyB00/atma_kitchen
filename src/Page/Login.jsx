import Footer from "../Component/Footer.jsx";
import Navbar from "../Component/Navbar.jsx";
import { NavLink } from "react-router-dom";
import Logo from "../assets/atmak-removebg.png";
import Lottie from "lottie-react";
import AnimationLogin from "../assets/Comp 1.json";
import FormLogin from "../Component/FormLogin.jsx";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="w-full ">
      <Navbar />
      <div className="h-screen bg-gradient-to-r from-cyan-100 via-transparent pt-16 md:flex">
        <div className="my-auto md:w-1/2 md:pb-8">
          <div className="mx-auto drop-shadow-lg sm:w-0 md:w-full lg:w-11/12">
            <Lottie animationData={AnimationLogin} />
          </div>
        </div>
        <div className="my-auto md:w-1/2">
          {/* Box Login */}
          <motion.img
            key="fallback"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            src={Logo}
            alt=""
            className="mx-auto w-1/6"
          />
          <motion.div
            key="fallback"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-24 rounded-3xl bg-gradient-to-b from-transparent to-orange-400 p-1 md:mx-3 lg:mx-10 xl:mx-24"
          >
            <div className="rounded-3xl bg-white px-9 py-8">
              <h2 className="p-2 text-5xl font-semibold  text-black">
                Welcome!
              </h2>
              <p className="mb-4 font-light text-black md:px-4 md:text-xs lg:px-8 xl:text-base">
                Enter your email and password to login
              </p>
              <FormLogin />
              <div className="md:mx-auto lg:flex lg:justify-center">
                <p className="my-auto text-black md:text-center md:text-sm lg:text-end lg:text-base">
                  Don't have an account yet?
                </p>
                <NavLink
                  className="mx-2 my-auto bg-transparent text-orange-500 md:text-sm lg:text-base"
                  to="/register"
                >
                  Register Now
                </NavLink>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-cyan-100 via-transparent md:pt-12">
        <Footer />
      </div>
    </div>
  );
}
