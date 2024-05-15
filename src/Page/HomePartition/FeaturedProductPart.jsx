import CarouselGrid from "../../Component/CarouselGrid";

import CardProduct from "../../Component/Card";
import { SwiperSlide } from "swiper/react";
import defaultImage from "../../assets/ProductAsset/lapis leggite.jpg";
import { RotateLoader } from "react-spinners";
import { motion } from "framer-motion";
import { getPicture } from "../../api";

export default function FeaturedProduct({ data, loading }) {
  return (
    <>
      {loading ? (
        <div className="h-screen w-full bg-gradient-to-tl from-transparent via-transparent to-orange-50">
          <RotateLoader
            color="orange"
            loading={loading}
            cssOverride={{
              position: "absolute",
              top: "320%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderColor: "red",
            }}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-tl from-transparent via-transparent to-orange-50 py-24"
        >
          <div className=" px-52 text-center ">
            <h1 className="font-semibold text-black">Our Featured Product</h1>
            <p className="mt-2 text-black ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
              dolore ab vitae explicabo doloremque hic iure iusto distinctio non
              esse beatae vel ad reprehenderit harum nihil rerum, odio ut
              placeat!
            </p>
          </div>
          <CarouselGrid>
            {data?.map((product) => (
              <SwiperSlide className="gap-8 py-3" key={product.id}>
                <CardProduct
                  // alt={product.alt}
                  image={
                    product.product_picture
                      ? getPicture(product.product_picture, "product")
                      : defaultImage
                  }
                  desc={
                    product.description.length < 120
                      ? product.description
                      : `${product.description.substring(0, 120)}...`
                  }
                  price={
                    product.product_price <= 999
                      ? product.product_price
                      : (product.product_price / 1000).toFixed(1) + "K"
                  }
                  title={product.product_name}
                />
              </SwiperSlide>
            ))}
          </CarouselGrid>
        </motion.div>
      )}
    </>
  );
}
