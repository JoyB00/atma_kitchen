import CarouselGrid from "../../Component/CarouselGrid";

import CardProduct from "../../Component/Card";
import ProductList from "../../assets/ProductAsset/Product";
import { SwiperSlide } from "swiper/react";
export default function FeaturedProduct() {
  return (
    <div className="bg-gradient-to-tl to-orange-50 via-current from-transparent py-24">
      <div className=" text-center px-52 ">
        <h1 className="text-black font-semibold">Our Featured Product</h1>
        <p className="text-black mt-2 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          dolore ab vitae explicabo doloremque hic iure iusto distinctio non
          esse beatae vel ad reprehenderit harum nihil rerum, odio ut placeat!
        </p>
      </div>
      <CarouselGrid>
        {ProductList.map((product) => (
          <SwiperSlide className="gap-8 py-3" key={product.no}>
            <CardProduct
              alt={product.alt}
              image={product.src}
              desc="
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim id eveniet nemo aut ad vel tempora?"
              price={product.price}
              title={product.alt}
            />
          </SwiperSlide>
        ))}
      </CarouselGrid>
    </div>
  );
}
