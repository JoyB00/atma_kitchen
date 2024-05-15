import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import { GetProductById } from "../../api/ProductApi";
import { getPicture } from "../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouteLoaderData } from "react-router-dom";
import defaultImage from "../../assets/ProductAsset/lapis leggite.jpg";
export default function DetailMenu() {
  const menu = useRouteLoaderData("detail-menu");
  console.log(menu);
  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col">
      <Navbar />
      <div className="text-orange-500 pt-36 ps-6 grid grid-cols-2">
        <div className="col-span-1">
          <LazyLoadImage
            effect="blur"
            src={
              menu.product.product_picture
                ? getPicture(menu.product.product_picture, "product")
                : defaultImage
            }
            alt={menu.product.product_name}
            className="h-96 w-full object-cover rounded-xl"
          />
        </div>
        <div className="col-span-1 text-left">
          <h1>{menu.product.product_name}</h1>
        </div>
      </div>
      <div className="from-cyan-100 via-transparent md:pt-12 mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.id;
  const product = await GetProductById(id);
  return product;
}
