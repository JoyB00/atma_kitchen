import React from "react";
import Slider from "react-slick";
import Button from "./Button";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function CarouselComp({ children }) {
  return (
    <div className="w-full py-16 my-auto max-w-screen-xl mx-auto">
      <OwlCarousel
        className="owl-theme"
        loop
        margin={10}
        items={1}
        autoplay="True"
      >
        {children}
      </OwlCarousel>
    </div>
  );
}
