import React from 'react';
import Chef from "../../assets/AboutAsset/chef222.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Purpose() {
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
      <div className="h-screen flex bg-gradient-to-bl to-blue-100 via-transparent from-transparent py-24">
        <div className="w-1/2 text-black flex justify-start pl-7">
          <LazyLoadImage
            effect="blur"
            src={Chef}
            alt=""
            className="drop-shadow-md slow-motion w-3/4 h3/4"
          />
        </div>
        <div className="w-1/2 text-black text-start pe-44 py-16">
          <h1 className="font-semibold">Our Dream is</h1>
          <h1 className="font-semibold mb-7">Sharing Loves Through Foods</h1>
          <p>
            The philosophy is simple: bake with love, serve with joy. We understand that food is more than just sustenance; it’s a way to connect with others and celebrate life’s moments, big and small. That’s why we emphasize freshness, flavor, and artistic presentation in everything we do. Sustainability and supporting local suppliers are also core to our mission, ensuring that Atma Kitchen contributes positively to our community and environment.
          </p>
        </div>
      </div>
    </div>
  );
}
