import { React } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Grid,
} from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";
import "../App.css";

export default function CarouselGrid({ children }) {
  return (
    <div className="mx-auto my-auto w-full max-w-7xl px-2">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Grid]}
        spaceBetween={50}
        slidesPerView={3}
        navigation={true}
        grid={{
          rows: 2,
          fill: "row",
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper py-16 pe-2 ps-9"
      >
        {children}
      </Swiper>
    </div>
  );
}
