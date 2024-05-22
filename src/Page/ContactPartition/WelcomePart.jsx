import React from 'react';
import Christo from "../../assets/ContactAsset/christo.png";
import Dendy from "../../assets/ContactAsset/dendy.png";
import Bolo from "../../assets/ContactAsset/bolo.png";
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
          <h1 className=" font-semibold text-5xl mb-7">Get in touch with our creator-friendly support team</h1>
          <div className="text-center my-2 text-gray-400">
            Our business hours are 9AM-5Pm ET Monday-Friday and 9AM-3PM ET on weekends
          </div>
          </div>
        <div class="grid grid-cols-3 gap-4">
            <div
              className="w-full"
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              <div className="drop-shadow-md rounded-xl bg-white text-black my-auto p-3 ">
                <LazyLoadImage
                  effect="blur"
                  src={Christo}
                  className="h-[21.5rem] w-64  object-cover rounded-xl mx-auto"
                />
                <div className="grid grid-rows-2 px-2  pt-4">
                  <h2 className=" text-lg font-bold">Christopher Hartono</h2>
                  <h2 className=" text-sm font-light">As a Mobile Developer</h2>
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
              <div className="drop-shadow-md rounded-xl bg-white text-black my-auto p-3 ">
                <LazyLoadImage
                  effect="blur"
                  src={Dendy}
                  className="h-[21.5rem] w-64  object-cover rounded-xl mx-auto"
                />
                <div className="grid grid-rows-2 px-2  pt-4">
                  <h2 className=" textlg font-bold ">Kadek Dendy Pramartha</h2>
                  <h2 className=" text-sm font-light">As a Full-Stack Developer</h2>
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
              <div className="drop-shadow-md rounded-xl bg-white text-black my-auto p-3 ">
                <LazyLoadImage
                  effect="blur"
                  src={Bolo}
                  className="h-[21.5rem] w-64  object-cover rounded-xl mx-auto"
                />
               <div className="grid grid-rows-2 px-2  pt-4">
                  <h2 className=" text-lg font-bold">I Gede Bala Putra</h2>
                  <h2 className=" text-sm font-light">As a Beban Kelompok</h2>
                </div>
              </div>
          </div>
        </div>
        </div>
      </div>
  
  );
}
