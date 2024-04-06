import Carousel from "../../Component/Carousel";
import { motion } from "framer-motion";
import Button from "../../Component/Button";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ProductList from "../../assets/ProductAsset/Product";
export default function FeaturedProduct() {
  return (
    <div className="bg-gradient-to-tl to-indigo-100 via-current from-transparent">
      <div className=" text-center pt-16 px-52 ">
        <h1 className="text-black font-semibold">Our Featured Product</h1>
        <p className="text-black my-3 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          dolore ab vitae explicabo doloremque hic iure iusto distinctio non
          esse beatae vel ad reprehenderit harum nihil rerum, odio ut placeat!
        </p>
      </div>
      <Carousel>
        <div className="gap-14 grid grid-cols-4 grid-rows-2 item py-3">
          {ProductList.map((product) => (
            <div className="w-fit col-span-1 row-span-1 px-1">
              <div className="col-span-1 drop-shadow-md rounded-xl bg-white text-black my-auto p-3">
                <motion.img
                  whileHover={{
                    scale: 1.03,
                  }}
                  transition={{ type: "tween", stiffness: 1000 }}
                  src={product.src}
                  alt={product.src}
                  className="h-56 w-fit object-cover rounded-xl"
                />
                <div className="flex justify-between px-2  pt-4">
                  <h2 className="text-left">{product.title}</h2>
                  <h2 className="text-right">{product.price}k</h2>
                </div>
                <p className="text-gray-500 font-normal text-sm px-2 text-left py-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                </p>
                <div className="grid grid-col-1">
                  <Button className="m-1 bg-orange-500 rounded-xl col-span-1 text-white">
                    Add To Chart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="w-full  text-left pt-16 px-20 item">
          <h1 className="text-black font-semibold">Our Featured Product</h1>
          <p className="text-black my-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            dolore ab vitae explicabo doloremque hic iure iusto distinctio non
            esse beatae vel ad reprehenderit harum nihil rerum, odio ut placeat!
          </p>
        </div>
        <div className="w-full text-left pt-16 px-20 item">
          <h1 className="text-black font-semibold">Our Featured Product</h1>
          <p className="text-black my-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            dolore ab vitae explicabo doloremque hic iure iusto distinctio non
            esse beatae vel ad reprehenderit harum nihil rerum, odio ut placeat!
          </p>
        </div> */}
      </Carousel>
    </div>
  );
}
