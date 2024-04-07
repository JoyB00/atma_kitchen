import LapisLegit from "../../assets/HomeAssets/lapis legit.png";
import Button from "../../Component/Button";
import Badge from "../../Component/Badge";
export default function BestSeller() {
  return (
    <div className="bg-gradient-to-br to-cyan-50 via-current from-transparent ps-36  flex py-32">
      <div className="w-1/2 text-black text-left">
        <h1 className=" font-semibold text-5xl">Best Seller</h1>
        <h1 className=" font-semibold text-5xl">Product In Atma Kitchen</h1>
        <p className="text-orange-500 font-bold mt-3 text-2xl">Lapis Legit</p>
        <p className="text-md my-2 text-white">
          <Badge bgColor="bg-orange-500" ringColor="ring-orange-500">
            850K/Loyang
          </Badge>
        </p>
        <div className="w-4/5 my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
          sapiente cumque accusantium error, aliquid totam magnam autem hic
          incidunt alias adipisci excepturi nam iusto possimus repellat, iste
          nihil veniam et.
        </div>
        <Button className="rounded-xl border-2 border-orange-500 bg-transparent text-orange-500 me-2 mt-4 hover:text-white">
          Add To Cart
        </Button>
      </div>
      <div className="w-1/2 flex justify-end">
        <img src={LapisLegit} alt="bestseller" />
      </div>
    </div>
  );
}
