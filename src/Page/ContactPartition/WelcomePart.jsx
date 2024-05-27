import React from 'react';
import Insta from "../../assets/ContactAsset/instagram.png";
import FB from "../../assets/ContactAsset/facebook.png";
import Tweet from "../../assets/ContactAsset/twitter.png";
import Address from "../../assets/ContactAsset/placeholder (1).png";
import Call from "../../assets/ContactAsset/phone-ringing (1).png";
import SocialMedia from "../../assets/ContactAsset/content (1).png";
import Email from "../../assets/ContactAsset/email (1).png";
import Logo from "../../assets/atmak-removebg.png";
import Location from "../../assets/atmak-location.png";

import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Welcome() {
  return (
    <div>
      <div className="px-36 py-24">
        <div className=" text-black text-center py-16">
          <div className="">
          <LazyLoadImage
                  effect="blur"
                  src={Logo}
                  className="h-[21.5rem] w-64  object-cover rounded-xl mx-auto"
                />
          </div>
          <h1 className=" font-semibold text-5xl mb-2 mt-3">Get in touch with Us</h1>
          <h3 className="font-medium text-xl mb-4">Atma Kitchen Outlet and Contact </h3>
          <div className="text-center mt-2 mb-4 text-gray-400">
            Our business hours are 9AM-5Pm ET Monday-Friday and 9AM-3PM ET on weekends
          </div>
          <div className="h-1 bg-gradient-to-r from-orange-500 from-10% via-orange-300 via-30% to-orange-100 to-90% rounded-lg"></div>
          </div>
          <div class="grid grid-cols-3 gap-4 mt-2">
            <div
              class="col-span-2"
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              <div class="drop-shadow-md rounded-xl bg-white text-black my-auto p-3 ">
              <h2 class="text-3xl font-semibold text-left text-black">Our Outlet</h2>
            
              <div class="my-auto p-3 overflow-hidden">
                <div class="w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2335.7268788667266!2d106.85251478346865!3d-6.236250188480103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f398071c0a3d%3A0xe0b80cd0546089be!2sAtma&#39;s%20Kitchen!5e0!3m2!1sid!2sid!4v1716560902575!5m2!1sid!2sid" 
                    className="h-[40rem] w-full max-w-full">
                  </iframe>
                </div>
              </div>
              </div>
            </div>

            <div
              className="w-full"
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              <div class="drop-shadow-md rounded-xl bg-white text-black my-auto p-2 ">
              <div className=" text-3xl font-black text-orange-500 mb-7">ATMA <span class="text-black">KITCHEN</span></div> 
              <div className="mb-7">
                <LazyLoadImage
                      effect="blur"
                      src={Address}
                      className=" object-cover rounded-sm"
                />
                <div className="font-semibold mb-2 text-black">Address</div>
                <div className="font-light text-sm text-black">Jl. Centralpark No. 10 Yogyakarta</div>
              </div>

              <div className="justify-center mb-7">
                <LazyLoadImage
                      effect="blur"
                      src={Email}
                      className=" object-cover rounded-sm"
                />
                <div className="font-semibold mb-2 text-black">Email</div>
                <div className="font-light text-sm text-black">atmakitchen@hotmail.co.id</div>
              </div>

              <div className="justify-center  mb-7">
                <LazyLoadImage
                      effect="blur"
                      src={Call}
                      className=" object-cover rounded-sm"
                />
                <div className="font-semibold mb-2 text-black">Call us</div>
                <div className="font-light text-sm text-black">+62-8234-1543-888</div>
                <div className="font-light text-sm text-black">+62-8132-3234-976</div>
              </div>

              <div className="flex flex-col items-center justify-center h-full py-3">
                <LazyLoadImage
                  effect="blur"
                  src={SocialMedia}
                  className="object-cover rounded-sm"
                />
                <div className="font-semibold mb-2 text-black">Social Media</div>
                <div className="flex space-x-4">
                  <div className="flex-none">
                    <LazyLoadImage
                      effect="blur"
                      src={FB}
                      className="h-7 w-7 object-cover rounded-sm"
                    />
                  </div>
                  <div className="flex-none">
                    <LazyLoadImage
                      effect="blur"
                      src={Insta}
                      className="h-7 w-7 object-cover rounded-sm"
                    />
                  </div>
                  <div className="flex-none">
                    <LazyLoadImage
                      effect="blur"
                      src={Tweet}
                      className="h-7 w-7 object-cover rounded-sm"
                    />
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

        </div>
      </div>
  
  );
}
