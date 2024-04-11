import Input from "../Component/Input.jsx";
import Footer from "../Component/Footer.jsx";
import Navbar from "../Component/Navbar.jsx";
import Button from "../Component/Button.jsx";
import { NavLink } from "react-router-dom";
import Logo from "../assets/atmak-removebg.png";
import Lottie from "lottie-react";
import AnimationLogin from "../assets/Comp 1.json";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="w-full ">
      <Navbar />
      <div className="h-screen md:flex bg-gradient-to-r from-cyan-100 via-transparent pt-16">
        <div className="md:w-1/2 my-auto md:pb-8">
          <div className="mx-auto drop-shadow-lg md:w-full lg:w-11/12 sm:w-0">
            <Lottie animationData={AnimationLogin} />
          </div>
        </div>
        <div className="md:w-1/2 my-auto">
          {/* Box Login */}
          <motion.img
            key="fallback"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            src={Logo}
            alt=""
            className="w-1/6 mx-auto"
          />
          <motion.div
            key="fallback"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-b from-transparent to-orange-400 p-1 rounded-3xl xl:mx-24 lg:mx-10 md:mx-3 mx-24"
          >
            <div className="bg-white rounded-3xl px-9 py-8">
              <h2 className="font-semibold text-black text-5xl  p-2">
                Welcome!
              </h2>
              <p className="font-light text-black lg:px-8 md:px-4 mb-4 xl:text-base md:text-xs">
                Enter your email and password to login
              </p>
              <Input
                withAnimate
                label="Email"
                id="Email"
                type="Email"
                placeholder="Email"
              />
              <Input
                withAnimate
                label="Password"
                id="Password"
                type="Password"
                placeholder="Password"
              />
              <div className="flex justify-start mb-5">
                <NavLink
                  className="mx-2 bg-transparent my-auto text-orange-500 lg:text-base md:text-sm"
                  to=""
                >
                  Forgot Password?
                </NavLink>
              </div>
              <div className="grid  grid-cols-1 mb-5 ">
                <Button className="mx-2 bg-orange-500 drop-shadow-md rounded-3xl col-span-1 py-3">
                  LOGIN
                </Button>
              </div>
              <div className="lg:flex lg:justify-center md:mx-auto">
                <p className="text-black lg:text-end md:text-center my-auto lg:text-base md:text-sm">
                  Don't have an account yet?
                </p>
                <NavLink
                  className="mx-2 bg-transparent my-auto text-orange-500 lg:text-base md:text-sm"
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
