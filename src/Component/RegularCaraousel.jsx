import { Swiper } from "swiper/react";
import { React } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";
import "../App.css";

export default function Carousel({ children, ...props }) {
  return <Swiper {...props}>{children}</Swiper>;
}
