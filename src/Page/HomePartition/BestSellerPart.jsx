import LapisLegit from "../../assets/HomeAssets/lapis legit.png";
import Button from "../../Component/Button";
export default function BestSeller() {
  return (
    <div className="bg-gradient-to-br to-red-100 via-current from-transparent pt-16 ps-48 flex">
      <div className="w-1/2 text-black text-left">
        <h1 className=" font-semibold text-5xl">Best Seller</h1>
        <h1 className=" font-semibold text-5xl">Product In Atma Kitchen</h1>
        <p className="text-orange-500 font-bold mt-3">Rp. 850k/Loyang</p>
        <div className="w-4/5 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
          sapiente cumque accusantium error, aliquid totam magnam autem hic
          incidunt alias adipisci excepturi nam iusto possimus repellat, iste
          nihil veniam et.
        </div>
        <Button className="rounded-3xl bg-orange-500 text-white me-2 mt-7">
          Add To Cart
        </Button>
      </div>
      <div className="w-1/2 flex justify-end">
        <img src={LapisLegit} alt=""  className="w-9/12"/>
      </div>
    </div>
  );
}
