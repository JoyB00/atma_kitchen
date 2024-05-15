import LapisLegit from "../../assets/HomeAssets/lapis legit.png";
import Button from "../../Component/Button";
import Badge from "../../Component/Badge";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function BestSeller() {
  return (
    <div className="flex bg-gradient-to-tl from-cyan-50 via-transparent  to-transparent  py-24 ps-36">
      <div className="w-1/2 text-left text-black">
        <h1 className=" text-5xl font-semibold">Best Seller</h1>
        <h1 className=" text-5xl font-semibold">Product In Atma Kitchen</h1>
        <p className="mt-3 text-2xl font-bold text-orange-500">Lapis Legit</p>
        <p className="text-md my-2 text-white">
          <Badge bgColor="bg-orange-500" ringColor="ring-orange-500">
            850K/Loyang
          </Badge>
        </p>
        <div className="my-2 w-4/5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
          sapiente cumque accusantium error, aliquid totam magnam autem hic
          incidunt alias adipisci excepturi nam iusto possimus repellat, iste
          nihil veniam et.
        </div>
        <Button className="me-2 mt-4 rounded-xl border-2 border-orange-500 bg-transparent text-orange-500 hover:text-white">
          Add To Cart
        </Button>
      </div>
      <div className="flex w-1/2 justify-end">
        <LazyLoadImage effect="blur" src={LapisLegit} alt="bestseller" />
      </div>
    </div>
  );
}
